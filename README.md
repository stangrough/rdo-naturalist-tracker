# RDO Naturalist Tracker

Static tracker for the Red Dead Online naturalist role: samples, stamps, sellable
sets and two named cooldown timers (moonshine mash 48 min, trader resupply
50 min). No server, no account, no build
step — plain HTML, CSS and JavaScript published from GitHub Pages, with all
progress kept in the browser's `localStorage`.

## Run it locally

A small Go file server ships with the repo for user testing:

```bash
go run ./cmd/serve              # serves src/ on http://127.0.0.1:1234 and opens a browser
go run ./cmd/serve -addr :1234  # reachable from the LAN (phone, second machine)
go run ./cmd/serve -open=false  # no browser
go run ./cmd/serve -dir src     # explicit directory
```

It sends `Cache-Control: no-store`, so a reload always shows the current working
tree. Any other static server works too (`python3 -m http.server -d src 8777`),
and `src/index.html` can even be opened straight from disk: every file is loaded
with a `<script>`/`<link>` tag, nothing is fetched at runtime, nothing comes from
a CDN.

## Layout

| Path                    | What lives there                                                                 |
|-------------------------|----------------------------------------------------------------------------------|
| `src/index.html`        | Page skeleton; all text nodes are filled in by the active language               |
| `src/assets/styles.css` | All styling                                                                      |
| `src/assets/logic.js`   | Rules only (caps, stamping, sets, timers, save format) — no DOM, no browser APIs |
| `src/assets/app.js`     | Rendering, event wiring, `localStorage`, export/import                           |
| `src/data/catalog.js`   | Language-free catalog: ids, categories, types, prices, caps, badge groups        |
| `src/languages/en.js`   | English strings (default language and fallback for all others)                   |
| `src/languages/pl.js`   | Polish strings                                                                   |
| `cmd/serve/`            | Go dev server for local testing                                                  |
| `tests/`                | Test suite (`python3 tests/run.py`)                                              |

`src/` is exactly what gets published; everything else is tooling.

### Why `data/catalog.js` and `languages/` are separate

`src/data/catalog.js` holds everything about an animal that is *not* text: its
id, which category it belongs to, whether it is normal or legendary (which
decides the sample cap), the set price, and the badge groups.
`src/languages/<code>.js` holds nothing *but* text, keyed by those same ids:

```js
// src/data/catalog.js
77:{category:7,type:"legendary",species:"alligator"}

// src/languages/en.js
77:{name:"Teca gator"}

// src/languages/pl.js
77:{name:"Legendarny aligator Teca"}
```

So a translation never touches game data, game data never duplicates a name, and
adding a language cannot break the rules. Ids, categories, prices and the English
names were taken 1:1 from the upstream Naturalist tracker `data.js`; critters are
left out on purpose. The Polish names come from the previous, server-based
version of this tracker.

### Adding a language

1. Copy `src/languages/en.js` to `src/languages/<code>.js`.
2. Change `root.RDO_LANGUAGES.en` to `root.RDO_LANGUAGES.<code>`, update `meta`.
3. Translate the values; keep every key and every `{placeholder}`.
4. Add `<script src="languages/<code>.js"></script>` to `src/index.html`.
5. Run `python3 tests/run.py` — it fails on missing keys, unknown ids and
   placeholders that do not line up.

The language picker in the header lists whatever is registered; a missing key
falls back to English. On first visit the browser language is used if a file for
it exists, otherwise English.

## Badges

Three non-clickable badges mark legendary animals by the Harriet mission type
they can show up in. The letters are translated, the group names are not:

| Group (`catalog.badges`) | EN | PL | Meaning                  |
|--------------------------|----|----|--------------------------|
| `protect`                | P  | O  | Protect Legendary Animal |
| `tagging`                | T  | Z  | Wild Animal Tagging      |
| `harriet`                | H  | H  | Harriet mission only     |

## In-game clock

The header shows Red Dead's world clock next to the search box, with a sun/moon
icon for day and night. It is pure arithmetic on the system clock, no request
and no stored anchor:

