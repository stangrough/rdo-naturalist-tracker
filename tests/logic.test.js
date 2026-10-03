// tests/logic.test.js -- rules + data/language coverage.
//
// Run with: python3 tests/run.py   (loads the real files into a bare JS engine,
// so no browser and no build step are needed).
(function (root) {
  "use strict";

  var catalog = root.RDO_CATALOG;
  var logic = root.RDO_LOGIC;
  var languages = root.RDO_LANGUAGES;

  var failures = [];
  var checks = 0;

  function ok(condition, message) {
    checks++;
    if (!condition) failures.push(message);
  }

  function eq(actual, expected, message) {
    checks++;
    if (actual !== expected) {
      failures.push(message + " -- expected " + JSON.stringify(expected) + ", got " + JSON.stringify(actual));
    }
  }

  // ---- default state is as small as it gets --------------------------------

  var fresh = logic.defaultState();
  eq(logic.serialize(fresh),
    '{"version":1,"lang":"en","view":"normal","animals":{},"timers":{}}',
    "a fresh save holds no per-animal data");
  eq(fresh.lang, "en", "English is the default language");

  // ---- packing -------------------------------------------------------------

  for (var samples = 0; samples <= 10; samples++) {
    for (var s = 0; s < 2; s++) {
      var rec = { stamped: s === 1, samples: samples };
      var back = logic.unpack(logic.pack(rec));
      eq(back.samples, samples, "pack/unpack keeps samples " + samples);
      eq(back.stamped, rec.stamped, "pack/unpack keeps the stamp " + samples + "/" + s);
    }
  }
  eq(logic.pack(logic.defaultRecord()), 0, "the default record packs to 0");

  // ---- caps ----------------------------------------------------------------

  eq(logic.capFor(1), 10, "normal animals cap at 10 samples");
  eq(logic.capFor(77), 3, "legendary animals cap at 3 samples");

  var state = logic.defaultState();
  logic.changeSamples(state, 1, 99);
  eq(logic.get(state, 1).samples, 10, "the counter clamps to the normal cap");
  logic.changeSamples(state, 1, -99);
  eq(logic.get(state, 1).samples, 0, "the counter never goes below zero");
  eq(state.animals["1"], undefined, "a defaulted animal is dropped from the save");

  logic.changeSamples(state, 77, 99);
  eq(logic.get(state, 77).samples, 3, "the counter clamps to the legendary cap");
  logic.setSamples(state, 77, 2);
  eq(logic.get(state, 77).samples, 2, "setSamples replaces instead of adding");

  // ---- stamping ------------------------------------------------------------

  state = logic.defaultState();
  eq(logic.toggleStamp(state, 1), null, "stamping without a sample is refused");
  eq(logic.canStamp(state, 1), false, "the stamp is blocked without a sample");

  logic.changeSamples(state, 1, 2);
  var stamped = logic.toggleStamp(state, 1);
  eq(stamped.stamped, true, "stamping sets the stamp");
  eq(stamped.samples, 1, "stamping consumes one sample");
  var unstamped = logic.toggleStamp(state, 1);
  eq(unstamped.stamped, false, "a second click removes the stamp");
  eq(unstamped.samples, 1, "un-stamping does not refund the sample");

  // ---- selling a set -------------------------------------------------------

  state = logic.defaultState();
  var ids = catalog.animalsByCategory(1);
  eq(ids.length, 11, "category 1 has 11 animals");
  eq(logic.canSellSet(state, 1), false, "an empty category cannot be sold");

  for (var i = 0; i < ids.length; i++) {
    logic.changeSamples(state, ids[i], 2);
    logic.toggleStamp(state, ids[i]);
  }
  eq(logic.stampedCount(state, 1), ids.length, "every animal of the category is stamped");
  eq(logic.canSellSet(state, 1), true, "a complete set can be sold");
  eq(logic.sellSet(state, 1), ids.length, "selling clears every stamp of the category");
  eq(logic.stampedCount(state, 1), 0, "no stamp survives the sale");
  eq(logic.get(state, ids[0]).samples, 1, "samples survive the sale");

  logic.toggleStamp(state, ids[0]);
  eq(logic.canSellSet(state, 1), false, "an incomplete set cannot be sold");
  eq(logic.sellSet(state, 1), 0, "selling an incomplete set is a no-op");

  // ---- timers --------------------------------------------------------------
  //
  // A timer burns only the time the page was open: there is no end timestamp in
  // the save, the UI subtracts the elapsed milliseconds between two ticks.

  state = logic.defaultState();
  eq(logic.timerTotal("t48"), 2880, "the 48 minute timer is 2880 seconds");
  eq(logic.timerTotal("t50"), 3000, "the 50 minute timer is 3000 seconds");
  eq(logic.timerConfig("t48").label, "moonshine", "the 48 minute timer is labelled");
  eq(logic.timerConfig("t50").label, "trader", "the 50 minute timer is labelled");

  eq(logic.timerState(state, "t48").state, "idle", "timers start out idle");
  eq(logic.timerRemaining(state, "t48"), 2880, "an idle timer shows its total");
  eq(logic.timerAction(state, "t48", "stop"), false, "an idle timer cannot be stopped");
  eq(logic.timerAction(state, "t48", "reset"), false, "an idle timer needs no reset");
  eq(logic.timerAction(state, "nope", "start"), false, "unknown timers are refused");
  eq(logic.timerTick(state, "t48", 1000), false, "an idle timer burns no time");

  eq(logic.timerAction(state, "t48", "start"), true, "an idle timer starts");
  eq(logic.timerState(state, "t48").state, "running", "a started timer runs");
  eq(logic.timerAction(state, "t48", "start"), false, "a running timer cannot start twice");
  eq(logic.timerRemaining(state, "t48"), 2880, "a fresh countdown is the full duration");

  eq(logic.timerTick(state, "t48", 60000), true, "a running timer burns the elapsed time");
  eq(logic.timerRemaining(state, "t48"), 2820, "one burned minute leaves 2820 seconds");
  eq(logic.timerTick(state, "t48", 0), false, "a tick without elapsed time changes nothing");
  eq(logic.timerTick(state, "t48", -5000), false, "a backwards clock cannot add time");
  eq(logic.timerRemaining(state, "t48"), 2820, "the countdown survived those no-ops");

  // Nothing ticks while the page is closed: a reload only restores the value.
  var reloaded = logic.deserialize(logic.serialize(state));
  eq(logic.timerState(reloaded, "t48").state, "running", "a running timer survives a reload");
  eq(logic.timerRemaining(reloaded, "t48"), 2820, "no time passes while the page is gone");

  eq(logic.timerAction(state, "t48", "stop"), true, "a running timer stops");
  eq(logic.timerState(state, "t48").state, "paused", "a stopped timer is paused");
  eq(logic.timerTick(state, "t48", 600000), false, "a paused timer ignores elapsed time");
  eq(logic.timerRemaining(state, "t48"), 2820, "a paused timer holds its value");
  eq(logic.timerAction(state, "t48", "start"), true, "a paused timer resumes");
  eq(logic.timerRemaining(state, "t48"), 2820, "resuming keeps the remaining time");

  eq(logic.timerTick(state, "t48", 2819000), true, "the countdown runs down");
  eq(logic.timerRemaining(state, "t48"), 1, "one second left");
  eq(logic.timerState(state, "t48").state, "running", "still running at one second");
  eq(logic.timerTick(state, "t48", 5000), true, "overshooting the end is fine");
  eq(logic.timerState(state, "t48").state, "done", "a timer that ran out is done");
  eq(logic.timerRemaining(state, "t48"), 0, "a finished timer shows zero");
  eq(logic.timerTick(state, "t48", 1000), false, "a finished timer burns nothing");
  eq(logic.timerAction(state, "t48", "start"), false, "a finished timer needs a reset");
  eq(logic.timerAction(state, "t48", "reset"), true, "a finished timer resets");
  eq(logic.timerState(state, "t48").state, "idle", "a reset timer is idle again");
  eq(state.timers["t48"], undefined, "an idle timer is dropped from the save");

  eq(logic.formatMMSS(2880), "48:00", "48 minutes format as 48:00");
  eq(logic.formatMMSS(59), "00:59", "59 seconds format as 00:59");
  eq(logic.formatMMSS(-5), "00:00", "negative time formats as 00:00");

  // ---- in-game clock -------------------------------------------------------

  eq(logic.INGAME_SCALE, 30, "the world clock runs 30x faster than real time");
  eq(logic.INGAME_DAY_SECONDS, 2880, "an in-game day takes 2880 real seconds (48 minutes)");

  eq(logic.formatInGameClock(0), "00:00", "the unix epoch is in-game midnight");
  eq(logic.formatInGameClock(1791011676000), "01:18", "a known timestamp maps to a known in-game time");
  eq(logic.formatInGameClock(1700000000000), "18:40", "another known timestamp maps to in-game evening");
  eq(logic.formatInGameClock(2879999), "23:59", "the last millisecond before the rollover is 23:59");
  eq(logic.formatInGameClock(2880000), "00:00", "the clock wraps after 2880 real seconds");

  // 12-hour mode: English AM/PM marker, hour 0 shown as 12.
  eq(logic.formatInGameClock(0, false), "12:00 AM", "in-game midnight is 12:00 AM");
  eq(logic.formatInGameClock(1700000000000, false), "6:40 PM", "in-game 18:40 is 6:40 PM");
  eq(logic.formatInGameClock(2880000 * 12 / 24, false), "12:00 PM", "in-game noon is 12:00 PM");
  eq(logic.formatInGameClock(2880000 * 13 / 24, false), "1:00 PM", "in-game 13:00 is 1:00 PM");
  eq(logic.formatInGameClock(2879999, false), "11:59 PM", "the last minute of the day is 11:59 PM");
  eq(logic.formatInGameClock(0, true), "00:00", "24-hour mode pads the hour");
  eq(logic.inGameMeridiem(0), "AM", "midnight is AM");
  eq(logic.inGameMeridiem(2880000 * 12 / 24), "PM", "noon is PM");

  // The clock format is a user choice, unrelated to the language.
  var clockPrefs = logic.defaultState();
  eq(logic.clock24For(clockPrefs), true, "the 24-hour clock is the default");
  clockPrefs.lang = "en";
  eq(logic.clock24For(clockPrefs), true, "switching to English does not change the clock");
  clockPrefs.lang = "pl";
  eq(logic.clock24For(clockPrefs), true, "switching to Polish does not change the clock");
  eq(logic.toggleClock24(clockPrefs), false, "clicking the clock switches to 12-hour");
  eq(logic.clock24For(clockPrefs), false, "the 12-hour choice sticks");
  clockPrefs.lang = "en";
  eq(logic.clock24For(clockPrefs), false, "the choice survives a language change");
  eq(logic.toggleClock24(clockPrefs), true, "clicking again switches back to 24-hour");
  eq(logic.clock24For(logic.deserialize(logic.serialize(clockPrefs))), true,
    "the clock choice survives a save/load cycle");

  var twelveHour = logic.defaultState();
  logic.toggleClock24(twelveHour);
  eq(logic.serialize(twelveHour),
    '{"version":1,"lang":"en","view":"normal","animals":{},"timers":{},"clock24":false}',
    "the clock choice is only stored once it was made");
  eq(logic.clock24For(logic.sanitize({ clock24: "yes" })), true, "a bogus clock value is ignored");

  var noon = logic.inGameTime(1700000000000);
  eq(noon.hours, 18, "inGameTime reports the hour");
  eq(noon.minutes, 40, "inGameTime reports the minute");
  eq(noon.seconds, 0, "inGameTime reports the second");
  eq(noon.night, false, "18:40 in game is daytime");

  eq(logic.inGameTime(0).night, true, "midnight is night");
  eq(logic.inGameTime(2880000 * 22 / 24).night, true, "22:00 is night");
  eq(logic.inGameTime(2880000 * 4.9 / 24).night, true, "04:54 is still night");
  eq(logic.inGameTime(2880000 * 5 / 24).night, false, "05:00 is day again");
  eq(logic.inGameTime(2880000 * 21.9 / 24).night, false, "21:54 is still day");

  // The in-game clock must not touch the save at all.
  var clockState = logic.defaultState();
  logic.inGameTime(Date.now());
  eq(logic.serialize(clockState), logic.serialize(logic.defaultState()), "reading the clock stores nothing");

  // ---- persistence ---------------------------------------------------------

  state = logic.defaultState();
  state.lang = "pl";
  state.view = "legendary";
  logic.changeSamples(state, 77, 2);
  logic.timerAction(state, "t50", "start");
  var roundtrip = logic.deserialize(logic.serialize(state));
  eq(roundtrip.lang, "pl", "the language survives a save/load cycle");
  eq(roundtrip.view, "legendary", "the view survives a save/load cycle");
  eq(roundtrip.get === undefined, true, "a loaded save is plain data");
  eq(logic.get(roundtrip, 77).samples, 2, "samples survive a save/load cycle");
  eq(roundtrip.timers["t50"].state, "running", "a running timer survives a save/load cycle");
  eq(roundtrip.timers["t50"].remainingMs, 3000000, "the stored countdown is in milliseconds");

  eq(logic.deserialize("}not json{"), null, "broken input is rejected");

  var sanitized = logic.sanitize({
    lang: "xx",                       // unknown language
    view: "nope",                     // unknown view
    animals: { "1": { stamped: true, samples: 99 }, "66": 4, "9999": 4 },
    timers: {
      t48: { state: "running" },                               // no countdown left
      t50: { state: "paused", remainingMs: 9999999 },          // more than the duration
      bogus: { state: "running", remainingMs: 1000 }           // unknown id
    }
  });
  eq(sanitized.lang, "en", "an unknown language falls back to English");
  eq(sanitized.view, "normal", "an unknown view falls back to the first one");
  eq(logic.get(sanitized, 1).samples, 10, "an over-cap sample count is clamped");
  eq(logic.get(sanitized, 1).stamped, true, "the uncompressed shape is still accepted");
  eq(sanitized.animals["66"], undefined, "critter ids are not part of the catalog");
  eq(sanitized.animals["9999"], undefined, "unknown animal ids are dropped");
  eq(sanitized.timers["t48"], undefined, "a timer without a countdown is dropped");
  eq(sanitized.timers["t50"].remainingMs, 3000000, "an impossible countdown is clamped to the duration");
  eq(sanitized.timers["bogus"], undefined, "unknown timer ids are dropped");
  eq(logic.timerState(logic.sanitize({ timers: { t48: { state: "running", endAt: 1791011676000 } } }), "t48").state,
    "idle", "a save from the old endAt format starts out idle");

  // ---- search --------------------------------------------------------------

  function enName(id) { return languages.en.animals[id].name; }
  eq(logic.matches("", 1, enName), true, "an empty query matches everything");
  eq(logic.matches("cracker", 1, enName), true, "the search is case insensitive");
  eq(logic.matches("wolf", 1, enName), false, "a non-matching query filters the animal out");

  // ---- catalog -------------------------------------------------------------

  var categoryIds = [];
  for (var cid in catalog.categories) categoryIds.push(cid);
  eq(categoryIds.length, 9, "the catalog holds 9 categories (critters excluded)");

  var animalCount = 0;
  for (var aid in catalog.animals) {
    animalCount++;
    ok(!!catalog.categories[catalog.animals[aid].category], "animal " + aid + " points at a known category");
  }
  eq(animalCount, 107, "the catalog holds 107 animals (118 upstream minus 11 critters)");

  for (var k = 0; k < categoryIds.length; k++) {
    var id = categoryIds[k];
    eq(catalog.animalsByCategory(id).length, catalog.categories[id].total,
      "category " + id + " holds as many animals as its total says");
  }
  eq(catalog.categoriesByType("normal").length, 5, "there are 5 normal categories");
  eq(catalog.categoriesByType("legendary").length, 4, "there are 4 legendary categories");

  var badgeKeys = ["protect", "tagging", "harriet"];
  for (var b = 0; b < badgeKeys.length; b++) {
    var list = catalog.badges[badgeKeys[b]];
    for (var n = 0; n < list.length; n++) {
      ok(!!catalog.animals[list[n]], "badge " + badgeKeys[b] + " points at a known animal " + list[n]);
      eq(catalog.animals[list[n]].type, "legendary", "badge " + badgeKeys[b] + " is legendary only: " + list[n]);
    }
  }

  // ---- language coverage ---------------------------------------------------

  var codes = [];
  for (var code in languages) codes.push(code);
  ok(codes.length >= 2, "English and Polish ship with the app");
  ok(!!languages.en, "languages/en.js is loaded");
  ok(!!languages.pl, "languages/pl.js is loaded");

  for (var c = 0; c < codes.length; c++) {
    var lang = languages[codes[c]];
    var tag = codes[c];
    eq(lang.meta.code, tag, tag + ": meta.code matches the registration key");
    ok(!!lang.meta.name, tag + ": the language has a display name");

    for (var key in languages.en.ui) {
      ok(typeof lang.ui[key] === "string" && lang.ui[key].length > 0,
        tag + ": ui." + key + " is translated");
    }
    for (var extra in lang.ui) {
      ok(typeof languages.en.ui[extra] === "string", tag + ": ui." + extra + " also exists in English");
    }
    for (var cat in catalog.categories) {
      ok(!!(lang.categories[cat] && lang.categories[cat].name), tag + ": category " + cat + " has a name");
    }
    for (var an in catalog.animals) {
      ok(!!(lang.animals[an] && lang.animals[an].name), tag + ": animal " + an + " has a name");
    }
    for (var strayCat in lang.categories) {
      ok(!!catalog.categories[strayCat], tag + ": category " + strayCat + " exists in the catalog");
    }
    for (var strayAnimal in lang.animals) {
      ok(!!catalog.animals[strayAnimal], tag + ": animal " + strayAnimal + " exists in the catalog");
    }
  }

  // Placeholders have to line up, otherwise a translation silently loses data.
  function placeholders(text) {
    var found = text.match(/\{\w+\}/g) || [];
    return found.sort().join(",");
  }
  for (var c2 = 0; c2 < codes.length; c2++) {
    var other = languages[codes[c2]];
    for (var pk in languages.en.ui) {
      eq(placeholders(other.ui[pk] || ""), placeholders(languages.en.ui[pk]),
        codes[c2] + ": ui." + pk + " uses the same placeholders as English");
    }
  }

  // English names have to be the upstream ones.
  eq(languages.en.animals[1].name, "Florida Cracker Cow", "English names come from the upstream data");
  eq(languages.en.animals[15].fullname, "Baja California Pronghorn Buck", "the untruncated name is kept");
  eq(languages.en.categories[1].name, "Farmland", "English category names come from the upstream data");
  eq(languages.pl.categories[1].name, "Udomowione", "Polish category names are translated");
  eq(languages.en.ui.badge_protect, "P", "the Protect Legendary Animal badge is P in English");
  eq(languages.en.ui.badge_tagging, "T", "the Wild Animal Tagging badge is T in English");
  eq(languages.pl.ui.badge_protect, "O", "the Protect Legendary Animal badge is O in Polish");
  eq(languages.pl.ui.badge_tagging, "Z", "the Wild Animal Tagging badge is Z in Polish");

  // Every timer label in the catalog needs a string in every language.
  for (var tc = 0; tc < codes.length; tc++) {
    for (var ti = 0; ti < catalog.timers.length; ti++) {
      var key = "timer_" + catalog.timers[ti].label;
      ok(typeof languages[codes[tc]].ui[key] === "string" && languages[codes[tc]].ui[key].length > 0,
        codes[tc] + ": " + key + " is translated");
    }
  }

  root.TEST_RESULT = { checks: checks, failures: failures };
})(typeof window !== "undefined" ? window : this);
