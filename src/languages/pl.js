// languages/pl.js -- polskie napisy.
//
// Klucze (id kategorii i gatunkow) sa te same co w data/catalog.js i w
// languages/en.js. Brakujacy klucz jest automatycznie brany z en.js.
(function (root) {
  "use strict";

  root.RDO_LANGUAGES = root.RDO_LANGUAGES || {};

  root.RDO_LANGUAGES.pl = {
    meta: { code: "pl", name: "Polski" },

    // Interface strings; `{placeholder}` markers are filled in by assets/app.js.
    ui: {
      app_title: "RDO Tracker przyrodnika",
      language: "Język",
      search_placeholder: "Wyszukaj gatunek lub rodzaj...",
      view_normal: "Zwyczajne",
      view_legendary: "Legendarne",
      no_results: "Brak wyników.",
      clock: "Czas w grze",
      progress: "{stamped}/{total} ostemplowanych",
      price: "{price} $",
      samples_minus: "Jedna próbka mniej",
      samples_plus: "Jedna próbka więcej",
      samples_max: "Osiągnięty limit próbek ({cap})",
      stamped: "Stempel",
      stamped_hint: "Stemplowanie zużywa 1 próbkę. Odstemplowanie nie zwraca próbki.",
      stamped_blocked: "Brak próbki do ostemplowania.",
      sell_set: "Sprzedaj zestaw",
      sell_set_hint: "Zeruje stempel dla wszystkich gatunków w tej kategorii (liczba próbek zostaje).",
      sell_set_blocked: "Zestaw niekompletny - musisz ostemplować wszystkie gatunki, żeby sprzedać.",
      sell_set_confirm: "Sprzedać zestaw dla \"{category}\"? Wszystkie stemple w tej kategorii zostaną usunięte.",
      badge_protect: "O",
      badge_protect_hint: "Misja: ochrona legendarnego zwierzęcia (O)",
      badge_tagging: "Z",
      badge_tagging_hint: "Misja: znakowanie dzikich zwierząt (Z)",
      badge_harriet: "H",
      badge_harriet_hint: "Dostępny tylko na misji Harriet (H)",
      timer: "{name} ({minutes} min)",
      timer_moonshine: "Zacier bimbru",
      timer_trader: "Dostawa materiałów",
      timer_state_idle: "gotowy",
      timer_state_running: "biegnie",
      timer_state_paused: "pauza",
      timer_state_done: "koniec",
      timer_start: "Start",
      timer_stop: "Stop",
      timer_reset: "Reset",
      storage: "Wszystko jest zapisywane lokalnie w tej przeglądarce (localStorage) - bez serwera i bez konta.",
      export_file: "Eksport do pliku",
      export_file_hint: "Pobierz aktualny postęp jako plik JSON.",
      import_file: "Import z pliku",
      import_file_hint: "Wczytaj postęp z wcześniej wyeksportowanego pliku JSON.",
      import_file_failed: "Import nieudany: plik nie jest poprawnym eksportem trackera.",
      reset: "Wyczyść postęp",
      reset_confirm: "Usunąć wszystkie próbki, stemple i timery?"
    },

    // Category ids -> name. Ids match data/catalog.js.
    categories: {
      1:{name:"Udomowione"}, 2:{name:"Pustynne"}, 3:{name:"Bagienne"}, 4:{name:"Górskie i równinne"},
      5:{name:"Leśne i nadrzeczne"}, 7:{name:"Legendarne: ciemne ubarwienie"},
      8:{name:"Legendarne: jasne ubarwienie"}, 9:{name:"Legendarne: rude i płowe ubarwienie"},
      10:{name:"Legendarne: mieszane ubarwienie"}
    },

    // Animal ids -> name (`fullname` = untruncated name). Ids match data/catalog.js.
    animals: {
      1:{name:"Krowa rasy Florida Cracker"}, 2:{name:"Byk rasy Angus"}, 3:{name:"Byk rasy Devon"},
      4:{name:"Byk rasy Hereford"}, 5:{name:"Wół rasy Angus"}, 6:{name:"Wół rasy Devon"},
      7:{name:"Świnia Old Spot"}, 8:{name:"Świnia berkszyr"}, 9:{name:"Świnia chińska"},
      10:{name:"Owca merynosowa"}, 11:{name:"Koza alpejska"}, 12:{name:"Iguana pustynna"},
      13:{name:"Heloderma arizońska pręgowana"}, 14:{name:"Pancernik dziewięciopaskowy"},
      15:{name:"Samiec widłoroga kalifornijskiego"}, 16:{name:"Samica widłoroga kalifornijskiego"},
      17:{name:"Pekariowiec obrożny"}, 18:{name:"Samiec widłoroga koloradzkiego"},
      19:{name:"Samica widłoroga koloradzkiego"}, 20:{name:"Pustynny baran gruborogi"},
      21:{name:"Pustynna owca gruboroga"}, 22:{name:"Baran gruborogi ze Sierra Nevada"},
      23:{name:"Owca gruboroga ze Sierra Nevada"}, 24:{name:"Grzechotnik górski"}, 25:{name:"Puma"},
      26:{name:"Aligator amerykański (mały)"}, 27:{name:"Iguana zielona"}, 28:{name:"Żółw sępi"},
      29:{name:"Pantera"}, 30:{name:"Pantera z Florydy"}, 31:{name:"Aligator amerykański"},
      32:{name:"Grzechotnik diamentowy"}, 33:{name:"Wąż wodny midland"},
      34:{name:"Grzechotnik pospolity"}, 35:{name:"Mokasyn miedziogłowiec północny"},
      36:{name:"Mokasyn miedziogłowiec południowy"}, 37:{name:"Mokasyn wodny"},
      38:{name:"Wąż wodny północny"}, 39:{name:"Samiec wapiti z Gór Skalistych"},
      40:{name:"Samica wapiti z Gór Skalistych"}, 41:{name:"Borsuk amerykański"},
      42:{name:"Wilk szary"}, 43:{name:"Wilk wschodni"}, 44:{name:"Baran gruborogi z Gór Skalistych"},
      45:{name:"Owca gruboroga z Gór Skalistych"}, 46:{name:"Kojot preriowy"},
      47:{name:"Samiec jelenia wirgińskiego"}, 48:{name:"Samica jelenia wirgińskiego"},
      49:{name:"Dzik"}, 50:{name:"Bizon amerykański"}, 51:{name:"Samiec widłoroga amerykańskiego"},
      52:{name:"Samica widłoroga amerykańskiego"}, 53:{name:"Niedźwiedź czarny amerykański"},
      54:{name:"Bóbr północnoamerykański"}, 55:{name:"Szop północnoamerykański"},
      56:{name:"Lis amerykański czerwony"}, 57:{name:"Lis amerykański szary"}, 58:{name:"Lis srebrny"},
      59:{name:"Skunks zwyczajny"}, 60:{name:"Opos wirginijski"}, 61:{name:"Piżmak amerykański"},
      62:{name:"Samiec łosia zachodniokanadyjskiego"}, 63:{name:"Samica łosia zachodniokanadyjskiego"},
      64:{name:"Niedźwiedź grizzly"}, 65:{name:"Królik czarnoogonowy"},
      77:{name:"Legendarny aligator Teca"}, 78:{name:"Legendarny bóbr nocny"},
      79:{name:"Legendarny bizon Tatanka"}, 80:{name:"Legendarny jeleń cienisty"},
      81:{name:"Legendarna puma Sapa"}, 82:{name:"Legendarny kojot północny"},
      83:{name:"Legendarny wapiti Katata"}, 84:{name:"Legendarny wilk onyksowy"},
      85:{name:"Legendarna pantera nocna"}, 86:{name:"Legendarny baran rutylorogi"},
      87:{name:"Legendarny łoś rycerski"}, 88:{name:"Legendarny bóbr księżycowy"},
      89:{name:"Legendarny bizon Winyan"}, 90:{name:"Legendarny jeleń śnieżny"},
      91:{name:"Legendarna puma Iguga"}, 92:{name:"Legendarny kojot mleczny"},
      93:{name:"Legendarny wapiti Inahme"}, 94:{name:"Legendarny wilk księżycowy"},
      95:{name:"Legendarna pantera widmowa"}, 96:{name:"Legendarny baran Gabbro"},
      97:{name:"Legendarny łoś śnieżynkowy"}, 98:{name:"Legendarny aligator słoneczny"},
      99:{name:"Legendarny aligator pasiasty"}, 100:{name:"Legendarny bizon Payta"},
      101:{name:"Legendarny dzik Wakpa"}, 102:{name:"Legendarny kojot czerwony"},
      103:{name:"Legendarny wapiti Ozula"}, 104:{name:"Legendarny wilk szmaragdowy"},
      105:{name:"Legendarny rudawy niedźwiedź-duch"}, 106:{name:"Legendarny złoty niedźwiedź-duch"},
      107:{name:"Legendarny bóbr Zizi"}, 108:{name:"Legendarny dzik Cogi"},
      109:{name:"Legendarny łoś rumiany"}, 110:{name:"Legendarny niedźwiedź Owiza"},
      111:{name:"Legendarny dzik Icahi"}, 112:{name:"Legendarny jeleń błotny"},
      113:{name:"Legendarna puma Maza"}, 114:{name:"Legendarny lis Ota"},
      115:{name:"Legendarny lis marmurkowy"}, 116:{name:"Legendarny lis mieszany"},
      117:{name:"Legendarna pantera Iwakta"}, 118:{name:"Legendarny baran kredorogi"}
    }
  };
})(typeof window !== "undefined" ? window : this);
