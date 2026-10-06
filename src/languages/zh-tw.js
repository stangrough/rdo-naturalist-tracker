// languages/zh-tw.js -- 繁體中文.
//
// Animal and category names come from the official in-game localisation
// (via the locale files of github.com/tjakubowski/rdo-naturalist), keyed by the
// ids of data/catalog.js. Interface strings are translated by hand; a missing
// key falls back to languages/en.js.
(function (root) {
  "use strict";

  root.RDO_LANGUAGES = root.RDO_LANGUAGES || {};

  root.RDO_LANGUAGES["zh-tw"] = {
    meta: { code: "zh-tw", name: "繁體中文" },

    // Interface strings; `{placeholder}` markers are filled in by assets/app.js.
    ui: {
      app_title: "RDO 博物學家追蹤器",
      language: "語言",
      search_placeholder: "搜尋動物或類別...",
      view_normal: "普通",
      view_legendary: "傳說",
      no_results: "沒有結果。",
      clock: "遊戲內時間",
      progress: "已蓋章 {stamped}/{total}",
      price: "${price}",
      samples_minus: "減少一個樣本",
      samples_plus: "增加一個樣本",
      samples_max: "已達樣本上限（{cap}）",
      stamped: "蓋章",
      stamped_hint: "蓋章消耗 1 個樣本，取消蓋章不會返還。",
      stamped_blocked: "沒有可用於蓋章的樣本。",
      sell_set: "出售整套",
      sell_set_hint: "清除該類別所有動物的蓋章（樣本保留）。",
      sell_set_blocked: "整套未完成：所有動物都必須蓋章。",
      sell_set_confirm: "出售「{category}」整套？該類別的所有蓋章都會被清除。",
      badge_protect: "保",
      badge_protect_hint: "出現在「保護傳說動物」任務中（保）",
      badge_tagging: "標",
      badge_tagging_hint: "出現在「標記野生動物」任務中（標）",
      badge_harriet: "哈",
      badge_harriet_hint: "僅在哈莉特任務中獲得（哈）",
      timer: "{name}（{minutes} 分鐘）",
      timer_moonshine: "私釀酒醅",
      timer_trader: "商人補給",
      timer_state_idle: "就緒",
      timer_state_running: "進行中",
      timer_state_paused: "已暫停",
      timer_state_done: "已完成",
      timer_start: "開始",
      timer_stop: "停止",
      timer_reset: "重設",
      storage: "所有資料只儲存在此瀏覽器（localStorage）中：沒有伺服器，也不需要帳號。",
      export_file: "匯出檔案",
      export_file_hint: "將目前進度下載為 JSON 檔案。",
      import_file: "匯入檔案",
      import_file_hint: "從匯出的 JSON 檔案載入進度。",
      import_file_failed: "匯入失敗：檔案不是有效的匯出檔。",
      reset: "清除進度",
      reset_confirm: "清除所有樣本、蓋章和計時器？"
    },

    // Category ids -> name. Ids match data/catalog.js.
    categories: {
      1:{name:"農地物種"}, 2:{name:"沙漠物種"}, 3:{name:"溼地物種"}, 4:{name:"山脈與草原物種"}, 5:{name:"森林與河川物種"},
      7:{name:"傳說動物：黑"}, 8:{name:"傳說動物：白"}, 9:{name:"傳說動物：紅與金"}, 10:{name:"傳說動物：花紋"}
    },

    // Animal ids -> name. Ids match data/catalog.js.
    animals: {
      1:{name:"佛羅里達奶牛"}, 2:{name:"安格斯公牛"}, 3:{name:"德文公牛"}, 4:{name:"赫裡福德公牛"}, 5:{name:"安格斯閹牛"},
      6:{name:"德文閹牛"}, 7:{name:"斑點豬"}, 8:{name:"巴克夏豬"}, 9:{name:"中國大豬"}, 10:{name:"美利奴綿羊"},
      11:{name:"阿爾卑斯山羊"}, 12:{name:"沙漠鬣蜥"}, 13:{name:"帶紋吉拉毒蜥"}, 14:{name:"九帶犰狳"}, 15:{name:"下加州公叉角羚"},
      16:{name:"下加州母叉角羚"}, 17:{name:"領西猯"}, 18:{name:"索諾蘭公叉角羚"}, 19:{name:"索諾蘭母叉角羚"}, 20:{name:"沙漠公盤羊"},
      21:{name:"沙漠盤羊"}, 22:{name:"內華達山脈公盤羊"}, 23:{name:"內華達山脈盤羊"}, 24:{name:"黑尾響尾蛇"}, 25:{name:"美洲獅"},
      26:{name:"美國短吻鱷（小）"}, 27:{name:"綠鬣蜥"}, 28:{name:"鱷龜"}, 29:{name:"山獅"}, 30:{name:"佛羅里達山獅"},
      31:{name:"美國短吻鱷"}, 32:{name:"菱斑響尾蛇"}, 33:{name:"中部水蛇"}, 34:{name:"木紋響尾蛇"}, 35:{name:"北部銅斑蛇"},
      36:{name:"南部銅斑蛇"}, 37:{name:"棉口蛇"}, 38:{name:"北部水蛇"}, 39:{name:"落基山脈公麋鹿"}, 40:{name:"落基山脈母麋鹿"},
      41:{name:"美國獾"}, 42:{name:"灰狼"}, 43:{name:"森林狼"}, 44:{name:"落基山脈公盤羊"}, 45:{name:"落基山脈盤羊"},
      46:{name:"加州峽谷郊狼"}, 47:{name:"白尾公鹿"}, 48:{name:"白尾鹿"}, 49:{name:"野豬"}, 50:{name:"美洲野牛"},
      51:{name:"美國公叉角羚"}, 52:{name:"美國母叉角羚"}, 53:{name:"美洲黑熊"}, 54:{name:"北美河狸"}, 55:{name:"北美浣熊"},
      56:{name:"美國紅狐"}, 57:{name:"美國灰狐"}, 58:{name:"銀狐"}, 59:{name:"條紋臭鼬"}, 60:{name:"弗吉尼亞負鼠"},
      61:{name:"美國麝鼠"}, 62:{name:"北美西部公駝鹿"}, 63:{name:"北美西部駝鹿"}, 64:{name:"大灰熊"}, 65:{name:"黑尾兔"},
      77:{name:"泰加短吻鱷"}, 78:{name:"暗夜河狸"}, 79:{name:"塔坦卡野牛"}, 80:{name:"暗影公鹿"}, 81:{name:"薩帕美洲獅"},
      82:{name:"夜爪郊狼"}, 83:{name:"卡塔塔北美馬鹿"}, 84:{name:"縞瑪瑙狼"}, 85:{name:"夜行山獅"}, 86:{name:"金紅石角公羊"},
      87:{name:"騎士駝鹿"}, 88:{name:"明月河狸"}, 89:{name:"文彥野牛"}, 90:{name:"雪白公鹿"}, 91:{name:"伊古加美洲獅"},
      92:{name:"乳白郊狼"}, 93:{name:"伊那美北美馬鹿"}, 94:{name:"月長石狼"}, 95:{name:"鬼山獅"}, 96:{name:"輝長巖角公羊"},
      97:{name:"雪花駝鹿"}, 98:{name:"太陽短吻鱷"}, 99:{name:"條紋短吻鱷"}, 100:{name:"佩塔野牛"}, 101:{name:"瓦克帕野豬"},
      102:{name:"紅紋郊狼"}, 103:{name:"歐朱拉北美馬鹿"}, 104:{name:"祖母綠狼"}, 105:{name:"背脊靈熊"}, 106:{name:"黃金靈熊"},
      107:{name:"茲茲河狸"}, 108:{name:"柯基野豬"}, 109:{name:"紅角駝鹿"}, 110:{name:"歐威扎熊"}, 111:{name:"伊卡西野豬"},
      112:{name:"奔泥公鹿"}, 113:{name:"馬扎美洲獅"}, 114:{name:"歐塔狐"}, 115:{name:"大理石狐"}, 116:{name:"混色狐"},
      117:{name:"易瓦塔山獅"}, 118:{name:"白堊角公羊"}
    }
  };
})(typeof window !== "undefined" ? window : this);
