// languages/pt.js -- Português (Brasil).
//
// Animal and category names come from the official in-game localisation
// (via the locale files of github.com/tjakubowski/rdo-naturalist), keyed by the
// ids of data/catalog.js. Interface strings are translated by hand; a missing
// key falls back to languages/en.js.
(function (root) {
  "use strict";

  root.RDO_LANGUAGES = root.RDO_LANGUAGES || {};

  root.RDO_LANGUAGES["pt"] = {
    meta: { code: "pt", name: "Português (Brasil)" },

    // Interface strings; `{placeholder}` markers are filled in by assets/app.js.
    ui: {
      app_title: "Rastreador de naturalista do RDO",
      language: "Idioma",
      search_placeholder: "Procurar um animal ou categoria...",
      view_normal: "Normais",
      view_legendary: "Lendários",
      no_results: "Nenhum resultado.",
      clock: "Hora no jogo",
      progress: "{stamped}/{total} selados",
      price: "{price} $",
      samples_minus: "Uma amostra a menos",
      samples_plus: "Uma amostra a mais",
      samples_max: "Limite de amostras atingido ({cap})",
      stamped: "Selo",
      stamped_hint: "Selar consome 1 amostra. Remover o selo não devolve a amostra.",
      stamped_blocked: "Nenhuma amostra para selar.",
      sell_set: "Vender conjunto",
      sell_set_hint: "Remove o selo de todos os animais desta categoria (as amostras ficam).",
      sell_set_blocked: "Conjunto incompleto: todos os animais precisam estar selados.",
      sell_set_confirm: "Vender o conjunto \"{category}\"? Todos os selos desta categoria serão removidos.",
      badge_protect: "P",
      badge_protect_hint: "Aparece em \"Proteger animal lendário\" (P)",
      badge_tagging: "M",
      badge_tagging_hint: "Aparece em \"Marcação de animais selvagens\" (M)",
      badge_harriet: "H",
      badge_harriet_hint: "Só aparece em missões da Harriet (H)",
      timer: "{name} ({minutes} min)",
      timer_moonshine: "Mosto da aguardente",
      timer_trader: "Reabastecimento do comerciante",
      timer_state_idle: "pronto",
      timer_state_running: "contando",
      timer_state_paused: "pausado",
      timer_state_done: "concluído",
      timer_start: "Iniciar",
      timer_stop: "Parar",
      timer_reset: "Zerar",
      storage: "Tudo é salvo localmente neste navegador (localStorage): sem servidor e sem conta.",
      export_file: "Exportar arquivo",
      export_file_hint: "Baixar o progresso atual como arquivo JSON.",
      import_file: "Importar arquivo",
      import_file_hint: "Carregar o progresso de um arquivo JSON exportado.",
      import_file_failed: "Falha na importação: o arquivo não é uma exportação válida.",
      reset: "Apagar progresso",
      reset_confirm: "Apagar todas as amostras, selos e timers?"
    },

    // Category ids -> name. Ids match data/catalog.js.
    categories: {
      1:{name:"Animais Rurais"}, 2:{name:"Animais de Deserto"}, 3:{name:"Animais de Pântano"},
      4:{name:"Animais de Montanha e Prado"}, 5:{name:"Animais de Rio e Floresta"},
      7:{name:"Animais Lendários: Escuros"}, 8:{name:"Animais Lendários: Claros"},
      9:{name:"Animais Lendários: Loiros e Ruivos"}, 10:{name:"Animais Lendários: Matizados"}
    },

    // Animal ids -> name. Ids match data/catalog.js.
    animals: {
      1:{name:"Vaca Florida Cracker"}, 2:{name:"Touro Angus"}, 3:{name:"Touro Devon"},
      4:{name:"Touro Hereford"}, 5:{name:"Boi Angus"}, 6:{name:"Boi Devon"}, 7:{name:"Porco Old Spot"},
      8:{name:"Porco Berkshire"}, 9:{name:"Grande Porco da China"}, 10:{name:"Ovelha Merino"},
      11:{name:"Cabra-Alpina"}, 12:{name:"Iguana-do-Deserto"}, 13:{name:"Monstro-de-Gila-Listrado"},
      14:{name:"Tatuetê"}, 15:{name:"Antilocapra-da-Baja-Califórnia Macho"},
      16:{name:"Antilocapra-da-Baja-Califórnia Fêmea"}, 17:{name:"Caititu"},
      18:{name:"Antilocapra-de-Sonora Macho"}, 19:{name:"Antilocapra-de-Sonora Fêmea"},
      20:{name:"Carneiro-Selvagem-do-Deserto"}, 21:{name:"Ovelha-Selvagem-do-Deserto"},
      22:{name:"Carneiro-Selvagem-da-Serra"}, 23:{name:"Ovelha-Selvagem-da-Serra"},
      24:{name:"Cascavel-de-Cauda-Negra"}, 25:{name:"Suçuarana"},
      26:{name:"Jacaré-Americano (Pequeno)"}, 27:{name:"Iguana-Verde"}, 28:{name:"Tartaruga-Mordedora"},
      29:{name:"Pantera"}, 30:{name:"Pantera-da-Flórida"}, 31:{name:"Jacaré-Americano"},
      32:{name:"Cascavel-Diamante"}, 34:{name:"Cascavel-dos-Bosques"},
      35:{name:"Serpente-Mocassim-Cabeça-de-Cobre do Norte"},
      36:{name:"Serpente-Mocassim-Cabeça-de-Cobre do Sul"}, 37:{name:"Mocassim-Aquática"},
      39:{name:"Uapiti-das-Montanhas-Rochosas Macho"}, 40:{name:"Uapiti-das-Montanhas-Rochosas Fêmea"},
      41:{name:"Texugo-Americano"}, 42:{name:"Lobo-Cinzento"}, 43:{name:"Lobo-Ocidental"},
      44:{name:"Carneiro-Selvagem-da-Montanha"}, 45:{name:"Ovelha-Selvagem-da-Montanha"},
      46:{name:"Coiote-do-Vale-da-Califórnia"}, 47:{name:"Cariacu"}, 48:{name:"Veado-de-Cauda-Branca"},
      49:{name:"Javali"}, 50:{name:"Bisão-Americano"}, 51:{name:"Antilocapra-Americana Macho"},
      52:{name:"Antilocapra-Americana Fêmea"}, 53:{name:"Urso-Negro-Americano"},
      54:{name:"Castor-Americano"}, 55:{name:"Guaxinim-Americano"},
      56:{name:"Raposa-Vermelha-Americana"}, 57:{name:"Raposa-Cinzenta-Americana"},
      58:{name:"Raposa-Prateada"}, 59:{name:"Gambá-Listrado"}, 60:{name:"Gambá-Saruê-da-Virgínia"},
      61:{name:"Rato-Almiscarado-Americano"}, 62:{name:"Alce-Ocidental Macho"},
      63:{name:"Alce-Ocidental Fêmea"}, 64:{name:"Urso-Cinzento"}, 65:{name:"Coelho-de-Cauda-Negra"},
      77:{name:"Jacaré Teca"}, 78:{name:"Castor-Noturno"}, 79:{name:"Bisão Tatanka"},
      80:{name:"Cervo-Sombrio"}, 81:{name:"Suçuarana Sapa"}, 82:{name:"Coiote-da-Meia-Noite"},
      83:{name:"Uapiti Katata"}, 84:{name:"Lobo-Ônix"}, 85:{name:"Pantera-da-Noite"},
      86:{name:"Carneiro-do-Chifre-de-Rutilo"}, 87:{name:"Alce-Fidalgo"}, 88:{name:"Castor-Lunar"},
      89:{name:"Bisão Winyan"}, 90:{name:"Cervo-Nevado"}, 91:{name:"Suçuarana Iguga"},
      92:{name:"Coiote-Leite"}, 93:{name:"Uapiti Inahme"}, 94:{name:"Lobo-Pedra-da-Lua"},
      95:{name:"Pantera-Fantasma"}, 96:{name:"Carneiro-do-Chifre-de-Gabro"}, 97:{name:"Alce-Neve"},
      98:{name:"Jacaré-do-Sol"}, 99:{name:"Jacaré-Listrado"}, 100:{name:"Bisão Payta"},
      101:{name:"Javali Wakpa"}, 102:{name:"Coiote-da-Listra-Vermelha"}, 103:{name:"Uapiti Ozula"},
      104:{name:"Lobo-Esmeralda"}, 105:{name:"Urso-Espírito Ridgeback"},
      106:{name:"Urso-Espírito-Dourado"}, 107:{name:"Castor Zizi"}, 108:{name:"Javali Cogi"},
      109:{name:"Alce-Corado"}, 110:{name:"Urso Owiza"}, 111:{name:"Javali Icahi"},
      112:{name:"Cervo-Corredor"}, 113:{name:"Suçuarana Maza"}, 114:{name:"Raposa Ota"},
      115:{name:"Raposa-Mármore"}, 116:{name:"Raposa Cross"}, 117:{name:"Pantera Iwakta"},
      118:{name:"Carneiro-do-Chifre-de-Calcário"}
    }
  };
})(typeof window !== "undefined" ? window : this);
