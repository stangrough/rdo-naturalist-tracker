// assets/app.js -- DOM wiring for the tracker.
//
// Rules live in assets/logic.js, ids in data/catalog.js, strings in
// languages/<code>.js. This file only renders and persists. Progress is kept in
// localStorage; nothing ever leaves the browser.
(function () {
  "use strict";

  var catalog = window.RDO_CATALOG;
  var logic = window.RDO_LOGIC;
  var languages = window.RDO_LANGUAGES;

  var state = load();
  var query = "";

  // ---- i18n ----------------------------------------------------------------

  // Missing keys fall back to English, then to the key itself.
  function dict() {
    return languages[state.lang] || languages[logic.DEFAULT_LANG];
  }

  function fill(text, vars) {
    if (!vars) return text;
    return text.replace(/\{(\w+)\}/g, function (match, name) {
      return Object.prototype.hasOwnProperty.call(vars, name) ? String(vars[name]) : match;
    });
  }

  function t(key, vars) {
    var active = dict();
    var fallback = languages[logic.DEFAULT_LANG];
    var text = (active.ui && active.ui[key]) || (fallback.ui && fallback.ui[key]) || key;
    return fill(text, vars);
  }

  function animalName(id) {
    var entry = (dict().animals || {})[id] || (languages[logic.DEFAULT_LANG].animals || {})[id];
    return entry ? entry.name : "#" + id;
  }

  function animalFullName(id) {
    var entry = (dict().animals || {})[id] || (languages[logic.DEFAULT_LANG].animals || {})[id];
    if (!entry) return "#" + id;
    return entry.fullname || entry.name;
  }

  function categoryName(id) {
    var entry = (dict().categories || {})[id] || (languages[logic.DEFAULT_LANG].categories || {})[id];
    return entry ? entry.name : "#" + id;
  }

  // ---- persistence ---------------------------------------------------------

  function load() {
    try {
      var raw = window.localStorage.getItem(logic.STORAGE_KEY);
      if (raw) {
        var parsed = logic.deserialize(raw);
        if (parsed) return parsed;
      }
    } catch (e) {
      // Private mode / storage disabled: run in memory only.
    }
    var fresh = logic.defaultState();
    fresh.lang = pickLanguage();
    return fresh;
  }

  // Browser language if we have a file for it, English otherwise.
  function pickLanguage() {
    var wanted = (navigator.language || logic.DEFAULT_LANG).toLowerCase().split("-")[0];
    return languages[wanted] ? wanted : logic.DEFAULT_LANG;
  }

  function save() {
    try {
      window.localStorage.setItem(logic.STORAGE_KEY, logic.serialize(state));
    } catch (e) {
      // Nothing to do; the UI keeps working with the in-memory state.
    }
  }

  // ---- small DOM helpers ---------------------------------------------------

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  var $views = document.getElementById("views");
  var $timers = document.getElementById("timers");
  var $results = document.getElementById("results");
  var $empty = document.getElementById("empty");
  var $q = document.getElementById("q");
  var $lang = document.getElementById("lang");
  var $clock = document.getElementById("clock");
  var $clockIcon = document.getElementById("clockIcon");
  var $clockTime = document.getElementById("clockTime");

  // ---- static text ---------------------------------------------------------

  function applyStaticText() {
    document.documentElement.lang = state.lang;
    document.title = t("app_title");
    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].textContent = t(nodes[i].getAttribute("data-i18n"));
    }
    nodes = document.querySelectorAll("[data-i18n-placeholder]");
    for (i = 0; i < nodes.length; i++) {
      nodes[i].placeholder = t(nodes[i].getAttribute("data-i18n-placeholder"));
    }
    nodes = document.querySelectorAll("[data-i18n-title]");
    for (i = 0; i < nodes.length; i++) {
      nodes[i].title = t(nodes[i].getAttribute("data-i18n-title"));
    }
  }

  // ---- language picker -----------------------------------------------------

  function renderLanguagePicker() {
    $lang.innerHTML = "";
    var codes = Object.keys(languages).sort();
    for (var i = 0; i < codes.length; i++) {
      var opt = el("option", null, languages[codes[i]].meta.name);
      opt.value = codes[i];
      $lang.appendChild(opt);
    }
    $lang.value = state.lang;
  }

  $lang.addEventListener("change", function () {
    if (!languages[$lang.value]) return;
    state.lang = $lang.value;
    save();
    applyStaticText();
    renderViews();
    renderTimers();
    tickClock();
    render();
  });

  // ---- views (normal / legendary) -----------------------------------------

  function renderViews() {
    $views.innerHTML = "";
    for (var i = 0; i < catalog.views.length; i++) {
      var view = catalog.views[i];
      var btn = el("button", view.id === state.view ? "active" : null, t("view_" + view.id));
      btn.type = "button";
      btn.dataset.view = view.id;
      $views.appendChild(btn);
    }
  }

  $views.addEventListener("click", function (event) {
    var btn = event.target.closest("button");
    if (!btn) return;
    state.view = btn.dataset.view;
    save();
    renderViews();
    render();
  });

  // ---- animal row ----------------------------------------------------------

  var BADGES = [
    { key: "protect", cls: "badge badge-protect", label: "badge_protect", hint: "badge_protect_hint" },
    { key: "tagging", cls: "badge badge-tagging", label: "badge_tagging", hint: "badge_tagging_hint" },
    { key: "harriet", cls: "badge badge-harriet", label: "badge_harriet", hint: "badge_harriet_hint" }
  ];

  function badgesFor(id) {
    var out = [];
    for (var i = 0; i < BADGES.length; i++) {
      if (catalog.badges[BADGES[i].key].indexOf(Number(id)) !== -1) out.push(BADGES[i]);
    }
    return out.slice(0, 2); // two badges is all a row has space for
  }

  function makeCard(id, onChange) {
    var card = el("div", "row-card");
    var cap = logic.capFor(id);

    var name = el("div", "name", animalName(id));
    name.title = animalFullName(id);
    card.appendChild(name);

    var badges = badgesFor(id);
    for (var i = 0; i < badges.length; i++) {
      var badge = el("span", badges[i].cls, t(badges[i].label));
      badge.title = t(badges[i].hint);
      card.appendChild(badge);
    }

    var counter = el("div", "counter");
    var minus = el("button", null, "\u2212");
    minus.type = "button";
    minus.title = t("samples_minus");
    var value = el("span", "value");
    var plus = el("button", null, "+");
    plus.type = "button";
    plus.title = t("samples_plus");
    counter.appendChild(minus);
    counter.appendChild(value);
    counter.appendChild(plus);
    card.appendChild(counter);

    var stamp = el("span", "stamp");
    var icon = el("span", "icon");
    var label = el("span", "label", t("stamped"));
    stamp.appendChild(icon);
    stamp.appendChild(label);
    card.appendChild(stamp);

    function refresh() {
      var rec = logic.get(state, id);
      value.textContent = rec.samples;
      minus.disabled = rec.samples <= 0;
      plus.disabled = rec.samples >= cap;
      plus.title = rec.samples >= cap ? t("samples_max", { cap: cap }) : t("samples_plus");
      card.classList.toggle("maxed", rec.samples >= cap);
      card.classList.toggle("stamped", rec.stamped);
      stamp.classList.toggle("on", rec.stamped);
      var blocked = !logic.canStamp(state, id);
      stamp.classList.toggle("disabled", blocked);
      stamp.title = blocked ? t("stamped_blocked") : t("stamped_hint");
      icon.textContent = rec.stamped ? "\u2713" : "\u25ef";
    }

    function change(delta) {
      logic.changeSamples(state, id, delta);
      save();
      refresh();
      if (onChange) onChange();
    }

    minus.addEventListener("click", function () { change(-1); });
    plus.addEventListener("click", function () { change(1); });
    stamp.addEventListener("click", function () {
      if (!logic.toggleStamp(state, id)) return;
      save();
      refresh();
      if (onChange) onChange();
    });

    refresh();
    return card;
  }

  function makePlaceholder() {
    var node = el("div", "row-card placeholder");
    node.setAttribute("aria-hidden", "true");
    node.innerHTML = "&nbsp;";
    return node;
  }

  // ---- category panel ------------------------------------------------------

  function makePanel(categoryId, ids) {
    var category = catalog.categories[categoryId];
    var panel = el("div", "panel");
    panel.appendChild(el("h2", null, categoryName(categoryId)));

    var meta = el("div", "panel-meta");
    var progress = el("span");
    meta.appendChild(progress);
    meta.appendChild(el("span", null, t("price", { price: category.price })));
    panel.appendChild(meta);

    var list = el("div", "list");
    panel.appendChild(list);

    var controls = el("div", "controls");
    var sell = el("button", "sell", t("sell_set"));
    sell.type = "button";
    controls.appendChild(sell);
    panel.appendChild(controls);

    var total = catalog.animalsByCategory(categoryId).length;

    function refreshPanel() {
      var stamped = logic.stampedCount(state, categoryId);
      progress.textContent = t("progress", { stamped: stamped, total: total });
      progress.className = stamped === total ? "done" : "";
      var canSell = logic.canSellSet(state, categoryId);
      sell.disabled = !canSell;
      sell.title = canSell ? t("sell_set_hint") : t("sell_set_blocked");
    }

    sell.addEventListener("click", function () {
      if (!logic.canSellSet(state, categoryId)) return;
      if (!window.confirm(t("sell_set_confirm", { category: categoryName(categoryId) }))) return;
      logic.sellSet(state, categoryId);
      save();
      render();
    });

    for (var i = 0; i < ids.length; i++) list.appendChild(makeCard(ids[i], refreshPanel));
    var missing = catalog.settings.rows_per_category - ids.length;
    for (var p = 0; p < missing; p++) list.appendChild(makePlaceholder());

    refreshPanel();
    return panel;
  }

  // ---- main render ---------------------------------------------------------

  function viewType() {
    for (var i = 0; i < catalog.views.length; i++) {
      if (catalog.views[i].id === state.view) return catalog.views[i].type;
    }
    return catalog.views[0].type;
  }

  function render() {
    $results.innerHTML = "";
    var categories = catalog.categoriesByType(viewType());
    $results.style.setProperty("--panels-cols", String(categories.length));

    var shown = 0;
    for (var i = 0; i < categories.length; i++) {
      var ids = catalog.animalsByCategory(categories[i]).filter(function (id) {
        return logic.matches(query, id, animalFullName) ||
               logic.matches(query, id, animalName) ||
               (query && categoryName(catalog.animals[id].category).toLowerCase()
                 .indexOf(query.toLowerCase()) !== -1);
      });
      if (query && ids.length === 0) continue;
      shown += ids.length;
      $results.appendChild(makePanel(categories[i], ids));
    }
    $empty.hidden = !(query && shown === 0);
  }

  var searchTimer = null;
  $q.addEventListener("input", function () {
    window.clearTimeout(searchTimer);
    searchTimer = window.setTimeout(function () {
      query = $q.value.trim();
      render();
    }, 120);
  });

  // ---- in-game clock -------------------------------------------------------
  //
  // Derived from the system clock alone (see logic.inGameTime), so this costs no
  // network request and keeps working offline.
  function tickClock() {
    var now = Date.now();
    var time = logic.inGameTime(now);
    $clockTime.textContent = logic.formatInGameClock(now, logic.clock24For(state));
    $clockIcon.textContent = time.night ? "\ud83c\udf19" : "\u2600";
    $clock.classList.toggle("night", time.night);
  }

  // Clicking the clock switches between 24-hour and 12-hour (AM/PM).
  $clock.addEventListener("click", function () {
    logic.toggleClock24(state);
    save();
    tickClock();
  });

  // ---- timers --------------------------------------------------------------

  var timerNodes = [];

  function renderTimers() {
    $timers.innerHTML = "";
    timerNodes = [];
    for (var i = 0; i < catalog.timers.length; i++) {
      timerNodes.push(makeTimer(catalog.timers[i]));
    }
    tickTimers();
  }

  function makeTimer(cfg) {
    var node = el("div", "timer");
    node.dataset.id = cfg.id;

    var head = el("div", "timer-head");
    head.appendChild(el("span", "timer-label", t("timer", {
      name: t("timer_" + cfg.label),
      minutes: cfg.minutes
    })));
    var stateEl = el("span", "timer-state");
    head.appendChild(stateEl);
    node.appendChild(head);

    var display = el("div", "timer-display");
    node.appendChild(display);

    var buttons = el("div", "timer-buttons");
    var start = el("button", "btn-start", t("timer_start"));
    var stop = el("button", "btn-stop", t("timer_stop"));
    var reset = el("button", "btn-reset", t("timer_reset"));
    start.type = stop.type = reset.type = "button";
    buttons.appendChild(start);
    buttons.appendChild(stop);
    buttons.appendChild(reset);
    node.appendChild(buttons);

    function act(action) {
      if (!logic.timerAction(state, cfg.id, action)) return;
      lastTickAt = Date.now();   // the fresh countdown starts now
      save();
      tickTimers();
    }
    start.addEventListener("click", function () { act("start"); });
    stop.addEventListener("click", function () { act("stop"); });
    reset.addEventListener("click", function () { act("reset"); });

    $timers.appendChild(node);
    return { cfg: cfg, node: node, display: display, stateEl: stateEl, start: start, stop: stop, reset: reset };
  }

  // Only the time the page was actually open is burned: `lastTickAt` starts at
  // load time, so a tab that was closed for an hour continues where it stopped.
  var lastTickAt = Date.now();
  var lastSaveAt = 0;

  function tickTimers() {
    var now = Date.now();
    var elapsed = Math.max(0, now - lastTickAt);
    lastTickAt = now;

    var dirty = false;
    for (var i = 0; i < timerNodes.length; i++) {
      var ui = timerNodes[i];
      if (logic.timerTick(state, ui.cfg.id, elapsed)) dirty = true;

      var snapshot = logic.timerState(state, ui.cfg.id);
      ui.display.textContent = logic.formatMMSS(logic.timerRemaining(state, ui.cfg.id));
      ui.node.dataset.state = snapshot.state;
      ui.stateEl.dataset.state = snapshot.state;
      ui.stateEl.textContent = t("timer_state_" + snapshot.state);
      ui.start.disabled = snapshot.state === "running" || snapshot.state === "done";
      ui.stop.disabled = snapshot.state !== "running";
      ui.reset.disabled = snapshot.state === "idle";
    }

    // Writing twice a second is pointless; once a second keeps the loss on a
    // crash below a second.
    if (dirty && now - lastSaveAt >= 1000) {
      lastSaveAt = now;
      save();
    }
  }

  // Last chance to store the countdown before the tab goes away.
  function freezeTimers() {
    tickTimers();
    lastSaveAt = 0;
    save();
  }
  window.addEventListener("pagehide", freezeTimers);
  window.addEventListener("beforeunload", freezeTimers);

  // ---- export / import / reset --------------------------------------------

  document.getElementById("export").addEventListener("click", function () {
    var blob = new Blob([logic.serialize(state)], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var link = el("a");
    link.href = url;
    link.download = "rdo-naturalist-tracker.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });

  var $importFile = document.getElementById("importFile");
  document.getElementById("import").addEventListener("click", function () { $importFile.click(); });
  $importFile.addEventListener("change", function () {
    var file = $importFile.files && $importFile.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      var imported = logic.deserialize(String(reader.result));
      $importFile.value = "";
      if (!imported) {
        window.alert(t("import_file_failed"));
        return;
      }
      state = imported;
      save();
      boot();
    };
    reader.readAsText(file);
  });

  document.getElementById("reset").addEventListener("click", function () {
    if (!window.confirm(t("reset_confirm"))) return;
    var lang = state.lang;
    state = logic.defaultState();
    state.lang = lang;
    save();
    boot();
  });

  // Another tab changed the save: pick it up.
  window.addEventListener("storage", function (event) {
    if (event.key !== logic.STORAGE_KEY || !event.newValue) return;
    var incoming = logic.deserialize(event.newValue);
    if (!incoming) return;
    state = incoming;
    boot();
  });

  // ---- boot ----------------------------------------------------------------

  function boot() {
    applyStaticText();
    renderLanguagePicker();
    renderViews();
    renderTimers();   // also runs the first tick
    tickClock();
    render();
  }

  function tick() {
    tickTimers();
    tickClock();
  }

  boot();
  window.setInterval(tick, 500);
  document.addEventListener("visibilitychange", function () {
    // Hidden tabs get their timers throttled, so catch up (and persist) on both
    // edges: the countdown keeps running while the page is merely in the
    // background, it only stops once the page is gone.
    if (document.hidden) freezeTimers();
    else tick();
  });
})();
