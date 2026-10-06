// languages/it.js -- Italiano.
//
// Animal and category names come from the official in-game localisation
// (via the locale files of github.com/tjakubowski/rdo-naturalist), keyed by the
// ids of data/catalog.js. Interface strings are translated by hand; a missing
// key falls back to languages/en.js.
(function (root) {
  "use strict";

  root.RDO_LANGUAGES = root.RDO_LANGUAGES || {};

  root.RDO_LANGUAGES["it"] = {
    meta: { code: "it", name: "Italiano" },

    // Interface strings; `{placeholder}` markers are filled in by assets/app.js.
    ui: {
      app_title: "Tracker naturalista RDO",
      language: "Lingua",
      search_placeholder: "Cerca un animale o una categoria...",
      view_normal: "Normali",
      view_legendary: "Leggendari",
      no_results: "Nessun risultato.",
      clock: "Ora di gioco",
      progress: "{stamped}/{total} timbrati",
      price: "{price} $",
      samples_minus: "Un campione in meno",
      samples_plus: "Un campione in più",
      samples_max: "Limite di campioni raggiunto ({cap})",
      stamped: "Timbro",
      stamped_hint: "Timbrare consuma 1 campione. Rimuovere il timbro non lo restituisce.",
      stamped_blocked: "Nessun campione da timbrare.",
      sell_set: "Vendi set",
      sell_set_hint: "Rimuove il timbro da tutti gli animali di questa categoria (i campioni restano).",
      sell_set_blocked: "Set incompleto: tutti gli animali devono essere timbrati.",
      sell_set_confirm: "Vendere il set \"{category}\"? Tutti i timbri di questa categoria verranno rimossi.",
      badge_protect: "P",
      badge_protect_hint: "Compare in \"Proteggi l'animale leggendario\" (P)",
      badge_tagging: "M",
      badge_tagging_hint: "Compare in \"Marcatura di animali selvatici\" (M)",
      badge_harriet: "H",
      badge_harriet_hint: "Ottenibile solo in una missione di Harriet (H)",
      timer: "{name} ({minutes} min)",
      timer_moonshine: "Mosto del distillato",
      timer_trader: "Rifornimento del mercante",
      timer_state_idle: "pronto",
      timer_state_running: "in corso",
      timer_state_paused: "in pausa",
      timer_state_done: "finito",
      timer_start: "Avvia",
      timer_stop: "Ferma",
      timer_reset: "Azzera",
      storage: "Tutto è salvato localmente in questo browser (localStorage): nessun server, nessun account.",
      export_file: "Esporta file",
      export_file_hint: "Scarica i progressi attuali come file JSON.",
      import_file: "Importa file",
      import_file_hint: "Carica i progressi da un file JSON esportato.",
      import_file_failed: "Importazione fallita: il file non è un export valido.",
      reset: "Azzera i progressi",
      reset_confirm: "Cancellare tutti i campioni, i timbri e i timer?"
    },

    // Category ids -> name. Ids match data/catalog.js.
    categories: {
      1:{name:"Habitat: fattoria"}, 2:{name:"Habitat: deserto"}, 3:{name:"Habitat: palude"},
      4:{name:"Habitat: montagna e prateria"}, 5:{name:"Habitat: foresta e fiume"},
      7:{name:"Animali leggendari scuri"}, 8:{name:"Animali leggendari chiari"},
      9:{name:"Animali leggendari rossi e fulvi"}, 10:{name:"Animali leggendari con motivi"}
    },

    // Animal ids -> name. Ids match data/catalog.js.
    animals: {
      1:{name:"Mucca Florida Cracker"}, 2:{name:"Toro Angus"}, 3:{name:"Toro Devon"},
      4:{name:"Toro Hereford"}, 5:{name:"Bue Angus"}, 6:{name:"Bue Devon"},
      7:{name:"Maiale Gloucester Old Spot"}, 8:{name:"Maiale Berkshire"}, 9:{name:"Maiale Big China"},
      10:{name:"Pecora Merino"}, 11:{name:"Capra alpina"}, 12:{name:"Iguana del deserto"},
      13:{name:"Mostro di Gila Cinctum"}, 14:{name:"Armadillo a nove fasce"},
      15:{name:"Antilocapra americana peninsularis maschio"},
      16:{name:"Antilocapra americana peninsularis femmina"}, 17:{name:"Pècari dal collare"},
      18:{name:"Antilocapra americana sonoriensis maschio"},
      19:{name:"Antilocapra americana sonoriensis femmina"}, 20:{name:"Ariete bighorn del deserto"},
      21:{name:"Pecora bighorn del deserto"}, 22:{name:"Ariete bighorn della Sierra Nevada"},
      23:{name:"Pecora bighorn della Sierra Nevada"}, 24:{name:"Serpente a sonagli coda nera"},
      25:{name:"Puma"}, 26:{name:"Alligatore americano (piccolo)"}, 27:{name:"Iguana comune"},
      28:{name:"Testuggine azzannatrice"}, 29:{name:"Pantera"}, 30:{name:"Pantera della Florida"},
      31:{name:"Alligatore americano"}, 32:{name:"Crotalo adamantino occidentale"},
      33:{name:"Nerodia sipedon pleuralis"}, 34:{name:"Crotalus horridus"},
      35:{name:"Testa di rame settentrionale"}, 36:{name:"Testa di rame meridionale"},
      37:{name:"Mocassino acquatico"}, 38:{name:"Nerodia comune settentrionale"},
      39:{name:"Wapiti delle Montagne Rocciose maschio"},
      40:{name:"Wapiti delle Montagne Rocciose femmina"}, 41:{name:"Tasso argentato"},
      42:{name:"Lupo grigio"}, 43:{name:"Lupo dei boschi"},
      44:{name:"Ariete bighorn delle Montagne Rocciose"},
      45:{name:"Pecora bighorn delle Montagne Rocciose"}, 46:{name:"Coyote californiano"},
      47:{name:"Cervo maschio dalla coda bianca"}, 48:{name:"Cervo dalla coda bianca"},
      49:{name:"Cinghiale selvatico"}, 50:{name:"Bisonte americano"},
      51:{name:"Antilocapra americana maschio"}, 52:{name:"Antilocapra americana femmina"},
      53:{name:"Orso nero"}, 54:{name:"Castoro americano"}, 55:{name:"Procione comune"},
      56:{name:"Volpe rossa"}, 57:{name:"Volpe grigia"}, 58:{name:"Volpe argentata"},
      59:{name:"Puzzola comune"}, 60:{name:"Opossum della Virginia"},
      61:{name:"Topo muschiato americano"}, 62:{name:"Alce occidentale maschio"},
      63:{name:"Alce occidentale"}, 64:{name:"Orso grizzly"}, 65:{name:"Lepre californiana"},
      77:{name:"Alligatore Teca"}, 78:{name:"Castoro notturno"}, 79:{name:"Bisonte Tatanka"},
      80:{name:"Cervo maschio ombra"}, 81:{name:"Puma Sapa"}, 82:{name:"Coyote di mezzanotte"},
      83:{name:"Wapiti Katata"}, 84:{name:"Lupo onice"}, 85:{name:"Pantera oscura"},
      86:{name:"Ariete corno rutilo"}, 87:{name:"Alce cavaliere"}, 88:{name:"Castoro lunare"},
      89:{name:"Bisonte Winyan"}, 90:{name:"Cervo maschio niveo"}, 91:{name:"Puma Iguga"},
      92:{name:"Coyote lattiginoso"}, 93:{name:"Wapiti Inahme"}, 94:{name:"Lupo pietra di luna"},
      95:{name:"Pantera fantasma"}, 96:{name:"Ariete corno gabbro"}, 97:{name:"Alce delle nevi"},
      98:{name:"Alligatore del sole"}, 99:{name:"Alligatore a fasce"}, 100:{name:"Bisonte Payta"},
      101:{name:"Cinghiale Wakpa"}, 102:{name:"Coyote Mantorosso"}, 103:{name:"Wapiti Ozula"},
      104:{name:"Lupo smeraldo"}, 105:{name:"Orso spirito ridgeback"}, 106:{name:"Orso spirito dorato"},
      107:{name:"Castoro Zizi"}, 108:{name:"Cinghiale Cogi"}, 109:{name:"Alce vermiglio"},
      110:{name:"Orso Owiza"}, 111:{name:"Cinghiale Icahi"}, 112:{name:"Cervo maschio bruno"},
      113:{name:"Puma Maza"}, 114:{name:"Volpe Ota"}, 115:{name:"Volpe marmorea"},
      116:{name:"Volpe crociata"}, 117:{name:"Pantera Iwakta"}, 118:{name:"Ariete corno gessato"}
    }
  };
})(typeof window !== "undefined" ? window : this);
