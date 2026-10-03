// languages/en.js -- English strings (the default language and the fallback
// for every other language).
//
// Keys and English names come straight from the upstream Naturalist tracker
// `data.js`. To add a language: copy this file, translate the values, keep the
// ids, and add a <script> tag for it in index.html.
(function (root) {
  "use strict";

  root.RDO_LANGUAGES = root.RDO_LANGUAGES || {};

  root.RDO_LANGUAGES.en = {
    meta: { code: "en", name: "English" },

    // Interface strings; `{placeholder}` markers are filled in by assets/app.js.
    ui: {
      app_title: "RDO Naturalist Tracker",
      language: "Language",
      search_placeholder: "Search for an animal or a category...",
      view_normal: "Normal",
      view_legendary: "Legendary",
      no_results: "No results.",
      clock: "In-game time",
      progress: "{stamped}/{total} stamped",
      price: "${price}",
      samples_minus: "One sample less",
      samples_plus: "One sample more",
      samples_max: "Sample cap reached ({cap})",
      stamped: "Stamp",
      stamped_hint: "Stamping consumes 1 sample. Un-stamping does not give it back.",
      stamped_blocked: "No sample to stamp with.",
      sell_set: "Sell set",
      sell_set_hint: "Clears the stamp of every animal in this category (samples are kept).",
      sell_set_blocked: "Incomplete set - every animal has to be stamped before you can sell.",
      sell_set_confirm: "Sell the set for \"{category}\"? Every stamp in this category will be cleared.",
      badge_protect: "P",
      badge_protect_hint: "Shows up in the Protect Legendary Animal mission (P)",
      badge_tagging: "T",
      badge_tagging_hint: "Shows up in the Wild Animal Tagging mission (T)",
      badge_harriet: "H",
      badge_harriet_hint: "Only obtainable during a Harriet mission (H)",
      timer: "{name} ({minutes} min)",
      timer_moonshine: "Moonshine mash",
      timer_trader: "Trader resupply",
      timer_state_idle: "ready",
      timer_state_running: "running",
      timer_state_paused: "paused",
      timer_state_done: "done",
      timer_start: "Start",
      timer_stop: "Stop",
      timer_reset: "Reset",
      storage: "Everything is stored locally in this browser (localStorage) - no server, no account.",
      export_file: "Export file",
      export_file_hint: "Download the current progress as a JSON file.",
      import_file: "Import file",
      import_file_hint: "Load progress from a previously exported JSON file.",
      import_file_failed: "Import failed: the file is not a valid tracker export.",
      reset: "Reset progress",
      reset_confirm: "Clear all samples, stamps and timers?"
    },

    // Category ids -> name. Ids match data/catalog.js.
    categories: {
      1:{name:"Farmland"}, 2:{name:"Desert"}, 3:{name:"Wetland"}, 4:{name:"Mnt. & Grass"},
      5:{name:"Forest & River"}, 7:{name:"Dark"}, 8:{name:"Light"}, 9:{name:"Red & Blond"},
      10:{name:"Patterned"}
    },

    // Animal ids -> name (`fullname` = untruncated name). Ids match data/catalog.js.
    animals: {
      1:{name:"Florida Cracker Cow"}, 2:{name:"Angus Bull"}, 3:{name:"Devon Bull"},
      4:{name:"Hereford Bull"}, 5:{name:"Angus Ox"}, 6:{name:"Devon Ox"}, 7:{name:"Old Spot Pig"},
      8:{name:"Berkshire Pig"}, 9:{name:"Big China Pig"}, 10:{name:"Merino Sheep"},
      11:{name:"Alpine Goat"}, 12:{name:"Desert Iguana"}, 13:{name:"Banded Gila Monster"},
      14:{name:"Nine-Banded Armadillo"},
      15:{name:"Baja Calif. Prongh. Buck",fullname:"Baja California Pronghorn Buck"},
      16:{name:"Baja Calif. Prongh. Doe",fullname:"Baja California Pronghorn Doe"},
      17:{name:"Collared Peccary"}, 18:{name:"Sonoran Pronghorn Buck"},
      19:{name:"Sonoran Pronghorn Doe"}, 20:{name:"Desert Bighorn Ram"},
      21:{name:"Desert Bighorn Sheep"}, 22:{name:"Sierra Nevada Bighorn Ram"},
      23:{name:"Sierra Nevada Bighorn Sheep"},
      24:{name:"Black-Tailed Rattlesnake",fullname:"Black-tailed Rattlesnake"}, 25:{name:"Cougar"},
      26:{name:"American Alligator (small)",fullname:"Small American Alligator"},
      27:{name:"Green Iguana"}, 28:{name:"Alligator Snapping Turtle"}, 29:{name:"Panther"},
      30:{name:"Florida Panther"}, 31:{name:"American Alligator"}, 32:{name:"Diamondback Rattlesnake"},
      33:{name:"Midland Water Snake"}, 34:{name:"Timber Rattlesnake"},
      35:{name:"Northern Copperhead Snake"}, 36:{name:"Southern Copperhead Snake"},
      37:{name:"Cottonmouth Snake"}, 38:{name:"Northern Water Snake"},
      39:{name:"Rocky Mountain Bull Elk"}, 40:{name:"Rocky Mountain Cow Elk"},
      41:{name:"American Badger"}, 42:{name:"Gray Wolf"}, 43:{name:"Timber Wolf"},
      44:{name:"Rocky Mnt. Bighorn Ram",fullname:"Rocky Mountain Bighorn Ram"},
      45:{name:"Rocky Mnt. Bighorn Sheep",fullname:"Rocky Mountain Bighorn Sheep"},
      46:{name:"California Valley Coyote"}, 47:{name:"Whitetail Buck"}, 48:{name:"Whitetail Deer"},
      49:{name:"Wild Boar"}, 50:{name:"American Bison"}, 51:{name:"American Pronghorn Buck"},
      52:{name:"American Pronghorn Doe"}, 53:{name:"American Black Bear"},
      54:{name:"North American Beaver"}, 55:{name:"North American Raccoon"},
      56:{name:"American Red Fox"}, 57:{name:"American Gray Fox"}, 58:{name:"Silver Fox"},
      59:{name:"Striped Skunk"}, 60:{name:"Virginia Opossum"}, 61:{name:"American Muskrat"},
      62:{name:"Western Bull Moose"}, 63:{name:"Western Moose"}, 64:{name:"Grizzly Bear"},
      65:{name:"Black-Tailed Jackrabbit",fullname:"Black-tailed Jackrabbit"}, 77:{name:"Teca gator"},
      78:{name:"Night Beaver"}, 79:{name:"Tatanka Bison"}, 80:{name:"Shadow Buck"},
      81:{name:"Sapa Cougar"}, 82:{name:"Midnight Coyote"}, 83:{name:"Katata Elk"},
      84:{name:"Onyx Wolf"}, 85:{name:"Nightwalker Panther"}, 86:{name:"Rutile Ram"},
      87:{name:"Knight Moose"}, 88:{name:"Moon Beaver"}, 89:{name:"Winyan Bison"},
      90:{name:"Snow Buck"}, 91:{name:"Iguga Cougar"}, 92:{name:"Milk Coyote"}, 93:{name:"Inahme Elk"},
      94:{name:"Moonstone Wolf"}, 95:{name:"Ghost Panther"}, 96:{name:"Gabbro Ram"},
      97:{name:"Snowflake Moose"}, 98:{name:"Sun Gator"}, 99:{name:"Banded Gator"},
      100:{name:"Payta Bison"}, 101:{name:"Wakpa Boar"}, 102:{name:"Red Streak Coyote"},
      103:{name:"Ozula Elk"}, 104:{name:"Emerald Wolf"}, 105:{name:"Ridgeback Spirit Bear"},
      106:{name:"Golden Spirit Bear"}, 107:{name:"Zizi Beaver"}, 108:{name:"Cogi Boar"},
      109:{name:"Ruddy Moose"}, 110:{name:"Owiza Bear"}, 111:{name:"Icahi Boar"},
      112:{name:"Mud Runner Buck"}, 113:{name:"Maza Cougar"}, 114:{name:"Ota Fox"},
      115:{name:"Marble Fox"}, 116:{name:"Cross Fox"}, 117:{name:"Iwakta Panther"},
      118:{name:"Chalk Ram"}
    }
  };
})(typeof window !== "undefined" ? window : this);
