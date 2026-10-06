// languages/ja.js -- 日本語.
//
// Animal and category names come from the official in-game localisation
// (via the locale files of github.com/tjakubowski/rdo-naturalist), keyed by the
// ids of data/catalog.js. Interface strings are translated by hand; a missing
// key falls back to languages/en.js.
(function (root) {
  "use strict";

  root.RDO_LANGUAGES = root.RDO_LANGUAGES || {};

  root.RDO_LANGUAGES["ja"] = {
    meta: { code: "ja", name: "日本語" },

    // Interface strings; `{placeholder}` markers are filled in by assets/app.js.
    ui: {
      app_title: "RDO ナチュラリスト トラッカー",
      language: "言語",
      search_placeholder: "動物やカテゴリーを検索...",
      view_normal: "通常",
      view_legendary: "伝説",
      no_results: "該当なし。",
      clock: "ゲーム内時間",
      progress: "{stamped}/{total} 押印済み",
      price: "${price}",
      samples_minus: "サンプルを1つ減らす",
      samples_plus: "サンプルを1つ増やす",
      samples_max: "サンプル上限に達しました（{cap}）",
      stamped: "押印",
      stamped_hint: "押印はサンプルを1つ消費します。取り消しても戻りません。",
      stamped_blocked: "押印できるサンプルがありません。",
      sell_set: "セットを売る",
      sell_set_hint: "このカテゴリーの全動物の押印を消します（サンプルは残ります）。",
      sell_set_blocked: "セットが未完成です。全動物に押印が必要です。",
      sell_set_confirm: "「{category}」のセットを売りますか？このカテゴリーの押印はすべて消えます。",
      badge_protect: "保",
      badge_protect_hint: "「伝説の動物を守れ」に出現（保）",
      badge_tagging: "タ",
      badge_tagging_hint: "「野生動物のタグ付け」に出現（タ）",
      badge_harriet: "ハ",
      badge_harriet_hint: "ハリエットのミッション限定（ハ）",
      timer: "{name}（{minutes}分）",
      timer_moonshine: "密造酒のもろみ",
      timer_trader: "トレーダーの物資補給",
      timer_state_idle: "待機",
      timer_state_running: "進行中",
      timer_state_paused: "一時停止",
      timer_state_done: "完了",
      timer_start: "開始",
      timer_stop: "停止",
      timer_reset: "リセット",
      storage: "すべてこのブラウザー内（localStorage）に保存されます。サーバーもアカウントも不要です。",
      export_file: "ファイルに書き出す",
      export_file_hint: "現在の進行状況をJSONファイルでダウンロードします。",
      import_file: "ファイルから読み込む",
      import_file_hint: "書き出したJSONファイルから進行状況を読み込みます。",
      import_file_failed: "読み込み失敗：有効なデータではありません。",
      reset: "進行状況を消去",
      reset_confirm: "すべてのサンプル・押印・タイマーを消去しますか？"
    },

    // Category ids -> name. Ids match data/catalog.js.
    categories: {
      1:{name:"生息地：農地"}, 2:{name:"生息地：砂漠"}, 3:{name:"生息地：湿地"}, 4:{name:"生息地：山＆草原"},
      5:{name:"生息地：森林＆河川"}, 7:{name:"伝説の動物：漆黒"}, 8:{name:"伝説の動物：純白"}, 9:{name:"伝説の動物：赤茶色&金色"},
      10:{name:"伝説の動物：模様"}
    },

    // Animal ids -> name. Ids match data/catalog.js.
    animals: {
      1:{name:"フロリダクラッカー種の牛"}, 2:{name:"アンガス種の雄牛"}, 3:{name:"デボン種の雄牛"}, 4:{name:"ヘレフォード種の雄牛"},
      5:{name:"アンガス種の去勢牛"}, 6:{name:"デボン種の去勢牛"}, 7:{name:"オールド・スポット種の豚"}, 8:{name:"バークシャー種の豚"},
      9:{name:"ビッグチャイナ種の豚"}, 10:{name:"メリノ種の羊"}, 11:{name:"アルパイン種のヤギ"}, 12:{name:"サバクイグアナ"},
      13:{name:"ヒラモンスター"}, 14:{name:"ココノオビアルマジロ"}, 15:{name:"カリフォルニアプロングホーンの雄"},
      16:{name:"カリフォルニアプロングホーンの雌"}, 17:{name:"クビワペッカリー"}, 18:{name:"ソノラプロングホーンの雄"},
      19:{name:"ソノラプロングホーンの雌"}, 20:{name:"サバクオオツノヒツジの雄"}, 21:{name:"サバクオオツノヒツジ"},
      22:{name:"シエラネバダオオツノヒツジの雄"}, 23:{name:"シエラネバダオオツノヒツジ"}, 24:{name:"クロオガラガラヘビ"}, 25:{name:"クーガー"},
      26:{name:"ミシシッピワニ(小型)"}, 27:{name:"グリーンイグアナ"}, 28:{name:"ワニガメ"}, 29:{name:"ヒョウ"},
      30:{name:"フロリダパンサー"}, 31:{name:"ミシシッピワニ"}, 32:{name:"ダイヤガラガラヘビ"}, 33:{name:"ミッドランド水ヘビ"},
      34:{name:"ヨコシマガラガラヘビ"}, 35:{name:"キタアメリカマムシ"}, 36:{name:"ミナミアメリカマムシ"}, 37:{name:"ヌママムシ"},
      38:{name:"キタ水ヘビ"}, 39:{name:"ロッキーマウンテンエルクの雄"}, 40:{name:"ロッキーマウンテンエルクの雌"}, 41:{name:"アメリカアナグマ"},
      42:{name:"ハイイロオオカミ"}, 43:{name:"シンリンオオカミ"}, 44:{name:"ロッキーオオツノヒツジの雄"}, 45:{name:"ロッキーオオツノヒツジ"},
      46:{name:"カリフォルニアバレーコヨーテ"}, 47:{name:"白尾シカの雄"}, 48:{name:"白尾シカ"}, 49:{name:"イノシシ"},
      50:{name:"アメリカバイソン"}, 51:{name:"アメリカプロングホーンの雄"}, 52:{name:"アメリカプロングホーンの雌"}, 53:{name:"アメリカクロクマ"},
      54:{name:"アメリカビーバー"}, 55:{name:"アメリカアライグマ"}, 56:{name:"アメリカアカギツネ"}, 57:{name:"アメリカハイイロギツネ"},
      58:{name:"ギンギツネ"}, 59:{name:"シマスカンク"}, 60:{name:"フクロネズミ"}, 61:{name:"マスクラット"},
      62:{name:"ニシヘラジカの雄"}, 63:{name:"ニシヘラジカ"}, 64:{name:"ハイイログマ"}, 65:{name:"オグロジャックウサギ"},
      77:{name:"ティカワニ"}, 78:{name:"ナイトビーバー"}, 79:{name:"タタンカバイソン"}, 80:{name:"クロカゲ雄鹿"},
      81:{name:"サパクーガー"}, 82:{name:"ミッドナイトポーコヨーテ"}, 83:{name:"カタタエルク"}, 84:{name:"オニキスオオカミ"},
      85:{name:"ナイトウォーカーヒョウ"}, 86:{name:"ルチルホーンヒツジの雄"}, 87:{name:"騎士ヘラジカ"}, 88:{name:"ムーンビーバー"},
      89:{name:"ウィンヤンバイソン"}, 90:{name:"シラユキ雄鹿"}, 91:{name:"イグガクーガー"}, 92:{name:"ミルクコヨーテ"},
      93:{name:"イナーミエルク"}, 94:{name:"ムーンストーンオオカミ"}, 95:{name:"ゴーストヒョウ"}, 96:{name:"ガブロホーンヒツジの雄"},
      97:{name:"スノーフレークヘラジカ"}, 98:{name:"タイヨウワニ"}, 99:{name:"縞ワニ"}, 100:{name:"ペイタバイソン"},
      101:{name:"ワクパイノシシ"}, 102:{name:"レッドストリークコヨーテ"}, 103:{name:"オズーラエルク"}, 104:{name:"エメラルドオオカミ"},
      105:{name:"リッジバック精霊熊"}, 106:{name:"金色の精霊熊"}, 107:{name:"ジジビーバー"}, 108:{name:"コーギイノシシ"},
      109:{name:"アカツノヘラジカ"}, 110:{name:"オウィザグマ"}, 111:{name:"イカヒイノシシ"}, 112:{name:"マッドランナー雄鹿"},
      113:{name:"マザクーガー"}, 114:{name:"オタギツネ"}, 115:{name:"マダラギツネ"}, 116:{name:"ジュウジギツネ"},
      117:{name:"イワクタヒョウ"}, 118:{name:"チョークホーンヒツジの雄"}
    }
  };
})(typeof window !== "undefined" ? window : this);
