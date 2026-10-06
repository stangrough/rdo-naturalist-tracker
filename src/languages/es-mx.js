// languages/es-mx.js -- Español (Latinoamérica).
//
// Animal and category names come from the official in-game localisation
// (via the locale files of github.com/tjakubowski/rdo-naturalist), keyed by the
// ids of data/catalog.js. Interface strings are translated by hand; a missing
// key falls back to languages/en.js.
(function (root) {
  "use strict";

  root.RDO_LANGUAGES = root.RDO_LANGUAGES || {};

  root.RDO_LANGUAGES["es-mx"] = {
    meta: { code: "es-mx", name: "Español (Latinoamérica)" },

    // Interface strings; `{placeholder}` markers are filled in by assets/app.js.
    ui: {
      app_title: "Rastreador de naturalista de RDO",
      language: "Idioma",
      search_placeholder: "Busca un animal o una categoría...",
      view_normal: "Normales",
      view_legendary: "Legendarios",
      no_results: "Sin resultados.",
      clock: "Hora del juego",
      progress: "{stamped}/{total} sellados",
      price: "{price} $",
      samples_minus: "Una muestra menos",
      samples_plus: "Una muestra más",
      samples_max: "Límite de muestras alcanzado ({cap})",
      stamped: "Sello",
      stamped_hint: "Sellar consume 1 muestra. Quitar el sello no la devuelve.",
      stamped_blocked: "No hay muestras para sellar.",
      sell_set: "Vender set",
      sell_set_hint: "Quita el sello de todos los animales de esta categoría (las muestras se mantienen).",
      sell_set_blocked: "Set incompleto: todos los animales deben estar sellados.",
      sell_set_confirm: "¿Vender el set de \"{category}\"? Se quitarán todos los sellos de esta categoría.",
      badge_protect: "P",
      badge_protect_hint: "Aparece en \"Proteger animal legendario\" (P)",
      badge_tagging: "M",
      badge_tagging_hint: "Aparece en \"Marcado de animales salvajes\" (M)",
      badge_harriet: "H",
      badge_harriet_hint: "Solo se consigue en una misión de Harriet (H)",
      timer: "{name} ({minutes} min)",
      timer_moonshine: "Mosto de licor",
      timer_trader: "Suministros del comerciante",
      timer_state_idle: "listo",
      timer_state_running: "en marcha",
      timer_state_paused: "en pausa",
      timer_state_done: "terminado",
      timer_start: "Iniciar",
      timer_stop: "Detener",
      timer_reset: "Reiniciar",
      storage: "Todo se guarda localmente en este navegador (localStorage): sin servidor y sin cuenta.",
      export_file: "Exportar archivo",
      export_file_hint: "Descarga el progreso actual como archivo JSON.",
      import_file: "Importar archivo",
      import_file_hint: "Carga el progreso desde un archivo JSON exportado.",
      import_file_failed: "Error al importar: el archivo no es una exportación válida.",
      reset: "Borrar progreso",
      reset_confirm: "¿Borrar todas las muestras, sellos y temporizadores?"
    },

    // Category ids -> name. Ids match data/catalog.js.
    categories: {
      1:{name:"Hábitats rurales"}, 2:{name:"Hábitats desérticos"}, 3:{name:"Hábitats de pantanos"},
      4:{name:"Hábitats de montañas y praderas"}, 5:{name:"Hábitats de ríos y bosques"},
      7:{name:"Animales legendarios oscuros"}, 8:{name:"Animales legendarios claros"},
      9:{name:"Animales legendarios rojizos y rubios"}, 10:{name:"Animales legendarios manchados"}
    },

    // Animal ids -> name. Ids match data/catalog.js.
    animals: {
      1:{name:"Vaca Florida Cracker"}, 2:{name:"Toro Angus"}, 3:{name:"Toro de Devon"},
      4:{name:"Toro de Hereford"}, 5:{name:"Buey Angus"}, 6:{name:"Buey de Devon"},
      7:{name:"Cerdo Old Spots"}, 8:{name:"Cerdo de Berkshire"}, 9:{name:"Gran cerdo chino"},
      10:{name:"Oveja merina"}, 11:{name:"Cabra alpina"}, 12:{name:"Iguana del desierto"},
      13:{name:"Monstruo de Gila con bandas"}, 14:{name:"Armadillo de nueve bandas"},
      15:{name:"Berrendo de Baja California macho"}, 16:{name:"Berrendo de Baja California hembra"},
      17:{name:"Pecarí de collar"}, 18:{name:"Berrendo de Sonora macho"},
      19:{name:"Berrendo de Sonora hembra"}, 20:{name:"Carnero cimarrón del desierto"},
      21:{name:"Borrego cimarrón del desierto"}, 22:{name:"Carnero cimarrón de Sierra Nevada"},
      23:{name:"Borrego cimarrón de Sierra Nevada"}, 24:{name:"Cascabel de cola negra"},
      25:{name:"Puma"}, 26:{name:"Caimán americano (pequeño)"}, 27:{name:"Iguana verde"},
      28:{name:"Tortuga caimán mordedora"}, 29:{name:"Pantera"}, 30:{name:"Pantera de Florida"},
      31:{name:"Caimán americano"}, 32:{name:"Cascabel diamantina"},
      33:{name:"Culebra de agua de Midland"}, 34:{name:"Cascabel de los bosques"},
      35:{name:"Víbora cabeza de cobre del norte"}, 36:{name:"Víbora cabeza de cobre del sur"},
      37:{name:"Culebra de agua boca de algodón"}, 38:{name:"Culebra de agua del norte"},
      39:{name:"Wapití macho de las Montañas Rocosas"},
      40:{name:"Wapití hembra de las Montañas Rocosas"}, 41:{name:"Tejón americano"},
      42:{name:"Lobo gris"}, 43:{name:"Lobo del bosque"},
      44:{name:"Carnero cimarrón de las Montañas Rocosas"},
      45:{name:"Borrego cimarrón de las Montañas Rocosas"}, 46:{name:"Coyote del valle de California"},
      47:{name:"Venado de cola blanca"}, 48:{name:"Ciervo de cola blanca"}, 49:{name:"Jabalí salvaje"},
      50:{name:"Bisonte americano"}, 51:{name:"Berrendo americano macho"},
      52:{name:"Berrendo americano hembra"}, 53:{name:"Oso negro americano"},
      54:{name:"Castor norteamericano"}, 55:{name:"Mapache norteamericano"},
      56:{name:"Zorro rojo americano"}, 57:{name:"Zorro gris americano"}, 58:{name:"Zorro plateado"},
      59:{name:"Zorrillo rayado"}, 60:{name:"Zarigüeya de Virginia"},
      61:{name:"Rata almizclera americana"}, 62:{name:"Alce occidental macho"},
      63:{name:"Alce occidental hembra"}, 64:{name:"Oso pardo"}, 65:{name:"Conejo de cola negra"},
      77:{name:"Caimán Teca"}, 78:{name:"Castor nocturno"}, 79:{name:"Bisonte Tatanka"},
      80:{name:"Venado sombrío"}, 81:{name:"Puma Sapa"}, 82:{name:"Coyote garra nocturna"},
      83:{name:"Wapití Katata"}, 84:{name:"Lobo ónix"}, 85:{name:"Pantera noctámbula"},
      86:{name:"Carnero cimarrón rútilo"}, 87:{name:"Alce caballero"}, 88:{name:"Castor lunar"},
      89:{name:"Bisonte Winyan"}, 90:{name:"Venado nevado"}, 91:{name:"Puma Iguga"},
      92:{name:"Coyote blanco"}, 93:{name:"Wapití Inahme"}, 94:{name:"Lobo piedra lunar"},
      95:{name:"Pantera fantasma"}, 96:{name:"Carnero cimarrón ígneo"}, 97:{name:"Alce copo de nieve"},
      98:{name:"Caimán solar"}, 99:{name:"Caimán con bandas"}, 100:{name:"Bisonte Payta"},
      101:{name:"Jabalí Wakpa"}, 102:{name:"Coyote manto rojizo"}, 103:{name:"Wapití Ozula"},
      104:{name:"Lobo esmeralda"}, 105:{name:"Oso Kermode crestado"}, 106:{name:"Oso Kermode dorado"},
      107:{name:"Castor Zizi"}, 108:{name:"Jabalí Cogi"}, 109:{name:"Alce rubicundo"},
      110:{name:"Oso Owiza"}, 111:{name:"Jabalí Icahi"}, 112:{name:"Venado manchado"},
      113:{name:"Puma Maza"}, 114:{name:"Zorro Ota"}, 115:{name:"Zorro mármol"},
      116:{name:"Zorro cruzado"}, 117:{name:"Pantera Iwakta"}, 118:{name:"Carnero cimarrón caliza"}
    }
  };
})(typeof window !== "undefined" ? window : this);
