#!/usr/bin/env python3
"""Run the tracker test suite against the real files in src/.

The site is plain JS with no build step, so the suite runs in an embedded JS
engine (duktape, via the `dukpy` package) instead of a browser:

    pip install dukpy
    python3 tests/run.py

What is covered:
  1. logic.test.js  -- rules, timers, save format, catalog + language coverage
  2. app boot       -- src/assets/app.js rendered against tests/dom_shim.js
  3. index.html     -- loads every shipped file and nothing external
"""

from __future__ import annotations

import json
import pathlib
import re
import sys

try:
    import dukpy
except ImportError:  # pragma: no cover - environment hint only
    sys.exit("dukpy is required: pip install dukpy")

ROOT = pathlib.Path(__file__).resolve().parent.parent
SITE = ROOT / "src"
TESTS = ROOT / "tests"

# The scripts index.html loads, in load order.
SITE_SCRIPTS = [
    "data/catalog.js",
    "languages/en.js",
    "languages/pl.js",
    "assets/logic.js",
]


def read(path: pathlib.Path) -> str:
    if not path.exists():
        sys.exit(f"missing file: {path.relative_to(ROOT)}")
    return path.read_text(encoding="utf-8")


def bundle(prelude: str, names: list[str]) -> str:
    parts = [prelude]
    for name in names:
        parts.append(f"// ==== src/{name} ====\n" + read(SITE / name))
    return "\n".join(parts)


def run_logic_suite() -> list[str]:
    source = bundle("var window = this;", SITE_SCRIPTS)
    source += "\n// ==== tests/logic.test.js ====\n" + read(TESTS / "logic.test.js")
    source += "\nJSON.stringify(window.TEST_RESULT);"
    try:
        report = json.loads(dukpy.evaljs(source))
    except dukpy.JSRuntimeError as exc:
        return [f"logic.test.js crashed: {exc}"]
    print(f"logic.test.js: {report['checks']} checks, {len(report['failures'])} failed")
    return list(report["failures"])


# The shim reports navigator.language = "pl-PL", so a first visit has to come up
# in Polish; 14 rows = 11 animals of category 1 + 3 placeholders.
EXPECTED_BOOT = {
    "title": "RDO Tracker przyrodnika",
    "htmlLang": "pl",
    "views": 2,
    "viewLabels": ["Zwyczajne", "Legendarne"],
    "panels": 5,
    "panelColumns": "5",
    "firstPanelTitle": "Udomowione",
    "firstPanelRows": 14,
    "firstRowName": "Krowa rasy Florida Cracker",
    "timers": 2,
    "timerLabel": "Zacier bimbru (48 min)",
    "timerDisplay": "48:00",
    "languages": 2,
    "clockFormatOk": True,
    "clockIconOk": True,
    "clockAfterClickOk": True,
    "clockBackTo24Ok": True,
}

INSPECT_BOOT = """
JSON.stringify({
  title: document.title,
  htmlLang: document.documentElement.lang,
  views: document.getElementById("views").children.length,
  viewLabels: [
    document.getElementById("views").children[0].textContent,
    document.getElementById("views").children[1].textContent
  ],
  panels: document.getElementById("results").children.length,
  panelColumns: document.getElementById("results").style.props["--panels-cols"],
  firstPanelTitle: document.getElementById("results").children[0].children[0].textContent,
  firstPanelRows: document.getElementById("results").children[0].children[2].children.length,
  firstRowName: document.getElementById("results").children[0].children[2].children[0].children[0].textContent,
  timers: document.getElementById("timers").children.length,
  timerLabel: document.getElementById("timers").children[0].children[0].children[0].textContent,
  timerDisplay: document.getElementById("timers").children[0].children[1].textContent,
  languages: document.getElementById("lang").children.length,
  clockFormatOk: /^[0-9]{2}:[0-9]{2}$/.test(document.getElementById("clockTime").textContent),
  clockIconOk: document.getElementById("clockIcon").textContent.length > 0,
  clockAfterClickOk: (function () {
    document.getElementById("clock").listeners.click();
    return /^[0-9]{1,2}:[0-9]{2} (AM|PM)$/.test(document.getElementById("clockTime").textContent);
  })(),
  clockBackTo24Ok: (function () {
    document.getElementById("clock").listeners.click();
    return /^[0-9]{2}:[0-9]{2}$/.test(document.getElementById("clockTime").textContent);
  })()
});
"""


