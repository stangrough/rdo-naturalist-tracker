// languages/de.js -- Deutsch.
//
// Animal and category names come from the official in-game localisation
// (via the locale files of github.com/tjakubowski/rdo-naturalist), keyed by the
// ids of data/catalog.js. Interface strings are translated by hand; a missing
// key falls back to languages/en.js.
(function (root) {
  "use strict";

  root.RDO_LANGUAGES = root.RDO_LANGUAGES || {};

  root.RDO_LANGUAGES["de"] = {
    meta: { code: "de", name: "Deutsch" },

    // Interface strings; `{placeholder}` markers are filled in by assets/app.js.
    ui: {
      app_title: "RDO Naturalisten-Tracker",
      language: "Sprache",
      search_placeholder: "Tier oder Kategorie suchen...",
      view_normal: "Normal",
      view_legendary: "Legendär",
      no_results: "Keine Treffer.",
      clock: "Spielzeit",
      progress: "{stamped}/{total} gestempelt",
      price: "{price} $",
      samples_minus: "Eine Probe weniger",
      samples_plus: "Eine Probe mehr",
      samples_max: "Probengrenze erreicht ({cap})",
      stamped: "Stempel",
      stamped_hint: "Stempeln verbraucht 1 Probe. Das Entfernen gibt sie nicht zurück.",
      stamped_blocked: "Keine Probe zum Stempeln vorhanden.",
      sell_set: "Set verkaufen",
      sell_set_hint: "Entfernt den Stempel aller Tiere dieser Kategorie (Proben bleiben).",
      sell_set_blocked: "Set unvollständig - alle Tiere müssen gestempelt sein.",
      sell_set_confirm: "Set \"{category}\" verkaufen? Alle Stempel dieser Kategorie werden entfernt.",
      badge_protect: "B",
      badge_protect_hint: "Kommt in \"Legendäres Tier beschützen\" vor (B)",
      badge_tagging: "M",
      badge_tagging_hint: "Kommt in \"Wildtiere markieren\" vor (M)",
      badge_harriet: "H",
      badge_harriet_hint: "Nur in einer Harriet-Mission erhältlich (H)",
      timer: "{name} ({minutes} min)",
      timer_moonshine: "Moonshine-Maische",
      timer_trader: "Händler-Nachschub",
      timer_state_idle: "bereit",
      timer_state_running: "läuft",
      timer_state_paused: "pausiert",
      timer_state_done: "fertig",
      timer_start: "Start",
      timer_stop: "Stopp",
      timer_reset: "Zurücksetzen",
      storage: "Alles wird lokal in diesem Browser gespeichert (localStorage) - kein Server, kein Konto.",
      export_file: "Datei exportieren",
      export_file_hint: "Aktuellen Fortschritt als JSON-Datei herunterladen.",
      import_file: "Datei importieren",
      import_file_hint: "Fortschritt aus einer exportierten JSON-Datei laden.",
      import_file_failed: "Import fehlgeschlagen: Die Datei ist kein gültiger Export.",
      reset: "Fortschritt löschen",
      reset_confirm: "Alle Proben, Stempel und Timer löschen?"
    },

    // Category ids -> name. Ids match data/catalog.js.
    categories: {
      1:{name:"Farmhabitat"}, 2:{name:"Wüstenhabitat"}, 3:{name:"Sumpfhabitat"},
      4:{name:"Gebirgs- und Graslandhabitat"}, 5:{name:"Wald- und Flusshabitat"},
      7:{name:"Legendäre Tiere: Dunkel"}, 8:{name:"Legendäre Tiere: Hell"},
      9:{name:"Legendäre Tiere: Rot und Blond"}, 10:{name:"Legendäre Tiere: Gemustert"}
    },

    // Animal ids -> name. Ids match data/catalog.js.
    animals: {
      1:{name:"Florida-Cracker-Rind"}, 2:{name:"Angus-Bulle"}, 3:{name:"Devon-Bulle"},
      4:{name:"Hereford-Bulle"}, 5:{name:"Angus-Ochse"}, 6:{name:"Devon-Ochse"},
      7:{name:"Old-Spot-Schwein"}, 8:{name:"Berkshire-Schwein"}, 9:{name:"Chinesisches Großschwein"},
      10:{name:"Merinoschaf"}, 11:{name:"Gebirgsziege"}, 12:{name:"Wüstenleguan"},
      13:{name:"Gestreiftes Gilatier"}, 14:{name:"Neunbinden-Gürteltier"},
      15:{name:"Männlicher Baja-California-Gabelbock"},
      16:{name:"Weiblicher Baja-California-Gabelbock"}, 17:{name:"Halsbandpekari"},
      18:{name:"Männlicher Sonora-Gabelbock"}, 19:{name:"Weiblicher Sonora-Gabelbock"},
      20:{name:"Wüsten-Dickhornwidder"}, 21:{name:"Wüsten-Dickhornschaf"},
      22:{name:"Sierra-Nevada-Dickhornwidder"}, 23:{name:"Sierra-Nevada-Dickhornschaf"},
      24:{name:"Schwarzschwanz-Klapperschlange"}, 25:{name:"Puma"},
      26:{name:"Amerikanischer Alligator (klein)"}, 27:{name:"Grüner Leguan"},
      28:{name:"Geierschildkröte"}, 29:{name:"Panther"}, 30:{name:"Florida-Panther"},
      31:{name:"Amerikanischer Alligator"}, 32:{name:"Texas-Klapperschlange"},
      33:{name:"Midland-Wasserschlange"}, 34:{name:"Wald-Klapperschlange"},
      35:{name:"Nördlicher Kupferkopf"}, 36:{name:"Südlicher Kupferkopf"},
      37:{name:"Wassermokassinotter"}, 38:{name:"Siegelring-Schwimmnatter"},
      39:{name:"Rocky-Mountain-Wapitibulle"}, 40:{name:"Rocky-Mountain-Wapitikuh"},
      41:{name:"Silberdachs"}, 42:{name:"Wolf"}, 43:{name:"Timberwolf"},
      44:{name:"Rocky-Mountain-Dickhornwidder"}, 45:{name:"Rocky-Mountain-Dickhornschaf"},
      46:{name:"California-Valley-Kojote"}, 47:{name:"Weißwedelhirschbock"},
      48:{name:"Weißwedelhirsch"}, 49:{name:"Wildschwein"}, 50:{name:"Amerikanischer Bison"},
      51:{name:"Männlicher Amerikanischer Gabelbock"}, 52:{name:"Weiblicher Amerikanischer Gabelbock"},
      53:{name:"Amerikanischer Schwarzbär"}, 54:{name:"Amerikanischer Biber"},
      55:{name:"Nordamerikanischer Waschbär"}, 56:{name:"Amerikanischer Rotfuchs"},
      57:{name:"Amerikanischer Graufuchs"}, 58:{name:"Silberfuchs"}, 59:{name:"Streifenskunk"},
      60:{name:"Nordopossum"}, 61:{name:"Amerikanische Bisamratte"},
      62:{name:"Westkanadischer Elchbulle"}, 63:{name:"Westkanadischer Elch"}, 64:{name:"Grizzlybär"},
      65:{name:"Eselhase"}, 77:{name:"Teca-Alligator"}, 78:{name:"Nachtbiber"},
      79:{name:"Tatanka-Bison"}, 80:{name:"Schattenhirschbock"}, 81:{name:"Sapa-Puma"},
      82:{name:"Mitternachtskojote"}, 83:{name:"Katata-Wapiti"}, 84:{name:"Onyxwolf"},
      85:{name:"Nachtwandlerpanther"}, 86:{name:"Rutilhornwidder"}, 87:{name:"Ritterelch"},
      88:{name:"Mondbiber"}, 89:{name:"Winyan-Bison"}, 90:{name:"Schneehirschbock"},
      91:{name:"Iguga-Puma"}, 92:{name:"Milchkojote"}, 93:{name:"Inahme-Wapiti"},
      94:{name:"Mondsteinwolf"}, 95:{name:"Geisterpanther"}, 96:{name:"Gabbrohornwidder"},
      97:{name:"Schneeflockenelch"}, 98:{name:"Sonnenalligator"}, 99:{name:"Gestreifter Alligator"},
      100:{name:"Payta-Bison"}, 101:{name:"Wakpa-Wildschwein"}, 102:{name:"Rotstreifenkojote"},
      103:{name:"Ozula-Wapiti"}, 104:{name:"Smaragdwolf"}, 105:{name:"Ridgeback-Geisterbär"},
      106:{name:"Goldener Geisterbär"}, 107:{name:"Zizi-Biber"}, 108:{name:"Cogi-Wildschwein"},
      109:{name:"Rubinelch"}, 110:{name:"Owiza-Bär"}, 111:{name:"Icahi-Wildschwein"},
      112:{name:"Schlammläuferhirschbock"}, 113:{name:"Maza-Puma"}, 114:{name:"Ota-Fuchs"},
      115:{name:"Marmorfuchs"}, 116:{name:"Kreuzfuchs"}, 117:{name:"Iwakta-Panther"},
      118:{name:"Kreidehornwidder"}
    }
  };
})(typeof window !== "undefined" ? window : this);
