// assets/logic.js -- all tracker rules, with no DOM and no browser APIs.
//
// Kept free of UI code on purpose: index.html wires it to the page, while
// tests/logic.test.js runs exactly the same file in a bare JS engine.
// Written in ES5 so it also runs in minimal engines.
//
// State shape (what lands in localStorage):
//   {
//     version: 1,
//     lang: "en",
//     view: "normal",
//     clock24: false,                        // only present once the user clicks the clock
//     animals: { "<animalId>": <packed> },   // only animals that differ from the default
//     timers:  { "<timerId>": { state, remainingMs } }   // only non-idle timers
//   }
//
// `packed` = samples * 2 + (stamped ? 1 : 0). A default animal (0 samples, not
// stamped) packs to 0 and is dropped from the object, so a fresh save is just
// `{"version":1,"lang":"en","view":"normal","animals":{},"timers":{}}`.
(function (root) {
  "use strict";

  var catalog = root.RDO_CATALOG;

  var STATE_VERSION = 1;
  var DEFAULT_LANG = "en";

  var logic = {
    STATE_VERSION: STATE_VERSION,
    DEFAULT_LANG: DEFAULT_LANG,
    STORAGE_KEY: "rdo-naturalist-tracker"
  };

  // ---- animal records ------------------------------------------------------

  function record(stamped, samples) {
    return { stamped: !!stamped, samples: samples | 0 };
  }

  logic.defaultRecord = function () {
    return record(false, 0);
  };

  logic.pack = function (rec) {
    return (rec.samples | 0) * 2 + (rec.stamped ? 1 : 0);
  };

  logic.unpack = function (packed) {
    var n = packed | 0;
    if (n < 0) n = 0;
    return record(n % 2 === 1, Math.floor(n / 2));
  };

  // ---- state ---------------------------------------------------------------

  logic.defaultState = function () {
    return {
      version: STATE_VERSION,
      lang: DEFAULT_LANG,
      view: catalog.views[0].id,
      clock24: null,            // null = the 24-hour default
      animals: {},
      timers: {}
    };
  };

  // Sample cap: legendary animals cap lower than the rest.
  logic.capFor = function (animalId) {
    var animal = catalog.animals[animalId];
    var type = animal ? animal.type : "normal";
    return type === "legendary"
      ? catalog.settings.max_legendary
      : catalog.settings.max_normal;
  };

  logic.get = function (state, animalId) {
    var packed = state.animals[String(animalId)];
    return packed ? logic.unpack(packed) : logic.defaultRecord();
  };

  // Writes a record back, dropping it when it is the default (keeps saves small).
  logic.set = function (state, animalId, rec) {
    var key = String(animalId);
    var packed = logic.pack(rec);
    if (packed === 0) delete state.animals[key];
    else state.animals[key] = packed;
    return rec;
  };

  // Clamped +/- on the sample counter.
  logic.changeSamples = function (state, animalId, delta) {
    var rec = logic.get(state, animalId);
    var cap = logic.capFor(animalId);
    var next = rec.samples + (delta | 0);
    if (next < 0) next = 0;
    if (next > cap) next = cap;
    rec.samples = next;
    return logic.set(state, animalId, rec);
  };

  logic.setSamples = function (state, animalId, value) {
    var rec = logic.get(state, animalId);
    rec.samples = 0;
    logic.set(state, animalId, rec);
    return logic.changeSamples(state, animalId, value);
  };

  // Stamping is only possible with a sample in hand; it consumes that sample.
  logic.canStamp = function (state, animalId) {
    var rec = logic.get(state, animalId);
    return rec.stamped || rec.samples > 0;
  };

  // Stamp on: samples -= 1, stamped = true. Stamp off: samples untouched.
  logic.toggleStamp = function (state, animalId) {
    var rec = logic.get(state, animalId);
    if (!rec.stamped) {
      if (rec.samples <= 0) return null;
      rec.samples -= 1;
      rec.stamped = true;
    } else {
      rec.stamped = false;
    }
    return logic.set(state, animalId, rec);
  };

  logic.stampedCount = function (state, categoryId) {
    var ids = catalog.animalsByCategory(categoryId);
    var n = 0;
    for (var i = 0; i < ids.length; i++) {
      if (logic.get(state, ids[i]).stamped) n++;
    }
    return n;
  };

  // A set only sells once every animal of the category carries a stamp.
  logic.canSellSet = function (state, categoryId) {
    var ids = catalog.animalsByCategory(categoryId);
    if (ids.length === 0) return false;
    return logic.stampedCount(state, categoryId) === ids.length;
  };

  // Selling clears the stamps of the category and keeps the samples.
  logic.sellSet = function (state, categoryId) {
    if (!logic.canSellSet(state, categoryId)) return 0;
    var ids = catalog.animalsByCategory(categoryId);
    for (var i = 0; i < ids.length; i++) {
      var rec = logic.get(state, ids[i]);
      rec.stamped = false;
      logic.set(state, ids[i], rec);
    }
    return ids.length;
  };

  // ---- search --------------------------------------------------------------

  // `names` resolves an animal id to its visible name in the active language.
  logic.matches = function (query, animalId, names) {
    if (!query) return true;
    var needle = String(query).toLowerCase();
    var haystack = names(animalId) || "";
    return haystack.toLowerCase().indexOf(needle) !== -1;
  };

  // ---- timers --------------------------------------------------------------
  //
  // A timer counts down only while the page is open. Instead of an end
  // timestamp, the save keeps the milliseconds that are still left; the UI
  // subtracts the time that passed between two ticks and writes the result
  // back. Closing the tab therefore freezes the countdown, and reopening it
  // continues from the stored value - no time passes while the page is gone.
  // Works the same for a crash or a power cut (at most one second is lost).

  logic.timerConfig = function (timerId) {
    for (var i = 0; i < catalog.timers.length; i++) {
      if (catalog.timers[i].id === timerId) return catalog.timers[i];
    }
    return null;
  };

  logic.timerTotal = function (timerId) {
    var cfg = logic.timerConfig(timerId);
    return cfg ? cfg.minutes * 60 : 0;
  };

  logic.timerState = function (state, timerId) {
    var t = state.timers[timerId];
    if (!t) return { state: "idle", remainingMs: logic.timerTotal(timerId) * 1000 };
    return { state: t.state, remainingMs: Math.max(0, Number(t.remainingMs) || 0) };
  };

  // Remaining whole seconds, rounded up: 2880 right after the start, 0 when done.
  logic.timerRemaining = function (state, timerId) {
    var t = logic.timerState(state, timerId);
    if (t.state === "done") return 0;
    return Math.ceil(t.remainingMs / 1000);
  };

  // Burns `elapsedMs` of an open page. Returns true when something changed, so
  // the caller knows whether the save needs rewriting.
  logic.timerTick = function (state, timerId, elapsedMs) {
    var t = state.timers[timerId];
    if (!t || t.state !== "running") return false;
    var elapsed = Number(elapsedMs) || 0;
    if (elapsed <= 0) return false;
    var left = Math.max(0, (Number(t.remainingMs) || 0) - elapsed);
    if (left === 0) {
      state.timers[timerId] = { state: "done", remainingMs: 0 };
    } else {
      t.remainingMs = left;
    }
    return true;
  };

  // start / stop / reset. Returns false when the action makes no sense for the
  // current state (start on a finished timer, stop on a stopped one, ...).
  logic.timerAction = function (state, timerId, action) {
    if (!logic.timerConfig(timerId)) return false;
    var current = logic.timerState(state, timerId);

    if (action === "start") {
      if (current.state === "running" || current.state === "done") return false;
      if (current.remainingMs <= 0) return false;
      state.timers[timerId] = { state: "running", remainingMs: current.remainingMs };
      return true;
    }
    if (action === "stop") {
      if (current.state !== "running") return false;
      state.timers[timerId] = { state: "paused", remainingMs: current.remainingMs };
      return true;
    }
    if (action === "reset") {
      if (current.state === "idle") return false;
      delete state.timers[timerId];
      return true;
    }
    return false;
  };

  logic.formatMMSS = function (seconds) {
    var s = Math.max(0, seconds | 0);
    var m = Math.floor(s / 60);
    var rest = s % 60;
    return (m < 10 ? "0" + m : String(m)) + ":" + (rest < 10 ? "0" + rest : String(rest));
  };

  // ---- in-game clock -------------------------------------------------------
  //
  // Red Dead's world clock runs 30x faster than the real one, so an in-game day
  // takes 86400 / 30 = 2880 real seconds (48 real minutes) and in-game midnight
  // always lands on UTC 00:00 plus a multiple of 48 minutes. The whole clock is
  // therefore just the epoch in milliseconds times 30, read as UTC - no server
  // and no stored anchor involved.
  logic.INGAME_SCALE = 30;
  logic.INGAME_DAY_SECONDS = 86400 / 30; // 2880 real seconds

  function nowOr(nowMs) {
    return nowMs === undefined || nowMs === null ? Date.now() : nowMs;
  }

  logic.inGameTime = function (nowMs) {
    var game = new Date(nowOr(nowMs) * logic.INGAME_SCALE);
    var hours = game.getUTCHours();
    return {
      hours: hours,
      minutes: game.getUTCMinutes(),
      seconds: game.getUTCSeconds(),
      // Same day/night split the community map uses.
      night: hours >= 22 || hours < 5
    };
  };

  // 24-hour: "07:03" (zero padded). 12-hour: "7:03 AM" - AM/PM is the English
  // marker in every language, the clock format has nothing to do with the
  // selected language.
  logic.formatInGameClock = function (nowMs, use24) {
    var t = logic.inGameTime(nowMs);
    var minutes = t.minutes < 10 ? "0" + t.minutes : String(t.minutes);
    if (use24 === false) {
      var hours12 = t.hours % 12;
      if (hours12 === 0) hours12 = 12;
      return hours12 + ":" + minutes + " " + logic.inGameMeridiem(nowMs);
    }
    return (t.hours < 10 ? "0" + t.hours : String(t.hours)) + ":" + minutes;
  };

  logic.inGameMeridiem = function (nowMs) {
    return logic.inGameTime(nowMs).hours < 12 ? "AM" : "PM";
  };

  // Which clock the UI shows. 24-hour until the user clicks the clock; the
  // choice is then remembered in the save, independent of the language.
  logic.clock24For = function (state) {
    return state.clock24 !== false;
  };

  logic.toggleClock24 = function (state) {
    state.clock24 = !logic.clock24For(state);
    return state.clock24;
  };

  // ---- persistence ---------------------------------------------------------

  // Accepts anything (old save, hand-edited file, garbage) and returns a state
  // that is safe to render; unknown ids and out-of-range values are dropped.
  logic.sanitize = function (raw) {
    var state = logic.defaultState();
    if (!raw || typeof raw !== "object") return state;

    if (raw.lang && root.RDO_LANGUAGES && root.RDO_LANGUAGES[raw.lang]) state.lang = raw.lang;
    for (var v = 0; v < catalog.views.length; v++) {
      if (catalog.views[v].id === raw.view) state.view = raw.view;
    }

    if (raw.clock24 === true || raw.clock24 === false) state.clock24 = raw.clock24;

    var animals = raw.animals || {};
    for (var id in animals) {
      if (!catalog.animals[id]) continue;
      var value = animals[id];
      var rec = typeof value === "object" && value !== null
        ? record(value.stamped, value.samples)   // tolerate the uncompressed shape
        : logic.unpack(value);
      var cap = logic.capFor(id);
      if (rec.samples > cap) rec.samples = cap;
      if (rec.samples < 0) rec.samples = 0;
      logic.set(state, id, rec);
    }

    var timers = raw.timers || {};
    for (var tid in timers) {
      if (!logic.timerConfig(tid)) continue;
      var t = timers[tid] || {};
      var left = Math.min(logic.timerTotal(tid) * 1000, Math.max(0, Number(t.remainingMs) || 0));
      if ((t.state === "running" || t.state === "paused") && left > 0) {
        state.timers[tid] = { state: t.state, remainingMs: left };
      } else if (t.state === "done") {
        state.timers[tid] = { state: "done", remainingMs: 0 };
      }
      // Anything else - including a save from the old endAt format - stays idle.
    }
    return state;
  };

  logic.serialize = function (state) {
    var out = {
      version: STATE_VERSION,
      lang: state.lang,
      view: state.view,
      animals: state.animals,
      timers: state.timers
    };
    // Only stored once the user picked a clock, so a fresh save stays tiny.
    if (state.clock24 === true || state.clock24 === false) out.clock24 = state.clock24;
    return JSON.stringify(out);
  };

  logic.deserialize = function (text) {
    var raw = null;
    try {
      raw = JSON.parse(text);
    } catch (e) {
      return null;
    }
    return logic.sanitize(raw);
  };

  root.RDO_LOGIC = logic;
})(typeof window !== "undefined" ? window : this);
