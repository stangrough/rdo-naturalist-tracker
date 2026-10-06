// languages/fr.js -- Français.
//
// Animal and category names come from the official in-game localisation
// (via the locale files of github.com/tjakubowski/rdo-naturalist), keyed by the
// ids of data/catalog.js. Interface strings are translated by hand; a missing
// key falls back to languages/en.js.
(function (root) {
  "use strict";

  root.RDO_LANGUAGES = root.RDO_LANGUAGES || {};

  root.RDO_LANGUAGES["fr"] = {
    meta: { code: "fr", name: "Français" },

    // Interface strings; `{placeholder}` markers are filled in by assets/app.js.
    ui: {
      app_title: "Traqueur de naturaliste RDO",
      language: "Langue",
      search_placeholder: "Rechercher un animal ou une catégorie...",
      view_normal: "Normaux",
      view_legendary: "Légendaires",
      no_results: "Aucun résultat.",
      clock: "Heure du jeu",
      progress: "{stamped}/{total} tamponnés",
      price: "{price} $",
      samples_minus: "Un échantillon en moins",
      samples_plus: "Un échantillon en plus",
      samples_max: "Limite d'échantillons atteinte ({cap})",
      stamped: "Tampon",
      stamped_hint: "Tamponner consomme 1 échantillon. Le retirer ne le rend pas.",
      stamped_blocked: "Aucun échantillon à tamponner.",
      sell_set: "Vendre le set",
      sell_set_hint: "Retire le tampon de tous les animaux de cette catégorie (les échantillons restent).",
      sell_set_blocked: "Set incomplet : tous les animaux doivent être tamponnés.",
      sell_set_confirm: "Vendre le set \"{category}\" ? Tous les tampons de cette catégorie seront retirés.",
      badge_protect: "P",
      badge_protect_hint: "Apparaît dans \"Protéger l'animal légendaire\" (P)",
      badge_tagging: "M",
      badge_tagging_hint: "Apparaît dans \"Marquage d'animaux sauvages\" (M)",
      badge_harriet: "H",
      badge_harriet_hint: "Disponible uniquement en mission Harriet (H)",
      timer: "{name} ({minutes} min)",
      timer_moonshine: "Moût de gnôle",
      timer_trader: "Réapprovisionnement du marchand",
      timer_state_idle: "prêt",
      timer_state_running: "en cours",
      timer_state_paused: "en pause",
      timer_state_done: "terminé",
      timer_start: "Démarrer",
      timer_stop: "Arrêter",
      timer_reset: "Réinitialiser",
      storage: "Tout est stocké localement dans ce navigateur (localStorage) : aucun serveur, aucun compte.",
      export_file: "Exporter un fichier",
      export_file_hint: "Télécharger la progression actuelle au format JSON.",
      import_file: "Importer un fichier",
      import_file_hint: "Charger la progression depuis un fichier JSON exporté.",
      import_file_failed: "Import échoué : le fichier n'est pas un export valide.",
      reset: "Effacer la progression",
      reset_confirm: "Effacer tous les échantillons, tampons et minuteurs ?"
    },

    // Category ids -> name. Ids match data/catalog.js.
    categories: {
      1:{name:"Fermes"}, 2:{name:"Déserts"}, 3:{name:"Marais"}, 4:{name:"Montagnes et prairies"},
      5:{name:"Rivières et forêts"}, 7:{name:"Animaux légendaires : sombres"},
      8:{name:"Animaux légendaires : clairs"}, 9:{name:"Animaux légendaires : roux ou sable"},
      10:{name:"Animaux légendaires : tachetés/rayés"}
    },

    // Animal ids -> name. Ids match data/catalog.js.
    animals: {
      1:{name:"Vache de Floride"}, 2:{name:"Taureau Angus"}, 3:{name:"Taureau Devon"},
      4:{name:"Taureau Hereford"}, 5:{name:"Bœuf Angus"}, 6:{name:"Bœuf Devon"},
      7:{name:"Cochon Old Spot"}, 8:{name:"Cochon Berkshire"}, 9:{name:"Cochon de Chine"},
      10:{name:"Mérinos"}, 11:{name:"Chèvre alpine"}, 12:{name:"Iguane du désert"},
      13:{name:"Monstre de Gila à bandes"}, 14:{name:"Tatou à neuf bandes"},
      15:{name:"Antilope mâle de Basse-Californie"}, 16:{name:"Antilope femelle de Basse-Californie"},
      17:{name:"Pécari à collier"}, 18:{name:"Antilope mâle de Sonora"},
      19:{name:"Antilope femelle de Sonora"}, 20:{name:"Mouflon du désert (mâle)"},
      21:{name:"Mouflon du désert (femelle)"}, 22:{name:"Mouflon de la Sierra Nevada (mâle)"},
      23:{name:"Mouflon de la Sierra Nevada (femelle)"}, 24:{name:"Crotale à queue noire"},
      25:{name:"Couguar"}, 26:{name:"Alligator américain (petit)"}, 27:{name:"Iguane vert"},
      28:{name:"Tortue alligator"}, 29:{name:"Panthère"}, 30:{name:"Panthère de Floride"},
      31:{name:"Alligator américain"}, 32:{name:"Crotale du Texas"}, 34:{name:"Crotale des bois"},
      35:{name:"Mocassin à tête cuivrée du Nord"}, 36:{name:"Mocassin à tête cuivrée du Sud"},
      39:{name:"Wapiti mâle des montagnes Rocheuses"},
      40:{name:"Wapiti femelle des montagnes Rocheuses"}, 41:{name:"Blaireau américain"},
      42:{name:"Loup gris"}, 43:{name:"Loup des bois"},
      44:{name:"Mouflon des montagnes Rocheuses (mâle)"},
      45:{name:"Mouflon des montagnes Rocheuses (femelle)"}, 46:{name:"Coyote de Californie"},
      47:{name:"Cerf de Virginie"}, 48:{name:"Biche de Virginie"}, 49:{name:"Sanglier"},
      50:{name:"Bison américain"}, 53:{name:"Ours noir américain"}, 58:{name:"Renard argenté"},
      59:{name:"Moufette rayée"}, 60:{name:"Opossum de Virginie"}, 62:{name:"Orignal mâle"},
      63:{name:"Orignal"}, 64:{name:"Grizzly"}, 65:{name:"Lièvre de Californie (lapin)"},
      77:{name:"Alligator Teca"}, 78:{name:"Castor ténébreux"}, 79:{name:"Bison Tatanka"},
      80:{name:"Cerf ombré"}, 81:{name:"Couguar Sapa"}, 83:{name:"Wapiti Katata"},
      85:{name:"Panthère noctivague"}, 86:{name:"Mouflon à cornes de rutile"},
      87:{name:"Orignal chevalier"}, 88:{name:"Castor sélène"}, 89:{name:"Bison Winyan"},
      90:{name:"Cerf des neiges"}, 91:{name:"Couguar Iguga"}, 92:{name:"Coyote laiteux"},
      93:{name:"Wapiti Inahme"}, 94:{name:"Loup de pierre de lune"}, 95:{name:"Panthère fantôme"},
      96:{name:"Mouflon à cornes de gabbro"}, 97:{name:"Orignal neigeux"}, 98:{name:"Alligator doré"},
      99:{name:"Alligator à bandes"}, 100:{name:"Bison Payta"}, 101:{name:"Sanglier Wakpa"},
      102:{name:"Coyote rubigineux"}, 103:{name:"Wapiti Ozula"},
      105:{name:"Ours esprit à rayure dorsale"}, 106:{name:"Ours esprit doré"},
      107:{name:"Castor solaire"}, 108:{name:"Sanglier Cogi"}, 109:{name:"Orignal à bois rougeâtres"},
      110:{name:"Ours Owiza"}, 111:{name:"Sanglier Icahi"}, 112:{name:"Cerf pataugeur"},
      113:{name:"Couguar Maza"}, 114:{name:"Renard Ota"}, 115:{name:"Renard marbré"},
      116:{name:"Renard croisé"}, 117:{name:"Panthère Iwakta"}, 118:{name:"Mouflon à cornes de craie"}
    }
  };
})(typeof window !== "undefined" ? window : this);
