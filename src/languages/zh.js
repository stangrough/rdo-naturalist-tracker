// languages/zh.js -- 简体中文.
//
// Animal and category names come from the official in-game localisation
// (via the locale files of github.com/tjakubowski/rdo-naturalist), keyed by the
// ids of data/catalog.js. Interface strings are translated by hand; a missing
// key falls back to languages/en.js.
(function (root) {
  "use strict";

  root.RDO_LANGUAGES = root.RDO_LANGUAGES || {};

  root.RDO_LANGUAGES["zh"] = {
    meta: { code: "zh", name: "简体中文" },

    // Interface strings; `{placeholder}` markers are filled in by assets/app.js.
    ui: {
      app_title: "RDO 博物学家追踪器",
      language: "语言",
      search_placeholder: "搜索动物或类别...",
      view_normal: "普通",
      view_legendary: "传说",
      no_results: "没有结果。",
      clock: "游戏内时间",
      progress: "已盖章 {stamped}/{total}",
      price: "${price}",
      samples_minus: "减少一个样本",
      samples_plus: "增加一个样本",
      samples_max: "已达样本上限（{cap}）",
      stamped: "盖章",
      stamped_hint: "盖章消耗 1 个样本，取消盖章不会返还。",
      stamped_blocked: "没有可用于盖章的样本。",
      sell_set: "出售整套",
      sell_set_hint: "清除该类别所有动物的盖章（样本保留）。",
      sell_set_blocked: "整套未完成：所有动物都必须盖章。",
      sell_set_confirm: "出售“{category}”整套？该类别的所有盖章都会被清除。",
      badge_protect: "保",
      badge_protect_hint: "出现在“保护传说动物”任务中（保）",
      badge_tagging: "标",
      badge_tagging_hint: "出现在“标记野生动物”任务中（标）",
      badge_harriet: "哈",
      badge_harriet_hint: "仅在哈莉特任务中获得（哈）",
      timer: "{name}（{minutes} 分钟）",
      timer_moonshine: "私酿酒醅",
      timer_trader: "商人补给",
      timer_state_idle: "就绪",
      timer_state_running: "进行中",
      timer_state_paused: "已暂停",
      timer_state_done: "已完成",
      timer_start: "开始",
      timer_stop: "停止",
      timer_reset: "重置",
      storage: "所有数据只保存在此浏览器（localStorage）中：没有服务器，也不需要账号。",
      export_file: "导出文件",
      export_file_hint: "将当前进度下载为 JSON 文件。",
      import_file: "导入文件",
      import_file_hint: "从导出的 JSON 文件载入进度。",
      import_file_failed: "导入失败：文件不是有效的导出文件。",
      reset: "清除进度",
      reset_confirm: "清除所有样本、盖章和计时器？"
    },

    // Category ids -> name. Ids match data/catalog.js.
    categories: {
      1:{name:"农田栖息地"}, 2:{name:"沙漠栖息地"}, 3:{name:"湿地栖息地"}, 4:{name:"山地和草原栖息地"}, 5:{name:"森林和河流栖息地"},
      7:{name:"传说动物：深色"}, 8:{name:"传说动物：浅色"}, 9:{name:"传说动物：红色和金色"}, 10:{name:"传说动物：花纹"}
    },

    // Animal ids -> name. Ids match data/catalog.js.
    animals: {
      1:{name:"佛罗里达奎克母牛"}, 2:{name:"安格斯公牛"}, 3:{name:"德文公牛"}, 4:{name:"海福特公牛"}, 5:{name:"安格斯阉牛"},
      6:{name:"德文阉牛"}, 7:{name:"花猪"}, 8:{name:"盘克夏猪"}, 9:{name:"大中国猪"}, 10:{name:"美丽诺绵羊"},
      11:{name:"阿尔拜因山羊"}, 12:{name:"沙漠鬣蜥"}, 13:{name:"条纹美国毒蜥"}, 14:{name:"九带犰狳"}, 15:{name:"下加州叉角公羚"},
      16:{name:"下加州叉角母羚"}, 17:{name:"领西貒"}, 18:{name:"索诺拉叉角公羚"}, 19:{name:"索诺拉叉角母羚"},
      20:{name:"沙漠大角公羊"}, 21:{name:"沙漠大角母羊"}, 22:{name:"内华达山脉大角公羊"}, 23:{name:"内华达山脉大角母羊"},
      24:{name:"黑尾响尾蛇"}, 25:{name:"美洲狮"}, 26:{name:"美国短吻鳄（小型）"}, 27:{name:"绿鬣蜥"}, 28:{name:"真鳄龟"},
      29:{name:"山狮"}, 30:{name:"佛罗里达山狮"}, 31:{name:"美国短吻鳄"}, 32:{name:"菱斑响尾蛇"}, 33:{name:"中部水蛇"},
      34:{name:"木纹响尾蛇"}, 35:{name:"北部铜头蛇"}, 36:{name:"南部铜头蛇"}, 37:{name:"棉口蛇"}, 38:{name:"北部水蛇"},
      39:{name:"落矶山雄马鹿"}, 40:{name:"落矶山母马鹿"}, 41:{name:"美洲獾"}, 42:{name:"灰狼"}, 43:{name:"森林狼"},
      44:{name:"落矶山大角公羊"}, 45:{name:"落矶山大角母羊"}, 46:{name:"加州峡谷郊狼"}, 47:{name:"白尾公鹿"}, 48:{name:"白尾鹿"},
      49:{name:"野猪"}, 50:{name:"美洲野牛"}, 51:{name:"美洲叉角公羚"}, 52:{name:"美洲叉角母羚"}, 53:{name:"美洲黑熊"},
      54:{name:"北美河狸"}, 55:{name:"北美浣熊"}, 56:{name:"美洲赤狐"}, 57:{name:"美洲灰狐"}, 58:{name:"银狐"},
      59:{name:"条纹臭鼬"}, 60:{name:"北美负鼠"}, 61:{name:"美洲麝鼠"}, 62:{name:"西部公驼鹿"}, 63:{name:"西部驼鹿"},
      64:{name:"灰熊"}, 65:{name:"黑尾长耳大野兔"}, 77:{name:"特卡短吻鳄"}, 78:{name:"黑夜河狸"}, 79:{name:"塔坦卡野牛"},
      80:{name:"暗影公鹿"}, 81:{name:"萨帕美洲狮"}, 82:{name:"夜爪郊狼"}, 83:{name:"卡塔他麋鹿"}, 84:{name:"缟玛瑙狼"},
      85:{name:"夜行山狮"}, 86:{name:"金红角公羊"}, 87:{name:"骑士驼鹿"}, 88:{name:"月光河狸"}, 89:{name:"温延野牛"},
      90:{name:"白雪公鹿"}, 91:{name:"伊格加美洲狮"}, 92:{name:"乳白郊狼"}, 93:{name:"伊纳梅麋鹿"}, 94:{name:"月石狼"},
      95:{name:"幽灵山狮"}, 96:{name:"辉长角公羊"}, 97:{name:"雪花驼鹿"}, 98:{name:"太阳短吻鳄"}, 99:{name:"条纹短吻鳄"},
      100:{name:"佩塔野牛"}, 101:{name:"瓦克帕野猪"}, 102:{name:"红纹郊狼"}, 103:{name:"奥祖拉麋鹿"}, 104:{name:"翡翠狼"},
      105:{name:"脊背灵熊"}, 106:{name:"金色灵熊"}, 107:{name:"齐奇河狸"}, 108:{name:"科基野猪"}, 109:{name:"淡红驼鹿"},
      110:{name:"奥威萨熊"}, 111:{name:"伊卡希野猪"}, 112:{name:"踏泥公鹿"}, 113:{name:"马萨美洲狮"}, 114:{name:"奥塔狐"},
      115:{name:"大理石狐"}, 116:{name:"十字狐"}, 117:{name:"伊瓦科塔山狮"}, 118:{name:"白垩角公羊"}
    }
  };
})(typeof window !== "undefined" ? window : this);