def run_boot_test() -> list[str]:
    source = bundle(read(TESTS / "dom_shim.js"), SITE_SCRIPTS + ["assets/app.js"])
    source += INSPECT_BOOT
    try:
        rendered = json.loads(dukpy.evaljs(source))
    except dukpy.JSRuntimeError as exc:
        return [f"app.js did not boot: {exc}"]

    failures = []
    for key, want in EXPECTED_BOOT.items():
        got = rendered.get(key)
        if got != want:
            failures.append(f"app boot: {key} = {got!r}, want {want!r}")
    if not failures:
        print(f"app.js: boots and renders {rendered['panels']} panels, {rendered['timers']} timers")
    return failures


TIMER_START = """
  var timer = document.getElementById("timers").children[0];
  var buttons = timer.children[2];
  buttons.children[0].listeners.click();      // Start
  FAKE_NOW += 60000;                          // one minute with the page open
  window.__tick();
  JSON.stringify({
    display: timer.children[1].textContent,
    state: timer.children[0].children[1].textContent,
    saved: localStorage.getItem("rdo-naturalist-tracker")
  });
"""

TIMER_REOPEN = """
  var timer = document.getElementById("timers").children[0];
  window.__tick();                            // one render after reopening
  JSON.stringify({
    display: timer.children[1].textContent,
    state: timer.children[0].children[1].textContent
  });
"""


def run_timer_close_test() -> list[str]:
    """A timer counts down while the page is open and freezes once it is gone."""
    shim = read(TESTS / "dom_shim.js")
    scripts = SITE_SCRIPTS + ["assets/app.js"]
    opened = shim + "\nFAKE_NOW = 1700000000000;"
    try:
        first = json.loads(dukpy.evaljs(bundle(opened, scripts) + TIMER_START))
    except dukpy.JSRuntimeError as exc:
        return [f"timer test could not start the timer: {exc}"]

    failures = []
    if first["display"] != "47:00":
        failures.append(f"timer after 60s open: {first['display']!r}, want '47:00'")
    if first["state"] != "biegnie":
        failures.append(f"timer state while running: {first['state']!r}, want 'biegnie'")
    if not first["saved"]:
        failures.append("the running timer was not persisted")
        return failures
    if "remainingMs" not in first["saved"]:
        failures.append(f"the save holds no countdown: {first['saved']}")

    # Reopen the page an hour later with the save from above: the countdown must
    # continue where it stopped instead of having run in the background.
    reopened = shim + (
        "\nFAKE_NOW = %d;\nstorage[%s] = %s;"
        % (1700000000000 + 3_600_000, json.dumps("rdo-naturalist-tracker"), json.dumps(first["saved"]))
    )
    try:
        second = json.loads(dukpy.evaljs(bundle(reopened, scripts) + TIMER_REOPEN))
    except dukpy.JSRuntimeError as exc:
        return failures + [f"timer test could not reopen the page: {exc}"]

    if second["display"] != "47:00":
        failures.append(f"timer after an hour closed: {second['display']!r}, want '47:00'")
    if second["state"] != "biegnie":
        failures.append(f"timer state after reopening: {second['state']!r}, want 'biegnie'")
    if not failures:
        print("timers: burn time only while the page is open (47:00 before and after a close)")
    return failures


def check_i18n_attributes() -> list[str]:
    """Every data-i18n* key in index.html has to exist in the language files."""
    html = read(SITE / "index.html")
    keys = set(re.findall(r'data-i18n(?:-placeholder|-title)?="([^"]+)"', html))
    if not keys:
        return ["index.html carries no data-i18n attributes"]

    source = bundle("var window = this;", ["languages/en.js", "languages/pl.js"])
    source += "\nJSON.stringify(Object.keys(window.RDO_LANGUAGES.en.ui));"
    try:
        known = set(json.loads(dukpy.evaljs(source)))
    except dukpy.JSRuntimeError as exc:
        return [f"cannot read the English ui keys: {exc}"]

    failures = [f"index.html uses the unknown string {key!r}" for key in sorted(keys - known)]
    if not failures:
        print(f"index.html: {len(keys)} data-i18n keys all exist")
    return failures


def check_index_html() -> list[str]:
    html = read(SITE / "index.html")
    failures = []
    for name in ["assets/styles.css", "assets/app.js"] + SITE_SCRIPTS:
        if name not in html:
            failures.append(f"index.html does not load {name}")
    for url in re.findall(r'(?:src|href)="([^"]+)"', html):
        if url.startswith(("http://", "https://", "//")):
            failures.append(f"index.html pulls an external resource: {url}")
        elif not (SITE / url).exists():
            failures.append(f"index.html references a missing file: {url}")
    if not failures:
        print("index.html: all references are local and present")
    return failures


def main() -> int:
    failures = (run_logic_suite() + run_boot_test() + run_timer_close_test()
                + check_i18n_attributes() + check_index_html())
    for failure in failures:
        print(f"  FAIL  {failure}")
    print("FAILED" if failures else "OK")
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
