// data/catalog.js -- language-free catalog of the RDO naturalist.
//
// Ids, categories, types, prices and totals are taken 1:1 from the upstream
// Naturalist tracker `data.js`. Every human readable string lives in
// `languages/<code>.js`, keyed by the same ids. Critters are left out: they are
// not part of the naturalist sample sets this tracker is built for.
(function (root) {
  "use strict";

  var catalog = {
    // Sample caps enforced by the UI (Rockstar limits) and list padding.
    settings: { max_normal: 10, max_legendary: 3, rows_per_category: 14 },

    // Two independent countdowns, persisted in localStorage. `label` is the
    // suffix of the `timer_<label>` string in languages/<code>.js, the duration
    // is only defined here.
    timers: [
      { id: "t48", minutes: 48, label: "moonshine" },
      { id: "t50", minutes: 50, label: "trader" }
    ],

    // A view groups the categories of one type.
    views: [{ id: "normal", type: "normal" }, { id: "legendary", type: "legendary" }],

    categories: {
      1:{type:"normal",price:60,total:11}, 2:{type:"normal",price:80,total:14},
      3:{type:"normal",price:110,total:13}, 4:{type:"normal",price:140,total:14},
      5:{type:"normal",price:160,total:13}, 7:{type:"legendary",price:680,total:11},
      8:{type:"legendary",price:600,total:10}, 9:{type:"legendary",price:700,total:12},
      10:{type:"legendary",price:480,total:9}
    },

    animals: {
      1:{category:1,type:"normal"}, 2:{category:1,type:"normal"}, 3:{category:1,type:"normal"},
      4:{category:1,type:"normal"}, 5:{category:1,type:"normal"}, 6:{category:1,type:"normal"},
      7:{category:1,type:"normal"}, 8:{category:1,type:"normal"}, 9:{category:1,type:"normal"},
      10:{category:1,type:"normal"}, 11:{category:1,type:"normal"}, 12:{category:2,type:"normal"},
      13:{category:2,type:"normal"}, 14:{category:2,type:"normal"}, 15:{category:2,type:"normal"},
      16:{category:2,type:"normal"}, 17:{category:2,type:"normal"}, 18:{category:2,type:"normal"},
      19:{category:2,type:"normal"}, 20:{category:2,type:"normal"}, 21:{category:2,type:"normal"},
      22:{category:2,type:"normal"}, 23:{category:2,type:"normal"}, 24:{category:2,type:"normal"},
      25:{category:2,type:"normal"}, 26:{category:3,type:"normal"}, 27:{category:3,type:"normal"},
      28:{category:3,type:"normal"}, 29:{category:3,type:"normal"}, 30:{category:3,type:"normal"},
      31:{category:3,type:"normal"}, 32:{category:3,type:"normal"}, 33:{category:3,type:"normal"},
      34:{category:3,type:"normal"}, 35:{category:3,type:"normal"}, 36:{category:3,type:"normal"},
      37:{category:3,type:"normal"}, 38:{category:3,type:"normal"}, 39:{category:4,type:"normal"},
      40:{category:4,type:"normal"}, 41:{category:4,type:"normal"}, 42:{category:4,type:"normal"},
      43:{category:4,type:"normal"}, 44:{category:4,type:"normal"}, 45:{category:4,type:"normal"},
      46:{category:4,type:"normal"}, 47:{category:4,type:"normal"}, 48:{category:4,type:"normal"},
      49:{category:4,type:"normal"}, 50:{category:4,type:"normal"}, 51:{category:4,type:"normal"},
      52:{category:4,type:"normal"}, 53:{category:5,type:"normal"}, 54:{category:5,type:"normal"},
      55:{category:5,type:"normal"}, 56:{category:5,type:"normal"}, 57:{category:5,type:"normal"},
      58:{category:5,type:"normal"}, 59:{category:5,type:"normal"}, 60:{category:5,type:"normal"},
      61:{category:5,type:"normal"}, 62:{category:5,type:"normal"}, 63:{category:5,type:"normal"},
      64:{category:5,type:"normal"}, 65:{category:5,type:"normal"},
      77:{category:7,type:"legendary",species:"alligator"},
      78:{category:7,type:"legendary",species:"beaver"},
      79:{category:7,type:"legendary",species:"bison"}, 80:{category:7,type:"legendary",species:"buck"},
      81:{category:7,type:"legendary",species:"cougar"},
      82:{category:7,type:"legendary",species:"coyote"}, 83:{category:7,type:"legendary",species:"elk"},
      84:{category:7,type:"legendary",species:"wolf"},
      85:{category:7,type:"legendary",species:"panther"},
      86:{category:7,type:"legendary",species:"ram"}, 87:{category:7,type:"legendary",species:"moose"},
      88:{category:8,type:"legendary",species:"beaver"},
      89:{category:8,type:"legendary",species:"bison"}, 90:{category:8,type:"legendary",species:"buck"},
      91:{category:8,type:"legendary",species:"cougar"},
      92:{category:8,type:"legendary",species:"coyote"}, 93:{category:8,type:"legendary",species:"elk"},
      94:{category:8,type:"legendary",species:"wolf"},
      95:{category:8,type:"legendary",species:"panther"},
      96:{category:8,type:"legendary",species:"ram"}, 97:{category:8,type:"legendary",species:"moose"},
      98:{category:9,type:"legendary",species:"alligator"},
      99:{category:9,type:"legendary",species:"alligator"},
      100:{category:9,type:"legendary",species:"bison"},
      101:{category:9,type:"legendary",species:"boar"},
      102:{category:9,type:"legendary",species:"coyote"},
      103:{category:9,type:"legendary",species:"elk"}, 104:{category:9,type:"legendary",species:"wolf"},
      105:{category:9,type:"legendary",species:"bear"},
      106:{category:9,type:"legendary",species:"bear"},
      107:{category:9,type:"legendary",species:"beaver"},
      108:{category:9,type:"legendary",species:"boar"},
      109:{category:9,type:"legendary",species:"moose"},
      110:{category:10,type:"legendary",species:"bear"},
      111:{category:10,type:"legendary",species:"boar"},
      112:{category:10,type:"legendary",species:"buck"},
      113:{category:10,type:"legendary",species:"cougar"},
      114:{category:10,type:"legendary",species:"fox"},
      115:{category:10,type:"legendary",species:"fox"},
      116:{category:10,type:"legendary",species:"fox"},
      117:{category:10,type:"legendary",species:"panther"},
      118:{category:10,type:"legendary",species:"ram"}
    },

    // Animal ids carrying an extra, non-clickable badge in the UI. The groups
    // are the Harriet mission types the animal can show up in:
    //   protect = Protect Legendary Animal
    //   tagging = Wild Animal Tagging
    //   harriet = only obtainable during a Harriet mission
    badges: {
      protect: [77, 83, 84, 91, 98, 103, 104, 105, 110, 113],
      tagging: [83, 85, 87, 91, 95, 96, 97, 103, 113, 118],
      harriet: [78, 80, 81, 86, 92, 93, 94, 99, 100, 106, 109, 111, 116, 117]
    }
  };

  // Animal ids of a category, in catalog order.
  catalog.animalsByCategory = function (categoryId) {
    var ids = [];
    for (var id in catalog.animals) {
      if (catalog.animals[id].category === Number(categoryId)) ids.push(Number(id));
    }
    return ids.sort(function (a, b) { return a - b; });
  };

  // Category ids of a type ("normal" | "legendary"), in catalog order.
  catalog.categoriesByType = function (type) {
    var ids = [];
    for (var id in catalog.categories) {
      if (catalog.categories[id].type === type) ids.push(Number(id));
    }
    return ids.sort(function (a, b) { return a - b; });
  };

  root.RDO_CATALOG = catalog;
})(typeof window !== "undefined" ? window : this);