```js
new Date(Date.now() * 30)   // read as UTC
```

The world clock runs 30x faster than real time, so an in-game day lasts
86400 / 30 = 2880 real seconds (48 real minutes) and in-game midnight always
falls on UTC 00:00 plus a multiple of 48 minutes. Night is in-game 22:00-05:00,
the same split the community collectors map uses. This is unrelated to the two
cooldown timers below, which are manual bookmarks you start by hand.

Clicking the clock switches between 24-hour (`07:03`) and 12-hour (`7:03 AM`).
The AM/PM marker is English in every language: the clock format is a separate
user choice, stored as `clock24` in the save, and changing the language never
changes it.

## Rules

- Sample cap: 10 for normal animals, 3 for legendary ones.
- Stamping consumes one sample; un-stamping does not give it back.
- "Sell set" only unlocks once every animal of the category is stamped; it clears
  the category's stamps and keeps the samples.
- The timers only count down while the page is open. The save keeps the
  milliseconds that are left, not an end timestamp, so closing the tab freezes
  a running countdown and reopening continues from the same value. A background
  tab still counts (the countdown follows the real clock between two renders);
  only a closed page stops it.

## Timers

| Catalog entry (`catalog.timers`) | Duration | EN label        | PL label             |
|----------------------------------|----------|-----------------|----------------------|
| `{ id: "t48", label: "moonshine" }` | 48 min | Moonshine mash  | Zacier bimbru        |
| `{ id: "t50", label: "trader" }`    | 50 min | Trader resupply | Dostawa materiałów   |

The duration lives only in `src/data/catalog.js`; the name is the `timer_<label>`
string in each language file and the header is composed from both
(`timer: "{name} ({minutes} min)"`). Renaming a timer, changing a duration or
adding a third one is a one-line change plus one string per language — the test
suite fails if a label has no translation.

Start / Stop / Reset behave like a stopwatch: Stop keeps the remaining time,
Reset goes back to the full duration, and a finished timer has to be reset
before it can start again.

## Save format

One `localStorage` key, `rdo-naturalist-tracker`. Defaults are implicit, so a
fresh save is a few dozen bytes instead of a record per animal:

```json
{"version":1,"lang":"en","view":"normal","animals":{"77":5},"timers":{}}
```

`clock24` is added only after the clock has been clicked (`false` = 12-hour).

`timers` only lists timers that are not idle, as
`{"t48":{"state":"running","remainingMs":2820000}}`; saves from the older
`endAt` format are dropped and start out idle.

`animals` only lists animals that differ from the default, packed as
`samples * 2 + (stamped ? 1 : 0)` — `5` above means 2 samples and a stamp.
Unknown ids, out-of-range counts and old uncompressed entries are dropped or
clamped on load. "Export file" / "Import file" in the footer read and write that
same JSON, so progress can also be kept as a local file or carried to another
browser.

## Tests

```bash
pip install dukpy
python3 tests/run.py
```

The runner loads the real files from `src/` into an embedded JS engine, so there
is nothing to build and no browser involved:

1. `tests/logic.test.js` — over 1000 assertions on the rules, timers, in-game
   clock, save format, catalog integrity and language coverage (every id
   translated, no stray ids, matching `{placeholders}`).
2. `src/assets/app.js` is booted against `tests/dom_shim.js` and the rendered
   page is inspected (tabs, panels, rows, timers, clock, language picker). The
   shim lets the suite pin the clock and drive the render loop, so one test
   starts a timer, burns a minute, "closes" the tab and reopens it an hour later
   to prove the countdown did not move while the page was gone.
3. `src/index.html` is checked to load every shipped file and nothing external,
   and every `data-i18n` key it uses must exist in the language files.

## GitHub Pages

`.github/workflows/pages.yml` runs the suite, builds the Go dev server, and then
publishes `src/` as the site. Enable it once per repository: **Settings → Pages →
Build and deployment → Source: GitHub Actions**. Every push to `main`/`master`
redeploys; pull requests only run the tests.
