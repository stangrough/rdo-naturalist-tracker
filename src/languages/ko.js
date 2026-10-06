// languages/ko.js -- 한국어.
//
// Animal and category names come from the official in-game localisation
// (via the locale files of github.com/tjakubowski/rdo-naturalist), keyed by the
// ids of data/catalog.js. Interface strings are translated by hand; a missing
// key falls back to languages/en.js.
(function (root) {
  "use strict";

  root.RDO_LANGUAGES = root.RDO_LANGUAGES || {};

  root.RDO_LANGUAGES["ko"] = {
    meta: { code: "ko", name: "한국어" },

    // Interface strings; `{placeholder}` markers are filled in by assets/app.js.
    ui: {
      app_title: "RDO 자연학자 트래커",
      language: "언어",
      search_placeholder: "동물 또는 분류 검색...",
      view_normal: "일반",
      view_legendary: "전설",
      no_results: "결과 없음.",
      clock: "게임 내 시간",
      progress: "{stamped}/{total} 도장 완료",
      price: "${price}",
      samples_minus: "표본 1개 줄이기",
      samples_plus: "표본 1개 늘리기",
      samples_max: "표본 한도에 도달했습니다 ({cap})",
      stamped: "도장",
      stamped_hint: "도장을 찍으면 표본 1개를 사용합니다. 취소해도 돌려받지 못합니다.",
      stamped_blocked: "도장을 찍을 표본이 없습니다.",
      sell_set: "세트 판매",
      sell_set_hint: "이 분류의 모든 동물 도장을 지웁니다 (표본은 남습니다).",
      sell_set_blocked: "세트가 미완성입니다. 모든 동물에 도장이 필요합니다.",
      sell_set_confirm: "\"{category}\" 세트를 판매할까요? 이 분류의 도장이 모두 지워집니다.",
      badge_protect: "보",
      badge_protect_hint: "'전설의 동물 보호'에 등장 (보)",
      badge_tagging: "태",
      badge_tagging_hint: "'야생 동물 태그'에 등장 (태)",
      badge_harriet: "해",
      badge_harriet_hint: "해리엇 미션에서만 획득 (해)",
      timer: "{name} ({minutes}분)",
      timer_moonshine: "밀주 발효",
      timer_trader: "상인 물자 보급",
      timer_state_idle: "대기",
      timer_state_running: "진행 중",
      timer_state_paused: "일시정지",
      timer_state_done: "완료",
      timer_start: "시작",
      timer_stop: "정지",
      timer_reset: "초기화",
      storage: "모든 데이터는 이 브라우저(localStorage)에만 저장됩니다. 서버도 계정도 없습니다.",
      export_file: "파일로 내보내기",
      export_file_hint: "현재 진행 상황을 JSON 파일로 저장합니다.",
      import_file: "파일에서 가져오기",
      import_file_hint: "내보낸 JSON 파일에서 진행 상황을 불러옵니다.",
      import_file_failed: "가져오기 실패: 올바른 파일이 아닙니다.",
      reset: "진행 상황 삭제",
      reset_confirm: "모든 표본, 도장, 타이머를 삭제할까요?"
    },

    // Category ids -> name. Ids match data/catalog.js.
    categories: {
      1:{name:"농지 서식 동물"}, 2:{name:"사막 서식 동물"}, 3:{name:"습지 서식 동물"}, 4:{name:"산과 초원 서식 동물"},
      5:{name:"숲과 강 서식 동물"}, 7:{name:"전설의 동물: 어두운색 동물"}, 8:{name:"전설의 동물: 밝은색 동물"},
      9:{name:"전설의 동물: 빨간색 또는 황금색 동물"}, 10:{name:"전설의 동물: 무늬가 있는 동물"}
    },

    // Animal ids -> name. Ids match data/catalog.js.
    animals: {
      1:{name:"플로리다 크래커 젖소"}, 2:{name:"앵거스 소"}, 3:{name:"데본 소"}, 4:{name:"헤리퍼드 소"}, 5:{name:"앵거스 황소"},
      6:{name:"데본 황소"}, 7:{name:"올드스팟 돼지"}, 8:{name:"버크셔 돼지"}, 9:{name:"큰 중국 돼지"}, 10:{name:"메리노 양"},
      11:{name:"고산 염소"}, 12:{name:"사막 이구아나"}, 13:{name:"띠미국독도마뱀"}, 14:{name:"아홉띠아르마딜로"},
      15:{name:"바하 캘리포니아 영양 수컷"}, 16:{name:"바하 캘리포니아 영양 암컷"}, 17:{name:"목도리페커리"}, 18:{name:"소노라 영양 수컷"},
      19:{name:"소노라 영양 암컷"}, 20:{name:"사막 큰뿔 숫양"}, 21:{name:"사막 큰뿔양"}, 22:{name:"시에라 네바다 큰뿔 숫양"},
      23:{name:"시에라 네바다 큰뿔양"}, 24:{name:"검은꼬리 방울뱀"}, 25:{name:"쿠거"}, 26:{name:"아메리카 악어(소형)"},
      27:{name:"녹색 이구아나"}, 28:{name:"악어거북"}, 29:{name:"팬서"}, 30:{name:"플로리다 팬서"}, 31:{name:"아메리카 악어"},
      32:{name:"악질방울뱀"}, 33:{name:"미드랜드 물뱀"}, 34:{name:"팀버 방울뱀"}, 35:{name:"북부 카퍼헤드 뱀"},
      36:{name:"남부 카퍼헤드 뱀"}, 37:{name:"코튼마우스 뱀"}, 38:{name:"북부 물뱀"}, 39:{name:"로키 산 수컷 엘크"},
      40:{name:"로키 산 암컷 엘크"}, 41:{name:"아메리카 오소리"}, 42:{name:"회색늑대"}, 43:{name:"팀버늑대"},
      44:{name:"로키 산 큰뿔 숫양"}, 45:{name:"로키 산 큰뿔양"}, 46:{name:"캘리포니아 계곡 코요테"}, 47:{name:"흰꼬리 수사슴"},
      48:{name:"흰꼬리 사슴"}, 49:{name:"야생 멧돼지"}, 50:{name:"아메리카 들소"}, 51:{name:"아메리카 영양 수컷"},
      52:{name:"아메리카 영양 암컷"}, 53:{name:"아메리카 흑곰"}, 54:{name:"아메리카 비버"}, 55:{name:"북아메리카 라쿤"},
      56:{name:"아메리카 붉은여우"}, 57:{name:"아메리카 회색여우"}, 58:{name:"은여우"}, 59:{name:"줄무늬스컹크"},
      60:{name:"버지니아 주머니쥐"}, 61:{name:"아메리카 사향쥐"}, 62:{name:"서부 수컷 무스"}, 63:{name:"서부 무스"},
      64:{name:"회색곰"}, 65:{name:"검은꼬리잭토끼"}, 77:{name:"테카 악어"}, 78:{name:"나이트 비버"}, 79:{name:"타탄카 들소"},
      80:{name:"섀도 수사슴"}, 81:{name:"사파 쿠거"}, 82:{name:"미드나이트 포 코요테"}, 83:{name:"카타타 엘크"},
      84:{name:"오닉스 늑대"}, 85:{name:"나이트워커 팬서"}, 86:{name:"루틸 큰뿔 숫양"}, 87:{name:"나이트 무스"},
      88:{name:"문 비버"}, 89:{name:"위냔 들소"}, 90:{name:"스노우 수사슴"}, 91:{name:"이구가 쿠거"}, 92:{name:"밀크 코요테"},
      93:{name:"이나메 엘크"}, 94:{name:"문스톤 늑대"}, 95:{name:"고스트 팬서"}, 96:{name:"개브로 큰뿔 숫양"},
      97:{name:"스노우플레이크 무스"}, 98:{name:"썬 악어"}, 99:{name:"띠 악어"}, 100:{name:"페이타 들소"},
      101:{name:"왁파 멧돼지"}, 102:{name:"레드 스트릭 코요테"}, 103:{name:"오줄라 엘크"}, 104:{name:"에메랄드 늑대"},
      105:{name:"리지백 스피릿 곰"}, 106:{name:"골든 스피릿 곰"}, 107:{name:"지지 비버"}, 108:{name:"코기 멧돼지"},
      109:{name:"루디 무스"}, 110:{name:"오위자 곰"}, 111:{name:"이카히 멧돼지"}, 112:{name:"머드 러너 수사슴"},
      113:{name:"마자 쿠거"}, 114:{name:"오타 여우"}, 115:{name:"마블 여우"}, 116:{name:"크로스 여우"},
      117:{name:"이왁타 팬서"}, 118:{name:"초크 큰뿔 숫양"}
    }
  };
})(typeof window !== "undefined" ? window : this);
