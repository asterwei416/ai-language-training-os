export interface Chunk {
  text: string;
  label: string;        // 語法功能標籤，e.g. "S-V 主幹", "時間", "原因"
  explanation: string;  // 詳細說明這個意群的語法邏輯
}

export interface PatternExample {
  en: string;
  zh: string;
}

export interface SentencePattern {
  skeleton: string;       // 句型骨架，用 ___ 代表填空
  function: string;       // 這個句型的溝通功能
  examples: PatternExample[]; // 2–3 個變化例句
}

export interface LessonSentence {
  id: number;
  original: string;
  translation: string;
  chunks: Chunk[];
  pattern?: SentencePattern; // 只有值得複利的句子才有
}

export interface Lesson {
  id: string;
  topic: string;
  topicEn: string;
  level: 'B1' | 'B2';
  sentences: LessonSentence[];
}

// ─── 課程資料 ────────────────────────────────────────────────────────────────

export const LESSONS: Lesson[] = [
  {
    id: 'career-first-lead',
    topic: '第一次帶領專案',
    topicEn: 'Leading a Project for the First Time',
    level: 'B2',
    sentences: [
      {
        id: 1,
        original: 'Last year, I was asked to lead a project for the first time.',
        translation: '去年，我第一次被委以帶領一個專案的任務。',
        chunks: [
          { text: 'Last year,', label: '時間', explanation: '「Last year」是時間副詞片語，放在句首用來設定整句的時間背景。英文常把時間放開頭，讓聽者先有時間定位，再聽主要事件。' },
          { text: 'I was asked to lead a project', label: 'S-V 主幹（被動）', explanation: '「was asked to + 動詞」是被動語態，表示這件事是由別人決定的、加諸在「我」身上的。強調的是「被指派」這個動作，而非是誰指派的。這是職場英文很常見的說法，比直接說「my boss told me to」更正式、更客觀。' },
          { text: 'for the first time.', label: '補充', explanation: '「for the first time」是強調的副詞片語，說明這是初次經驗。放句尾是為了把重點留在最後，語氣上有種「這對我來說意義重大」的感覺。' },
        ],
      },
      {
        id: 2,
        original: "At first, I wasn't sure if I was ready for that kind of responsibility.",
        translation: '一開始，我不確定自己是否準備好扛起這樣的責任。',
        chunks: [
          { text: 'At first,', label: '背景', explanation: '「At first」是時間副詞片語，表示「在剛開始的階段」，暗示後來情況有所改變。說話者用它來設定一個「當初的心理狀態」，讓聽者預期接下來會有轉折。' },
          { text: "I wasn't sure", label: 'S-V 主幹', explanation: '「wasn't sure」用過去式，表示當時的不確定感。注意這裡不說「I didn't know」，而是「wasn't sure」，後者更細膩，帶有猶豫、掙扎的感覺，而不只是單純「不知道」。' },
          { text: 'if I was ready', label: '條件子句', explanation: '「if + 子句」在這裡不是假設句，而是表示「是否……」的間接問句，作為 wasn't sure 的受詞。等於在問自己：我準備好了嗎？這個結構非常口語自然。' },
          { text: 'for that kind of responsibility.', label: '補充', explanation: '「that kind of responsibility」中的 that 帶有指示作用，暗示說話者心裡很清楚是哪種責任，不需要說清楚，因為前後文已經建立了脈絡。這讓句子讀起來更像真實的口語，而不是刻意解釋。' },
        ],
        pattern: {
          skeleton: "I wasn't sure if I was ready for ___",
          function: '表達對某件事的不確定或猶豫，適合描述挑戰前的心理狀態',
          examples: [
            { en: "I wasn't sure if I was ready for the interview.", zh: '我不確定自己是否準備好面試了。' },
            { en: "I wasn't sure if I was ready for living alone.", zh: '我不確定自己是否準備好一個人住了。' },
          ],
        },
      },
      {
        id: 3,
        original: 'I spent the first week trying to understand what the team actually needed.',
        translation: '第一週我一直在摸索，想搞清楚團隊真正需要的是什麼。',
        chunks: [
          { text: 'I spent the first week', label: 'S-V 主幹 + 時間', explanation: '「spent + 時間」是英文表達「把時間花在某事上」的核心句型。注意主詞是 I，動詞是 spent，時間「the first week」是受詞，整個結構說明了這段時間的投入程度。' },
          { text: 'trying to understand', label: '目的', explanation: '「trying to + 動詞」是現在分詞片語，附著在前面的動作上，說明「花這段時間在做什麼」。這裡沒有用 in order to，因為 trying 本身就帶有「努力嘗試」的意涵，更口語、更有人味。' },
          { text: 'what the team actually needed.', label: '受詞子句', explanation: '「what + 子句」是名詞子句，作為 understand 的受詞。「actually」這個副詞是關鍵——它暗示表面上說的需求和真正的需求之間可能有落差，帶出了一種「深入觀察」的態度。' },
        ],
        pattern: {
          skeleton: 'I spent ___ trying to understand ___',
          function: '描述把某段時間投入在釐清或摸索某件事上，常用於回顧過程',
          examples: [
            { en: 'I spent the whole morning trying to understand the contract.', zh: '我花了整個早上想搞懂那份合約。' },
            { en: 'She spent weeks trying to understand why the system kept failing.', zh: '她花了好幾個禮拜想弄清楚系統為什麼一直出問題。' },
          ],
        },
      },
      {
        id: 4,
        original: 'Once I had a clear picture, I started breaking the work into smaller steps.',
        translation: '一旦心裡有了清晰的方向，我就開始把工作拆成比較小的步驟。',
        chunks: [
          { text: 'Once I had a clear picture,', label: '條件 / 時間', explanation: '「Once + 子句」表示「一旦……就……」，強調某個條件達成後立即觸發的行動。「a clear picture」是慣用說法，意思是對全局有了清楚的掌握，比說「once I understood everything」更生動、更有畫面感。' },
          { text: 'I started breaking the work', label: 'S-V 主幹', explanation: '「started + 動名詞」表示開始進行一個動作。「breaking the work」中的 breaking 有「分解、打散」的意思，這裡不說 dividing 或 splitting，是因為 break 帶有「把大塊打碎」的力道感，更口語。' },
          { text: 'into smaller steps.', label: '方式', explanation: '「into + 名詞」表示轉化的結果，說明「分解之後變成什麼」。「smaller steps」中的 smaller 是比較級，暗示原來的步驟太大了，需要縮小到可執行的程度。' },
        ],
        pattern: {
          skeleton: 'Once I had ___, I started ___',
          function: '表示某個條件或準備完成後立刻採取行動，強調「等到準備好才動手」的邏輯',
          examples: [
            { en: 'Once I had the budget approved, I started hiring.', zh: '一旦預算核准了，我就開始招人。' },
            { en: 'Once I had enough savings, I started planning the trip.', zh: '一旦存夠了錢，我就開始規劃旅程。' },
          ],
        },
      },
      {
        id: 5,
        original: 'We held short meetings every morning so everyone stayed on the same page.',
        translation: '我們每天早上開個短會，確保大家的認知都在同一條線上。',
        chunks: [
          { text: 'We held short meetings every morning', label: 'S-V 主幹 + 時間', explanation: '「held meetings」而不是「had meetings」或「did meetings」——hold 是開會的標準動詞，更正式。「short meetings」強調效率，「every morning」說明這是固定慣例，不是偶發行為。' },
          { text: 'so everyone stayed', label: '結果', explanation: '「so + 子句」在這裡表示目的或結果。注意不是 so that，口語中常省略 that。stayed 用過去式延續型，表示這個狀態需要被維持，不是一次性的結果。' },
          { text: 'on the same page.', label: '補充（慣用語）', explanation: '「on the same page」是英文超常用的慣用語，字面是「在同一頁」，實際意思是「對某件事有相同的理解和認知」。這句話在職場、團隊溝通中出現頻率極高，值得直接記起來作為整塊使用。' },
        ],
        pattern: {
          skeleton: 'We ___ every ___ so everyone stayed on the same page.',
          function: '描述為了讓團隊保持資訊同步而採取的固定做法',
          examples: [
            { en: 'We sent a summary email every Friday so everyone stayed on the same page.', zh: '我們每週五發一封摘要信，確保大家都掌握最新狀況。' },
            { en: 'We checked in briefly every afternoon so everyone stayed on the same page.', zh: '我們每天下午簡短確認一次，讓大家的進度保持一致。' },
          ],
        },
      },
      {
        id: 6,
        original: 'When problems came up, I tried to stay calm and focus on solutions.',
        translation: '每次出問題，我都盡量保持冷靜，把注意力放在怎麼解決上。',
        chunks: [
          { text: 'When problems came up,', label: '時間 / 條件', explanation: '「came up」是「出現、發生（問題）」的慣用說法，比 happened 或 occurred 更口語自然。「when」在這裡雖然是時間連接詞，但有條件語氣——每次當問題發生，就會觸發後面的行動。' },
          { text: 'I tried to stay calm', label: 'S-V 主幹', explanation: '「tried to + 動詞」不只是「嘗試」，還帶有「努力去做」的意思，暗示這件事並不容易，需要刻意為之。「stay calm」是「保持冷靜」的固定搭配，stay + 形容詞 這個結構在英文中非常常見（stay focused, stay positive 等）。' },
          { text: 'and focus on solutions.', label: '並列動作', explanation: '用 and 連接兩個並列的不定詞（to stay / to focus），說明「試著做的」是兩件事。「focus on solutions」而不是「think about how to solve it」——前者更簡潔有力，也是職場英文中的高頻表達。' },
        ],
      },
      {
        id: 7,
        original: 'There were days when I felt completely lost, but I kept going anyway.',
        translation: '有些日子真的不知道自己在幹嘛，但還是硬撐著走下去。',
        chunks: [
          { text: 'There were days', label: 'S-V 主幹', explanation: '「There were days」是英文表達「有些日子……」的固定句型，用存在句（there be）加上複數名詞 days，語氣上比 Sometimes 更有畫面感，讓聽者想像那些特定的時刻。' },
          { text: 'when I felt completely lost,', label: '關係子句', explanation: '「when」在這裡是關係副詞，修飾前面的 days，說明是「哪種日子」。「completely lost」是程度強烈的形容詞組，completely 加強了 lost（迷失、不知所措）的程度，表達一種徹底的困惑感。' },
          { text: 'but I kept going anyway.', label: '對比', explanation: '「kept going」是「持續前進」的口語說法，go 在這裡不是字面的走路，而是「繼續做這件事」。「anyway」是關鍵詞，表示「儘管如此、還是」——它把前面的困難和後面的堅持連起來，帶出一種「雖然很難但還是撐下去了」的語氣。' },
        ],
        pattern: {
          skeleton: 'There were days when I felt ___, but I kept going anyway.',
          function: '坦誠說出過程中的低潮，同時表達面對困難仍然堅持的態度',
          examples: [
            { en: 'There were days when I felt like quitting, but I kept going anyway.', zh: '有些日子我真的想放棄，但還是撐下去了。' },
            { en: 'There were days when I felt invisible at work, but I kept going anyway.', zh: '有些日子在工作上覺得自己完全被忽視，但還是繼續做了。' },
          ],
        },
      },
      {
        id: 8,
        original: 'My manager reminded me that making mistakes was part of the learning process.',
        translation: '我的主管提醒我，犯錯本來就是學習過程的一部分。',
        chunks: [
          { text: 'My manager reminded me', label: 'S-V 主幹', explanation: '「reminded me」是「提醒某人」的用法，remind + 人 + that/to。這個動詞帶有「重申某個已知但容易忘記的道理」的意思，比 told me 更有「點醒」的感覺。' },
          { text: 'that making mistakes', label: '受詞子句（主詞）', explanation: '「that + 子句」是 reminded 的受詞子句，表示被提醒的內容。「making mistakes」是動名詞片語，在子句中作主詞——英文用動名詞當主詞非常自然，等於中文說「犯錯這件事……」。' },
          { text: 'was part of the learning process.', label: '受詞子句（述語）', explanation: '「part of the learning process」是「學習過程的一部分」，the learning process 用定冠詞 the，暗示這是一個普遍認知的過程，不需要解釋。整句的重點在於「犯錯 = 學習的一環，不是失敗」，這個觀念本身值得記住。' },
        ],
        pattern: {
          skeleton: '___ reminded me that ___ was part of the ___.',
          function: '引用別人說過的話來強化某個觀點，或轉述自己被點醒的道理',
          examples: [
            { en: 'A book reminded me that rest was part of the process.', zh: '一本書提醒了我，休息本來就是過程的一部分。' },
            { en: 'She reminded me that failure was part of growth.', zh: '她提醒我，失敗本來就是成長的一部分。' },
          ],
        },
      },
      {
        id: 9,
        original: 'By the end of the project, the team had built something we were all proud of.',
        translation: '專案結束時，團隊做出了一個讓我們都很驕傲的成果。',
        chunks: [
          { text: 'By the end of the project,', label: '時間', explanation: '「By the end of + 名詞」表示「在……結束之前 / 到……結束時」，強調一個時間節點。注意是 by（截止點），不是 at the end of——兩者語感相近，但 by 更強調「到那個時間點已經完成了」。' },
          { text: 'the team had built something', label: 'S-V 主幹（完成式）', explanation: '「had built」是過去完成式，表示在某個過去時間點之前已經完成的動作。這裡配合「By the end of」使用，說明在專案結束這個時間點，成果已經建立好了。「something」故意模糊，後面再用關係子句具體說明是什麼樣的 something。' },
          { text: 'we were all proud of.', label: '關係子句', explanation: '這是省略了關係代詞 that 的關係子句（that we were all proud of），修飾前面的 something。「proud of」是「為……感到驕傲」的固定搭配，注意介詞是 of。「all」放在 we 和 proud 之間，強調是所有人共同的感受。' },
        ],
      },
      {
        id: 10,
        original: 'Looking back, I realize that leading people taught me more than I expected.',
        translation: '回頭看，才發現帶人這件事教了我比想像中多更多的東西。',
        chunks: [
          { text: 'Looking back,', label: '背景（分詞片語）', explanation: '「Looking back」是分詞片語，用來表達「回顧過去」這個動作。它沒有主詞，因為和主句共用同一個主詞（I）。這是英文常見的句型，放在句首帶出反思或總結的語氣，比說「When I look back」更簡潔、更有文學感。' },
          { text: 'I realize that leading people', label: 'S-V 主幹 + 受詞子句主詞', explanation: '「realize that + 子句」表示「意識到某件事」，帶有一種「現在才明白」的頓悟感。注意用現在式 realize，不是過去式——因為這個體悟是從過去延伸到現在仍然有效的認知。「leading people」是動名詞片語，在 that 子句中作主詞。' },
          { text: 'taught me more than I expected.', label: '受詞子句述語', explanation: '「taught me more than I expected」說明「教了我超出預期的東西」。「more than I expected」是比較結構，expected 後面省略了 it would，完整是 more than I expected it would。這種省略在口語中非常自然。' },
        ],
        pattern: {
          skeleton: 'Looking back, I realize that ___ taught me more than I expected.',
          function: '用來做經驗總結，表達某段經歷帶來的意外收穫或領悟',
          examples: [
            { en: 'Looking back, I realize that traveling alone taught me more than I expected.', zh: '回頭看，才發現一個人旅行教了我很多意想不到的事。' },
            { en: 'Looking back, I realize that failing that exam taught me more than I expected.', zh: '回頭看，才發現那次考試不及格反而教了我更多。' },
          ],
        },
      },
    ],
  },
  {
    id: 'travel-solo-first',
    topic: '第一次獨自旅行',
    topicEn: 'My First Solo Trip',
    level: 'B1',
    sentences: [
      {
        id: 1,
        original: 'A few years ago, I decided to travel alone for the very first time.',
        translation: '幾年前，我決定第一次一個人出去旅行。',
        chunks: [
          { text: 'A few years ago,', label: '時間', explanation: '「A few years ago」是時間副詞片語，放句首設定故事發生的時間點。注意它比 recently（最近）更遙遠，又比 long ago（很久以前）更近，帶出一種回憶往事的語氣。' },
          { text: 'I decided to travel alone', label: 'S-V 主幹', explanation: '「decided to + 動詞」表達主動做出的決定，暗示這不是被安排的，而是自己選擇的。「travel alone」中 alone 是副詞，修飾動詞，說明旅行的方式——一個人。' },
          { text: 'for the very first time.', label: '補充', explanation: '「for the very first time」和 for the first time 意思相同，但加了 very 後語氣更強烈，帶出「這真的是頭一遭」的強調感。放在句尾是為了讓重點落在「初次」這個事實上。' },
        ],
      },
      {
        id: 2,
        original: 'I chose a small city in Japan because I had always wanted to go there.',
        translation: '我選了日本一個小城市，因為那是我一直很想去的地方。',
        chunks: [
          { text: 'I chose a small city in Japan', label: 'S-V 主幹 + 地點', explanation: '「chose」是 choose 的過去式，表示從多個選項中選出這個。「a small city in Japan」刻意不說城市名字，帶出一種親密的、旅人的口吻——不是去東京這種大地方，而是某個不起眼的小地方。' },
          { text: 'because I had always wanted', label: '原因', explanation: '「had always wanted」是過去完成式，說明在做出選擇之前，這個渴望就已經存在很久了。always 強調這個想法由來已久，不是臨時起意。這個句型在說明動機時非常有說服力。' },
          { text: 'to go there.', label: '目的（不定詞）', explanation: '「to go there」是不定詞片語，補充說明 wanted 的內容——想做的具體行動。注意 there 代替了前面提到的地點，避免重複，讓句子更流暢。' },
        ],
        pattern: {
          skeleton: 'I chose ___ because I had always wanted to ___.',
          function: '說明做某個選擇的原因，強調這是長久以來的心願，終於付諸行動',
          examples: [
            { en: 'I chose that university because I had always wanted to study abroad.', zh: '我選了那所大學，因為我一直想出國唸書。' },
            { en: 'I chose the window seat because I had always wanted to see the clouds up close.', zh: '我選了靠窗的位置，因為我一直想近距離看雲。' },
          ],
        },
      },
      {
        id: 3,
        original: 'At the airport, I realized I had packed way too many things.',
        translation: '到了機場才發現，我帶的東西多到誇張。',
        chunks: [
          { text: 'At the airport,', label: '地點', explanation: '「At the airport」是地點副詞片語，放句首交代場景。機場是旅程真正開始的地方，這個場景轉換讓讀者感受到故事正在推進。' },
          { text: 'I realized', label: 'S-V 主幹', explanation: '「realized」暗示一種「才意識到」的頓悟感——不是一直都知道，而是到了某個時間點才發現。這個動詞帶出輕微的自嘲語氣，比直接說「I noticed」更有反思的味道。' },
          { text: 'I had packed way too many things.', label: '受詞子句', explanation: '「had packed」是過去完成式，說明打包行李這件事發生在「發現」之前。「way too many」中的 way 是口語強調詞，相當於中文「超級、根本」，讓語氣更誇張自然。' },
        ],
      },
      {
        id: 4,
        original: 'When I arrived, I spent the first hour just walking around without a plan.',
        translation: '抵達之後，我漫無目的地走了一個小時，完全沒有計畫。',
        chunks: [
          { text: 'When I arrived,', label: '時間', explanation: '「When + 子句」是時間連接詞，說明兩個動作的先後順序——先抵達，再花時間閒逛。放句首讓讀者先跟上時序，再接收主要動作。' },
          { text: 'I spent the first hour', label: 'S-V 主幹', explanation: '「spent + 時間」是「把時間花在某件事上」的核心句型。「the first hour」特別說是第一個小時，帶出一種「剛到還沒搞清楚方向」的新鮮感和混亂感。' },
          { text: 'just walking around without a plan.', label: '方式', explanation: '「just + 動名詞」中的 just 表示「僅僅、只是」，降低了動作的嚴肅性，帶出輕鬆漫無目的的感覺。「without a plan」直接說出沒有計畫，讓整個意群傳遞一種自由但也有點茫然的旅人狀態。' },
        ],
        pattern: {
          skeleton: 'I spent the first ___ just ___ing without a plan.',
          function: '描述剛開始某件事時，漫無目的地摸索的狀態',
          examples: [
            { en: 'I spent the first morning just wandering around without a plan.', zh: '第一個早上我就這樣漫無目的地到處晃。' },
            { en: 'I spent the first week just exploring the neighborhood without a plan.', zh: '第一週我就在附近到處逛逛，完全沒有計畫。' },
          ],
        },
      },
      {
        id: 5,
        original: 'A local woman saw me looking lost and offered to show me the way.',
        translation: '一個當地女生看我一臉迷路的樣子，主動說要帶我去。',
        chunks: [
          { text: 'A local woman', label: '主詞', explanation: '「A local woman」用不定冠詞 a，說明這是一個陌生人，說話者事先不認識她。local 強調她是當地人，給她帶路的行為增添了真實的溫度感。' },
          { text: 'saw me looking lost', label: 'V + 受詞補語', explanation: '「saw + 受詞 + 現在分詞」是感官動詞的固定結構，表示「看到某人正在做某事」。looking lost 是「看起來一臉迷路」，注意這裡不是 saw me lost（狀態），而是 looking lost（動態觀察），更生動。' },
          { text: 'and offered to show me the way.', label: '並列動作', explanation: '「offered to + 動詞」表示主動提出要做某事，不是被要求的。這個動詞非常重要——它說明這位女生的善意是主動的。「show someone the way」是「帶路、指路」的固定說法。' },
        ],
      },
      {
        id: 6,
        original: 'We ended up having coffee together and talking for almost two hours.',
        translation: '結果我們一起喝咖啡，聊了將近兩個小時。',
        chunks: [
          { text: 'We ended up having coffee together', label: 'S-V 主幹（慣用語）', explanation: '「ended up + 動名詞」是英文超常用的慣用語，表示「最終結果是……」，帶有一種「事情發展超出預期」的語感。原本只是被帶路，最後竟然一起喝咖啡——这個轉折感正是 ended up 的妙用。' },
          { text: 'and talking', label: '並列動作', explanation: '用 and 並列第二個動名詞 talking，說明「喝咖啡」和「聊天」是同時進行的兩件事。英文並列動名詞時可以省略第二個動名詞前的 having，直接接 and talking，讀起來更流暢。' },
          { text: 'for almost two hours.', label: '時間長度', explanation: '「for + 時間長度」表示持續了多久。「almost two hours」用 almost（將近）而不是 nearly，語氣上更自然口語。這個時間長度帶出一種「沒想到聊這麼久」的驚喜感。' },
        ],
        pattern: {
          skeleton: 'We ended up ___ing together for almost ___.',
          function: '描述原本沒有預期的結果——某件事自然而然地發生並延伸下去',
          examples: [
            { en: 'We ended up talking together for almost three hours.', zh: '我們竟然聊了將近三個小時。' },
            { en: 'We ended up cooking together for almost the whole afternoon.', zh: '我們結果一起做菜，做了幾乎整個下午。' },
          ],
        },
      },
      {
        id: 7,
        original: "That evening, I sat by the river and thought about how far I'd come.",
        translation: '那天傍晚，我坐在河邊，想著自己走了多遠的路。',
        chunks: [
          { text: 'That evening,', label: '時間', explanation: '「That evening」用 that（那天晚上）而不是 the evening，帶有一種回憶特定時刻的語感，像是在說「就是那個傍晚，那個我記得很清楚的傍晚」。' },
          { text: 'I sat by the river', label: 'S-V 主幹 + 地點', explanation: '「sat by the river」是靜態場景描述，「by the river」表示「在河邊」，這個畫面感很強——一個人靜靜坐在水邊，自然引出後面的內省動作。' },
          { text: "and thought about how far I'd come.", label: '並列動作 + 受詞子句', explanation: '「thought about + 疑問詞子句」表示「想著……」。「how far I\'d come」字面是「我已經走了多遠」，但 come 在這裡是隱喻，指人生或成長歷程。「I\'d come」是 I had come 的縮寫，過去完成式，表示那個時間點之前的積累。這是英文中表達人生反思的高質量說法。' },
        ],
      },
      {
        id: 8,
        original: 'Traveling alone taught me to rely on myself in ways I never had before.',
        translation: '一個人旅行讓我學會了依靠自己，那種程度是以前從來沒有過的。',
        chunks: [
          { text: 'Traveling alone', label: '主詞（動名詞）', explanation: '「Traveling alone」是動名詞片語作主詞，把一個行為當成主角來描述它帶來的影響。用動名詞主詞讓句子更有哲學性，比說「My solo trip taught me...」更抽象、更有普遍性。' },
          { text: 'taught me to rely on myself', label: 'V + 受詞 + 不定詞', explanation: '「taught + 人 + to + 動詞」是「教某人去做某事」的固定結構。「rely on myself」是「依靠自己」，on 是固定介詞搭配，不能換成其他介詞。這個結構說明旅行本身就像一位老師。' },
          { text: 'in ways I never had before.', label: '關係子句', explanation: '「in ways I never had before」是省略了 that 的關係子句，修飾 in ways（以某種方式）。這個片語的精妙在於它不具體說是哪種方式，而是讓聽者自行想像——一種超越以往所有經驗的、全新的依靠自己的感受。' },
        ],
        pattern: {
          skeleton: '___ taught me to ___ in ways I never had before.',
          function: '描述某段經歷帶來前所未有的深刻學習，強調這是一種質的突破',
          examples: [
            { en: 'Living alone taught me to manage money in ways I never had before.', zh: '一個人生活教會了我管理金錢，那種深度是以前沒有過的。' },
            { en: 'That project taught me to communicate in ways I never had before.', zh: '那個專案讓我學會了溝通，程度是以前從來沒有達到過的。' },
          ],
        },
      },
      {
        id: 9,
        original: 'By the last day, I felt more confident than when I had first arrived.',
        translation: '到了最後一天，我比剛到的時候自信多了。',
        chunks: [
          { text: 'By the last day,', label: '時間', explanation: '「By the last day」表示「到了最後一天」，強調一個時間節點上的狀態。By 帶有「截至某時間點已經發生」的意涵，暗示這種自信是在整個旅程中逐漸累積起來的。' },
          { text: 'I felt more confident', label: 'S-V 主幹（比較級）', explanation: '「felt more confident」是感知動詞 feel + 形容詞比較級。注意用 felt（過去式），因為這是當時的主觀感受。more confident 比較的是「現在的我」和「過去的我」，沒有比較對象，後面用 than 子句補充。' },
          { text: 'than when I had first arrived.', label: '比較基準', explanation: '「than when + 過去完成式」是比較句型，說明比較的基準時間點。「had first arrived」用過去完成式，強調到達是更早發生的事，而現在（最後一天）的自信是在那之後逐漸建立起來的。' },
        ],
      },
      {
        id: 10,
        original: 'I came home knowing that I could handle more than I thought I could.',
        translation: '回家的時候，我知道自己能承擔的比原本以為的多。',
        chunks: [
          { text: 'I came home knowing', label: 'S-V 主幹 + 分詞補語', explanation: '「came home knowing」中的 knowing 是現在分詞，表示「帶著某種認知回家」。分詞補語說明回家時的心理狀態，和動作同時發生。這個結構比說「when I came home, I knew that...」更緊湊、更有力。' },
          { text: 'that I could handle more', label: '受詞子句', explanation: '「that + 子句」是 knowing 的受詞，表示「知道的內容」。「handle more」的 more 故意不具體，帶出一種「超乎預期的承擔能力」——更多事、更多壓力、更多未知，都能應付。' },
          { text: 'than I thought I could.', label: '比較子句', explanation: '「than I thought I could」是比較子句，後面省略了 handle，完整是 than I thought I could handle。這種省略在英文口語中非常自然，且避免了重複。整句的意思是：現實中的自己比想像中的自己更有能力。' },
        ],
        pattern: {
          skeleton: 'I came home knowing that I could ___ more than I thought I could.',
          function: '描述經歷結束後帶回的自我認知升級——發現自己比預期更有能力',
          examples: [
            { en: 'I came home knowing that I could survive more than I thought I could.', zh: '回家的時候，我知道自己能撐過去的事情比原本以為的多。' },
            { en: 'I came home knowing that I could communicate more than I thought I could.', zh: '回家後我才明白，我溝通的能力比自己以為的強多了。' },
          ],
        },
      },
    ],
  },
  {
    id: 'life-new-city',
    topic: '搬到新城市',
    topicEn: 'Starting Over in a New City',
    level: 'B1',
    sentences: [
      {
        id: 1,
        original: 'Moving to a new city was one of the hardest decisions I ever made.',
        translation: '搬到一個新城市，是我這輩子做過最難的決定之一。',
        chunks: [
          { text: 'Moving to a new city', label: '主詞（動名詞）', explanation: '「Moving to a new city」是動名詞片語作主詞，把「搬家」這個行為當成句子的主角。動名詞主詞在英文中有一種「把某件事提出來評論」的效果，讓聽者先聚焦在這件事上，再聽說話者對它的評價。' },
          { text: 'was one of the hardest decisions', label: 'S-V 主幹', explanation: '「one of the + 最高級 + 複數名詞」是英文非常常見的說法，表示「其中一個最……的……」。注意名詞要用複數（decisions），因為說的是「眾多決定中最難的那一個」。這個結構讓評價顯得謙遜而真實，而不是誇張地說「the hardest decision ever」。' },
          { text: 'I ever made.', label: '關係子句', explanation: '這是省略了 that 的關係子句（that I ever made），修飾前面的 decisions。「ever」在這裡是強調詞，意思是「我這輩子」，帶出一種人生回顧的沉重感。' },
        ],
      },
      {
        id: 2,
        original: 'I left behind my family, my friends, and everything I was used to.',
        translation: '我把家人、朋友，還有所有熟悉的一切全都留在了身後。',
        chunks: [
          { text: 'I left behind', label: 'S-V 主幹（動詞片語）', explanation: '「left behind」是動詞片語，意思是「把……留在後面、拋在身後」。比單純說 I left 多了一層「刻意或被迫放下某些珍貴之物」的含義。這個片語帶有情感重量，暗示留下的東西是重要的。' },
          { text: 'my family, my friends,', label: '並列受詞', explanation: '用三重並列（my family, my friends, and everything）逐步擴大說明放棄的東西。每個受詞前面都有 my，強調這些都是屬於自己的、私人的、有感情的事物，而不只是抽象的「東西」。' },
          { text: 'and everything I was used to.', label: '並列受詞 + 關係子句', explanation: '「everything I was used to」是「所有我習慣了的事物」。was used to + 名詞/動名詞 表示「習慣某件事」，和 be used to do（被用來做）是不同結構。這裡的 everything 讓整句達到情感的高點——不只是人，還有所有生活的一切。' },
        ],
      },
      {
        id: 3,
        original: 'The first apartment I found was small, noisy, and nothing like home.',
        translation: '我找到的第一間公寓又小又吵，跟家完全不是一回事。',
        chunks: [
          { text: 'The first apartment I found', label: '主詞 + 關係子句', explanation: '「The first apartment I found」中，I found 是省略了 that 的關係子句，修飾 apartment。用 the first 強調這是初抵新城市找到的第一個落腳處，帶出一種帶著期待卻有點失望的語氣。' },
          { text: 'was small, noisy,', label: 'S-V 主幹（並列形容詞）', explanation: '用逗號並列形容詞 small, noisy 是英文描述多個特徵的常見方式，比用 and 連接更有節奏感，讀起來有點像在數落一件件令人失望的事。' },
          { text: 'and nothing like home.', label: '對比補語', explanation: '「nothing like home」字面是「完全不像家」，是 be nothing like 這個固定用法，表示兩件事毫無相似之處。這個短句放在最後，是情感的轉折——前兩個缺點都是物理的（小、吵），最後一個是情感上的失落：它讓你感受不到家的感覺。' },
        ],
      },
      {
        id: 4,
        original: "For the first few weeks, I didn't really know how to fill my evenings.",
        translation: '頭幾個禮拜，我根本不知道晚上要幹嘛，整個人很空虛。',
        chunks: [
          { text: 'For the first few weeks,', label: '時間', explanation: '「For the first few weeks」表示一段持續的時間，說明這種迷失感不是一天的事，而是持續了幾個禮拜。for + 時間長度 在英文中表示「持續……之久」，強調這個狀態的延伸性。' },
          { text: "I didn't really know", label: 'S-V 主幹', explanation: '「didn\'t really know」中的 really 是弱化否定的副詞，帶出一種「並非完全不知道，但就是不確定、沒有方向感」的模糊感。比 didn\'t know 更口語、更真實地描述那種空虛的迷茫。' },
          { text: 'how to fill my evenings.', label: '受詞子句（疑問詞 + 不定詞）', explanation: '「how to + 動詞」是「如何做某事」的固定結構，作為受詞子句補充說明「不知道的內容」。「fill my evenings」是「打發晚上的時間」，fill 用在這裡帶出一種「時間空曠無聊需要被填滿」的孤獨感，比說「what to do at night」更有畫面。' },
        ],
      },
      {
        id: 5,
        original: 'I started going to a local café every morning just to feel less alone.',
        translation: '我開始每天早上去附近一間咖啡廳，只是為了不要感覺那麼孤單。',
        chunks: [
          { text: 'I started going to a local café', label: 'S-V 主幹 + 地點', explanation: '「started going to」說明這成了一個新習慣的開始，go 用動名詞形式表示反覆進行的動作。「a local café」不說具體名字，讓它更像一個普通的、任何人都能想像的街角咖啡廳。' },
          { text: 'every morning', label: '時間頻率', explanation: '「every morning」說明這不是偶發行為，而是每天的固定行程。重複的時間頻率帶出一種「為了生存而建立的小小儀式感」，讓人感受到孤獨生活中需要一個固定的錨點。' },
          { text: 'just to feel less alone.', label: '目的', explanation: '「just to + 動詞」中的 just 表示「僅僅只是、目的很簡單」，帶出一種坦誠的自我揭露——目的不是喝咖啡本身，而是「少一點孤獨感」。feel less alone（感覺不那麼孤單）比 feel connected（感覺有連結）更真實、更脆弱。' },
        ],
        pattern: {
          skeleton: 'I started ___ing every morning just to feel less ___.',
          function: '描述為了應對某種負面感受而主動建立的小習慣或儀式',
          examples: [
            { en: 'I started walking every morning just to feel less anxious.', zh: '我開始每天早上去散步，只是為了讓自己不那麼焦慮。' },
            { en: 'I started calling my mom every morning just to feel less homesick.', zh: '我開始每天早上打電話給媽媽，只是為了不那麼想家。' },
          ],
        },
      },
      {
        id: 6,
        original: 'After a while, the barista began to remember my order without me asking.',
        translation: '過了一段時間，那個咖啡師開始記得我點什麼，不用我開口了。',
        chunks: [
          { text: 'After a while,', label: '時間', explanation: '「After a while」是模糊的時間副詞片語，表示「過了一段時間之後」，不具體說是多久，帶出一種時間自然流逝的感覺。這個開頭方式常用於故事敘述，暗示情況正在慢慢改變。' },
          { text: 'the barista began to remember my order', label: 'S-V 主幹', explanation: '「began to + 動詞」表示某件事開始發生，帶有漸進的語感。barista 是咖啡師（義大利文借詞，現代英文常用），「remember my order」——記得我點什麼——是一個微小但充滿溫度的細節，象徵著被認識、被記住的感覺。' },
          { text: 'without me asking.', label: '方式', explanation: '「without + 受詞 + 動名詞」表示「不需要……就……」，這裡是「不用我開口就記得了」。這個結構很口語，without me asking 把「我不需要開口」這件事說得輕描淡寫，但背後的意涵卻很深——這個小小的改變，代表你開始被這個地方接納了。' },
        ],
      },
      {
        id: 7,
        original: 'Small moments like that made me feel like I was slowly becoming a local.',
        translation: '就是這種小事，讓我開始覺得自己慢慢變成了這裡的人。',
        chunks: [
          { text: 'Small moments like that', label: '主詞', explanation: '「Small moments」強調是微小的、日常的瞬間，like that（像那樣的）指回前一句說的小事（咖啡師記得我的點單）。這個主詞把一個具體事件提升成「某一類小事」，讓句子有更廣泛的適用感。' },
          { text: 'made me feel', label: 'V + 受詞補語', explanation: '「make + 受詞 + 動詞/形容詞」是「使某人感到……」的使役動詞結構。這裡 made me feel 後接 like 子句，說明那些小事引發的主觀感受。注意 feel 後面用 like，不是直接接形容詞。' },
          { text: 'like I was slowly becoming a local.', label: '比喻子句', explanation: '「like + 子句」表示「就好像……」，是口語中非常自然的比喻結構。「slowly becoming a local」——慢慢變成當地人——是 becoming 的進行式，強調這不是突然的轉變，而是一個緩慢的融入過程。local 在這裡當名詞用，指「當地人」。' },
        ],
        pattern: {
          skeleton: 'Small moments like that made me feel like I was slowly ___.',
          function: '用微小的日常細節來描述一種漸進式的心態轉變或適應過程',
          examples: [
            { en: 'Small moments like that made me feel like I was slowly fitting in.', zh: '就是那種小事，讓我慢慢感覺自己開始融入了。' },
            { en: 'Small moments like that made me feel like I was slowly building something real.', zh: '就是那些小事，讓我感覺自己在慢慢建立一些真實的東西。' },
          ],
        },
      },
      {
        id: 8,
        original: 'I joined a weekend hiking group and met people who became real friends.',
        translation: '我加入了一個週末爬山的社團，認識了後來真的變成朋友的人。',
        chunks: [
          { text: 'I joined a weekend hiking group', label: 'S-V 主幹', explanation: '「joined」強調這是一個主動採取的行動——不是被邀請的，而是自己去參加的。「a weekend hiking group」說明這是一個有固定時間、有共同活動的群體，這類型的社群特別容易建立真實連結。' },
          { text: 'and met people', label: '並列動作', explanation: '「met people」是加入後自然產生的結果，用 and 並列說明兩個動作有因果關係：因為加入了，所以認識了人。met 是 meet 的過去式，強調這是真實的、面對面的相遇。' },
          { text: 'who became real friends.', label: '關係子句', explanation: '「who became real friends」是關係子句，修飾前面的 people。「real friends」中的 real 是關鍵——強調不只是認識、打招呼，而是真正的朋友，帶出一種超出預期的驚喜感。' },
        ],
      },
      {
        id: 9,
        original: 'Six months later, the city started to feel less strange and more like mine.',
        translation: '六個月後，這個城市開始少了點陌生感，多了點像是我的地方的感覺。',
        chunks: [
          { text: 'Six months later,', label: '時間', explanation: '「Six months later」是具體的時間標記，說明這個變化不是立刻發生的，而是需要時間的。比起 after six months（之後），___ later 更像說故事的節奏，常見於口語敘述和書面回顧。' },
          { text: 'the city started to feel', label: 'S-V 主幹', explanation: '「the city started to feel」擬人化了城市——不是說話者改變了，而是城市「開始感覺到」有些不一樣。這個說法其實是說話者的主觀感知轉移到外部空間，是英文很有詩意的表達方式。' },
          { text: 'less strange and more like mine.', label: '比較補語', explanation: '「less ___ and more ___」是表達漸進轉變的對比結構，說明兩種感受此消彼長。「more like mine」中的 mine 是所有格代名詞，意思是「更像是屬於我的地方」，比說「more familiar」更有感情，帶出一種歸屬感。' },
        ],
        pattern: {
          skeleton: '___ started to feel less ___ and more like mine.',
          function: '描述對某個地方或狀況的感受逐漸從陌生轉化為歸屬感',
          examples: [
            { en: 'The office started to feel less intimidating and more like mine.', zh: '那個辦公室開始少了點壓力，多了點像是我自己地方的感覺。' },
            { en: 'The routine started to feel less forced and more like mine.', zh: '那套作息開始不那麼刻意，慢慢變得像是我自己的節奏。' },
          ],
        },
      },
      {
        id: 10,
        original: 'I still miss where I came from, but I no longer wish I had stayed.',
        translation: '我還是會想念原來的地方，但我不再希望當初沒有離開。',
        chunks: [
          { text: 'I still miss where I came from,', label: 'S-V 主幹 + 受詞子句', explanation: '「still miss」表示現在仍然持續的情感，說話者並沒有完全切割過去。「where I came from」是「我來自的地方」，是名詞子句，作 miss 的受詞。用 where I came from 而不是 my hometown，帶出更深層的「根源感」。' },
          { text: 'but I no longer wish', label: '對比 + S-V', explanation: '「no longer」表示「不再……」，和 still（仍然）形成了對比：仍然思念，但不再後悔。這是句子情感上最重要的轉折點。比起 I don\'t wish anymore，no longer 帶有更強烈的「心態轉化已完成」的語感。' },
          { text: 'I had stayed.', label: '受詞子句', explanation: '「wish + 過去完成式」是英文的虛擬語氣，表示「希望當初有/沒有做某事」，但現實是相反的。I wish I had stayed 的意思是「我希望當初留下來了（但我沒有）」，而這裡說的是「我不再這樣希望了」——意味著說話者已經接受並認可了當初的選擇。' },
        ],
        pattern: {
          skeleton: 'I still miss ___, but I no longer wish I had ___.',
          function: '承認對過去的留戀，同時表達已接受自己做的選擇，不再後悔',
          examples: [
            { en: 'I still miss my old job, but I no longer wish I had stayed.', zh: '我還是懷念以前的工作，但我不再希望當初沒有離開。' },
            { en: 'I still miss those days, but I no longer wish I had done things differently.', zh: '我還是想念那段時光，但我不再希望自己當時換個做法。' },
          ],
        },
      },
    ],
  },
  {
    id: 'social-new-people',
    topic: '在陌生場合認識新朋友',
    topicEn: 'Meeting Strangers at a Social Event',
    level: 'B1',
    sentences: [
      {
        id: 1,
        original: 'My friend dragged me to a party where I barely knew anyone.',
        translation: '朋友硬拉著我去一個派對，那裡我幾乎誰都不認識。',
        chunks: [
          { text: 'My friend dragged me to a party', label: 'S-V 主幹 + 地點', explanation: '「dragged me」是「硬拉著我去」的口語說法，drag 的字面意思是拖拉，這裡是比喻——朋友強烈慫恿、甚至帶有一點強迫的意味。比 brought me 或 invited me 更生動，帶出說話者的不情願。' },
          { text: 'where I barely knew anyone.', label: '關係子句', explanation: '「where + 子句」是關係副詞子句，修飾前面的 party，說明那個派對的狀況。「barely knew anyone」中的 barely 是「幾乎不……」的副詞，讓否定更加具體——不是完全不認識，而是「幾乎沒有認識的人」，這種程度感更真實。' },
        ],
      },
      {
        id: 2,
        original: 'I stood near the snack table for a while, pretending to be busy.',
        translation: '我在零食桌旁邊站了好一陣子，假裝自己很忙的樣子。',
        chunks: [
          { text: 'I stood near the snack table', label: 'S-V 主幹 + 地點', explanation: '「stood near the snack table」——站在零食桌旁邊——是社交場合中的典型「安全區域」，因為可以假裝在挑食物，不用跟人互動。這個細節讓場景極具畫面感，很多人都能感同身受。' },
          { text: 'for a while,', label: '時間長度', explanation: '「for a while」是「好一陣子」的模糊時間長度，不說具體多久，帶出一種「時間難熬」的感覺。它讓讀者感受到說話者在那邊站了不短的一段時間，尷尬而靜止。' },
          { text: 'pretending to be busy.', label: '伴隨狀態（分詞）', explanation: '「pretending to be busy」是現在分詞片語，表示站在那裡時同時進行的動作/狀態。pretend to + 動詞 意思是「假裝做某事」，這裡是假裝有事在忙，是一種非常真實的社交焦慮行為描述。' },
        ],
      },
      {
        id: 3,
        original: 'A guy next to me laughed and said he was doing exactly the same thing.',
        translation: '旁邊一個男生笑了出來，說他也在幹一樣的事。',
        chunks: [
          { text: 'A guy next to me laughed', label: 'S-V 主幹', explanation: '「A guy next to me」——旁邊的一個男生——用不定冠詞 a，說明是陌生人。「next to me」是後置修飾語，說明位置。整個意群建立了一個親密的偶然相遇——兩個陌生人同處一個空間，其中一個率先打破沉默。' },
          { text: 'and said', label: '並列動作', explanation: '「laughed and said」用 and 並列兩個動作，笑是自然反應，說話是主動行為。這個連接讓互動的開始顯得自然而不刻意——先笑，再說，是人際互動中最不尷尬的啟動方式。' },
          { text: 'he was doing exactly the same thing.', label: '受詞子句', explanation: '「he was doing exactly the same thing」是 said 的受詞子句，表示說的內容。「exactly the same thing」——完全一樣的事——中的 exactly 強調一致性，帶出一種「我也是！」的認同感，是建立即時連結的有效句型。' },
        ],
        pattern: {
          skeleton: 'He laughed and said he was doing exactly the same thing.',
          function: '描述兩個人因為共同的窘境或行為而產生共鳴，是破冰的常見語境',
          examples: [
            { en: 'She smiled and said she was feeling exactly the same way.', zh: '她笑了笑，說她也有完全一樣的感覺。' },
            { en: 'He nodded and said he was thinking exactly the same thing.', zh: '他點點頭，說他也在想完全一樣的事。' },
          ],
        },
      },
      {
        id: 4,
        original: 'We started talking about the food, and somehow the conversation kept going.',
        translation: '我們從聊食物聊起，不知不覺話題就一直延續下去。',
        chunks: [
          { text: 'We started talking about the food,', label: 'S-V 主幹', explanation: '「started talking about」說明對話以一個中性、安全的話題開始——食物。在陌生人之間，從眼前的具體事物聊起是最自然的切入點。talking about + 名詞 是「聊到某個話題」的固定說法。' },
          { text: 'and somehow', label: '轉折', explanation: '「somehow」是「不知怎地、莫名其妙地」，是表達意外發展的口語副詞。它放在 and 之後，帶出一種「不是我們刻意讓對話繼續，它就這樣自己延伸下去了」的驚喜感。這個詞非常適合描述自然發展的情況。' },
          { text: 'the conversation kept going.', label: '結果子句', explanation: '「kept going」是「持續進行」的慣用說法，go 在這裡是抽象的「繼續進行」，不是字面的走路。整個意群的精妙在於對話好像有了自己的生命——不需要努力維持，它就這樣一直延續下去。' },
        ],
        pattern: {
          skeleton: 'We started talking about ___, and somehow the conversation kept going.',
          function: '描述從一個小話題開始，對話自然地延伸下去的過程',
          examples: [
            { en: 'We started talking about the movie, and somehow the conversation kept going.', zh: '我們從聊那部電影聊起，不知不覺就一直聊下去了。' },
            { en: 'We started talking about work, and somehow the conversation kept going for hours.', zh: '我們從聊工作聊起，不知不覺聊了好幾個小時。' },
          ],
        },
      },
      {
        id: 5,
        original: 'He introduced me to a few of his friends, and they were all easy to talk to.',
        translation: '他把我介紹給他幾個朋友，大家都很好聊。',
        chunks: [
          { text: 'He introduced me to a few of his friends,', label: 'S-V 主幹', explanation: '「introduced me to」是「把我介紹給……」的固定用法，introduce + 人 + to + 人，注意介詞是 to，不是 for。「a few of his friends」而不是 his friends，說明不是全部，只是幾個，讓場景更自然、不誇張。' },
          { text: 'and they were all', label: '並列子句 S-V', explanation: '「they were all」用 all 強調「每一個人都」，而不是只有其中幾個。all 放在 be 動詞之後是英文的固定位置，不能說 they all were（雖然也能理解，但不標準）。' },
          { text: 'easy to talk to.', label: '形容詞補語', explanation: '「easy to talk to」是「容易聊天的、好說話的」，是 be easy to + 動詞 的形容詞結構。注意末尾的 to 不能省略，因為 talk 需要一個對象介詞（talk to someone）。這個說法比 friendly 更具體，描述的是一種互動品質。' },
        ],
      },
      {
        id: 6,
        original: 'By the middle of the night, I had completely forgotten that I was nervous.',
        translation: '到了半夜，我完全忘了自己一開始有多緊張。',
        chunks: [
          { text: 'By the middle of the night,', label: '時間', explanation: '「By the middle of the night」表示「到了半夜這個時間點」。By 的語感是「截至某時間點，某件事已經發生了」，暗示這個改變不是立刻的，而是在過了一段時間後才成真。' },
          { text: 'I had completely forgotten', label: 'S-V 主幹（完成式）', explanation: '「had completely forgotten」是過去完成式，說明「忘記緊張」這件事在「半夜到來」之前就已經發生了。completely 是強調詞，表示完全忘記、一點都不記得了，帶出一種沉浸在當下的放鬆感。' },
          { text: 'that I was nervous.', label: '受詞子句', explanation: '「that + 子句」是 forgotten 的受詞，說明忘記的內容。注意用 was nervous（過去式），因為緊張是當天剛開始時的狀態，到了半夜它已經是過去的事了。這個對比——從緊張到完全忘記緊張——正是整個故事的情感弧線。' },
        ],
        pattern: {
          skeleton: 'By the ___, I had completely forgotten that I was ___.',
          function: '描述隨著時間過去，某種負面的初始狀態或感受已完全消失',
          examples: [
            { en: 'By the end of the meeting, I had completely forgotten that I was anxious.', zh: '會議結束的時候，我完全忘了自己一開始有多焦慮。' },
            { en: 'By the second hour, I had completely forgotten that I was a beginner.', zh: '到了第二個小時，我完全忘了自己還是個初學者。' },
          ],
        },
      },
      {
        id: 7,
        original: "Before I left, I exchanged numbers with two people I'd genuinely enjoyed talking to.",
        translation: '離開前，我和兩個真的聊得很開心的人交換了電話。',
        chunks: [
          { text: 'Before I left,', label: '時間', explanation: '「Before I left」是時間副詞子句，說明交換電話這個動作發生在離開之前。放句首帶出一種「就在快結束的那一刻」的緊迫感，也暗示說話者有意識地採取了行動。' },
          { text: 'I exchanged numbers with two people', label: 'S-V 主幹', explanation: '「exchanged numbers」是「交換電話（號碼）」的自然說法，exchange 比 share 更強調雙向性——兩人互給。「two people」說明不是大規模的社交行為，而是精選的、真正感興趣的對象。' },
          { text: "I'd genuinely enjoyed talking to.", label: '關係子句', explanation: '這是省略了 that/whom 的關係子句。「I\'d genuinely enjoyed talking to」——我真心聊得很開心的人——中的 genuinely 是關鍵副詞，強調不是客套，而是真的享受。注意句尾的 to 是 talk to someone 的介詞，省略了 them。' },
        ],
      },
      {
        id: 8,
        original: 'One of them texted me the next morning asking if I wanted to grab lunch.',
        translation: '隔天早上其中一個傳訊息來，問我要不要一起吃午餐。',
        chunks: [
          { text: 'One of them texted me', label: 'S-V 主幹', explanation: '「One of them」表示「他們其中一個」，用 one of 說明這是從多個人中的一個，帶出一種「不確定是誰會先傳」的期待感。texted me 說明對方主動聯繫，暗示那個連結是雙向的。' },
          { text: 'the next morning', label: '時間', explanation: '「the next morning」——隔天早上——特別強調這是第二天就發生的事，說明連結在很短的時間內就被延續了。用 the（而不是 next morning）是因為上下文中「那個早上」是特定的、已知的時間點。' },
          { text: 'asking if I wanted to grab lunch.', label: '伴隨動作 + 間接問句', explanation: '「asking if + 子句」是「問是否……」的間接問句，作為 texted 的伴隨動作（分詞片語）。「grab lunch」是「吃個午餐」的口語說法，grab 讓邀約聽起來隨性、無壓力，比 have lunch together 更輕鬆友好。' },
        ],
        pattern: {
          skeleton: '___ texted me the next morning asking if I wanted to ___.',
          function: '描述在某次相遇之後，對方主動延續聯繫的行動，帶出驚喜和認可',
          examples: [
            { en: 'She texted me the next morning asking if I wanted to grab coffee.', zh: '她隔天早上傳訊息來，問我要不要去喝杯咖啡。' },
            { en: 'He texted me the next morning asking if I wanted to join his team.', zh: '他隔天早上傳訊息來，問我要不要加入他的團隊。' },
          ],
        },
      },
      {
        id: 9,
        original: 'We met up that week, and it turned out we had a lot more in common than I thought.',
        translation: '那週我們見了面，結果發現我們有很多共同點，比我想的還要多。',
        chunks: [
          { text: 'We met up that week,', label: 'S-V 主幹 + 時間', explanation: '「met up」是「見面、碰面」的口語片語，比 met 更強調這是一個約好的、有目的的相聚（而不是偶然相遇）。「that week」指那個事件發生後的當週，說明行動很快就落實了。' },
          { text: 'and it turned out', label: '轉折（慣用語）', explanation: '「it turned out」是「結果是、最後發現」的慣用語，用來引出一個出乎預期的結果。後面接的是什麼有時候是令人驚喜的、有時候是令人失望的，但這裡是正面的驚喜。這個說法比 we found that 更口語、更有敘事張力。' },
          { text: 'we had a lot more in common than I thought.', label: '受詞子句 + 比較', explanation: '「have a lot in common」是「有很多共同點」的固定說法，in common 不能省略。「a lot more than I thought」是比較結構，強調超出預期的程度。than I thought 後面省略了 we would have，完整是 more in common than I thought we would have。' },
        ],
        pattern: {
          skeleton: 'It turned out we had a lot more ___ in common than I thought.',
          function: '描述某段相遇或關係深化後，發現對方和自己比預期更有共鳴',
          examples: [
            { en: 'It turned out we had a lot more experiences in common than I thought.', zh: '結果我們有比我以為的多更多的共同經歷。' },
            { en: 'It turned out we had a lot more to talk about in common than I thought.', zh: '結果我們共同話題比我預期的多很多。' },
          ],
        },
      },
      {
        id: 10,
        original: "I used to think I wasn't good at meeting people, but maybe I just needed the right setting.",
        translation: '我以前一直覺得自己不擅長跟人打交道，但也許只是還沒遇到對的環境。',
        chunks: [
          { text: "I used to think I wasn't good at meeting people,", label: 'S-V 主幹（過去習慣）+ 受詞子句', explanation: '「used to + 動詞」表示過去曾經的習慣或信念，現在已不再如此。「think + that 子句」說明思考的內容。「wasn\'t good at + 動名詞」是「不擅長做某事」的固定結構，meeting people 是交朋友、認識新人的能力。' },
          { text: 'but maybe I just needed', label: '對比 + S-V', explanation: '「maybe」帶出一種反思和重新詮釋的語氣——不是確定，而是一個可能的解釋。「just needed」中的 just 讓問題顯得沒那麼嚴重，意思是「只不過是需要……而已」，把責任從「我不擅長」轉移到「環境」。' },
          { text: 'the right setting.', label: '受詞', explanation: '「the right setting」——對的環境、對的場合——是整句的重點。setting 在這裡指社交場合的性質和氛圍，比 place 更抽象、更準確。「the right」強調問題不是技能不足，而是場合不對。這是一種非常積極的自我重新定義。' },
        ],
        pattern: {
          skeleton: "I used to think I wasn't good at ___, but maybe I just needed ___.",
          function: '重新詮釋過去的自我評價，把問題歸因於情境而非能力，帶出更樂觀的自我觀',
          examples: [
            { en: "I used to think I wasn't good at public speaking, but maybe I just needed more practice.", zh: '我以前一直覺得自己不擅長公開演講，但也許只是需要多練習而已。' },
            { en: "I used to think I wasn't good at cooking, but maybe I just needed a better recipe.", zh: '我以前一直覺得自己不會做菜，但也許只是還沒遇到一個好食譜。' },
          ],
        },
      },
    ],
  },
  {
    id: 'work-remote-life',
    topic: '遠端工作的生活',
    topicEn: 'Life as a Remote Worker',
    level: 'B2',
    sentences: [
      {
        id: 1,
        original: 'When my company went fully remote, I thought it would be a dream come true.',
        translation: '公司全面遠端工作的時候，我以為這就是夢想成真了。',
        chunks: [
          { text: 'When my company went fully remote,', label: '時間 / 條件', explanation: '「went fully remote」是「完全轉為遠端工作」的說法，go + 形容詞 表示「變成某種狀態」（如 go digital, go bankrupt）。fully 強調是百分之百，沒有保留辦公室選項。這個說法在疫情後的職場英文中極為常見。' },
          { text: 'I thought', label: 'S-V 主幹', explanation: '簡短的 I thought 是整句的核心動詞，後面接受詞子句說明「當時的想法」。用過去式 thought，暗示現在的看法已經和當時不同——這個時態本身就埋下了轉折的伏筆。' },
          { text: 'it would be a dream come true.', label: '受詞子句（慣用語）', explanation: '「a dream come true」是「夢想成真」的慣用語，注意結構：dream + come true 是後置修飾，等於 a dream that has come true。would be 是過去式的假設語氣，表示「當時認為將會」，強調這是一種主觀的預期。' },
        ],
      },
      {
        id: 2,
        original: 'The first week was great — no commute, no dress code, total freedom.',
        translation: '第一週真的很爽——不用通勤、不用管穿著，完全自由。',
        chunks: [
          { text: 'The first week was great —', label: 'S-V 主幹', explanation: '「The first week was great」是簡潔有力的主幹，用破折號（—）引出後面的具體說明。破折號在英文中常用來帶出解釋、補充或舉例，比用冒號(:)更口語，讀起來有一種「讓我跟你說……」的敘事語感。' },
          { text: 'no commute, no dress code,', label: '並列補充（名詞片語）', explanation: '用 no + 名詞 的方式列出沒有的東西，是英文表達解放感的有效句型。commute（通勤）和 dress code（著裝規定）是辦公室生活的典型約束，直接點名它們讓聽者立刻感受到那種解脫。' },
          { text: 'total freedom.', label: '結論補充', explanation: '「total freedom」——完全的自由——是三個並列項目的最後一個，用最高的情感詞收尾，達到強調效果。「total」比 complete 或 full 更口語、更帶勁，讓這個短句像是一個小小的歡呼。' },
        ],
      },
      {
        id: 3,
        original: 'By the second week, I realized that working from home required a different kind of discipline.',
        translation: '到了第二週，我才發現在家工作需要一種完全不同的自律。',
        chunks: [
          { text: 'By the second week,', label: '時間', explanation: '「By the second week」表示「到了第二週這個時間節點」，by 帶有「截至此時已經發生了」的語感，暗示第一週還沒意識到，但第二週就清楚了。時間從「第一週」到「第二週」的轉換，也是從幻想到現實的轉折。' },
          { text: 'I realized that working from home', label: 'S-V 主幹 + 受詞子句主詞', explanation: '「realized that + 子句」是頓悟句型，帶有「才發現、才明白」的語感。「working from home」是動名詞片語，在 that 子句中作主詞，把「在家工作」這個行為本身作為分析對象，讓句子有一種客觀審視的視角。' },
          { text: 'required a different kind of discipline.', label: '受詞子句述語', explanation: '「a different kind of discipline」中的 different kind of 是「一種不同類型的」，說明不是需要「更多」自律，而是一種「性質不同」的自律。discipline（自律、紀律）在這裡是指自我管理的能力，強調在沒有外部結構的環境下需要更主動的自我規範。' },
        ],
        pattern: {
          skeleton: 'By the ___, I realized that ___ required a different kind of ___.',
          function: '描述某件事剛開始時讓人大感意外、超出原本預期的現實挑戰',
          examples: [
            { en: 'By the second month, I realized that freelancing required a different kind of focus.', zh: '到了第二個月，我才發現接案工作需要一種完全不同的專注力。' },
            { en: 'By the third day, I realized that solo travel required a different kind of confidence.', zh: '到了第三天，我才發現一個人旅行需要一種不同類型的自信。' },
          ],
        },
      },
      {
        id: 4,
        original: 'Without a clear schedule, my work hours started bleeding into my personal time.',
        translation: '沒有明確的行程規劃，工作時間開始一點一點侵蝕我的私人時間。',
        chunks: [
          { text: 'Without a clear schedule,', label: '條件 / 背景', explanation: '「Without + 名詞」作為句首的條件片語，說明「缺少某個東西，所以導致後面的結果」。a clear schedule（清晰的行程規劃）是 without 的受詞，暗示問題的根源在於缺乏結構——沒有固定的框架，一切就開始失控。' },
          { text: 'my work hours started bleeding', label: 'S-V 主幹', explanation: '「started bleeding」是整句最有創意的地方。bleeding（流血、滲透）是一個隱喻——把工作時間想像成液體，開始滲入私人空間。這個動詞比 extending 或 expanding 更生動、更帶有一種失控感，讓人感受到界線被侵蝕的不適。' },
          { text: 'into my personal time.', label: '方向補語', explanation: '「into + 名詞」表示「滲進、侵入」，說明方向和目標。personal time（私人時間）是工作以外屬於自己的時間，和 work hours（工作時間）形成明確對比。整個意群描述的是工作和生活之間的界線開始模糊的過程。' },
        ],
        pattern: {
          skeleton: 'Without ___, my ___ started bleeding into my ___.',
          function: '描述缺乏某種結構或規範時，一個領域開始不受控地侵入另一個領域',
          examples: [
            { en: 'Without clear goals, my energy started bleeding into pointless tasks.', zh: '沒有明確目標，我的精力開始一點一點花在沒意義的事上。' },
            { en: 'Without boundaries, my weekends started bleeding into work prep.', zh: '沒有界線，我的週末開始一點一點變成工作準備時間。' },
          ],
        },
      },
      {
        id: 5,
        original: 'I began setting strict boundaries — no emails after seven, no laptop in the bedroom.',
        translation: '我開始設定嚴格的界線——七點後不看信，臥室裡不帶電腦。',
        chunks: [
          { text: 'I began setting strict boundaries —', label: 'S-V 主幹', explanation: '「began setting」說明這是一個主動開始建立的新習慣，setting 是動名詞，表示持續進行的動作。「strict boundaries」——嚴格的界線——中的 strict 強調這些規則是認真執行的，不是說說而已。破折號帶出後面的具體說明。' },
          { text: 'no emails after seven,', label: '具體規則（並列）', explanation: '「no + 名詞 + 時間/地點條件」是設定規則的簡潔句型。no emails after seven（七點後不看郵件）直接陳述規則，不加解釋，帶出一種明確、果斷的語氣。這種碎片式的短句節奏，像在列出規章制度。' },
          { text: 'no laptop in the bedroom.', label: '具體規則（並列）', explanation: '「no laptop in the bedroom」——臥室裡不帶電腦——是保護睡眠品質和休息空間的常見策略。這個規則和前一個都是「空間和時間的邊界」，說明說話者用物理方式來強化心理上的工作與生活分隔。' },
        ],
      },
      {
        id: 6,
        original: 'I also started going outside every afternoon, even if just for twenty minutes.',
        translation: '我也開始每天下午出門走走，哪怕只有二十分鐘也好。',
        chunks: [
          { text: 'I also started going outside', label: 'S-V 主幹', explanation: '「also started」說明這是除了設界線之外的另一個習慣改變，also 帶出列舉的語感。「going outside」是字面的「走出去」，在遠端工作的脈絡下，出門這件小事變得非常有意義，象徵離開工作空間、讓大腦重置。' },
          { text: 'every afternoon,', label: '時間頻率', explanation: '「every afternoon」說明這是每天固定的習慣，而不是偶爾為之。每天下午出門的儀式感，幫助建立工作日的節律——即使沒有通勤，也有一個固定的「中場休息」。' },
          { text: 'even if just for twenty minutes.', label: '讓步條件', explanation: '「even if just for + 時間」是讓步子句，表示「就算只有這麼短的時間也值得」。even if（即使）帶出一種「不需要完美，最低限度也有效」的態度。just（只是）軟化了要求，讓這個習慣顯得可行而不沉重。' },
        ],
        pattern: {
          skeleton: 'I started ___ing every afternoon, even if just for ___.',
          function: '描述建立一個低門檻的固定習慣，強調頻率比時間長度更重要',
          examples: [
            { en: 'I started stretching every afternoon, even if just for ten minutes.', zh: '我開始每天下午做伸展，哪怕只有十分鐘也好。' },
            { en: 'I started journaling every afternoon, even if just for five minutes.', zh: '我開始每天下午寫日記，就算只有五分鐘也好。' },
          ],
        },
      },
      {
        id: 7,
        original: 'The hardest part was staying connected with colleagues I never saw in person.',
        translation: '最難的部分是跟那些從來沒有實際見面的同事保持聯繫。',
        chunks: [
          { text: 'The hardest part', label: '主詞（最高級）', explanation: '「The hardest part」是「最難的部分」，用最高級直接點出問題的核心，省去了列舉其他困難的過程。這個開頭帶出一種「要說最難的，就是……」的強調語氣，讓聽者聚焦在接下來說的內容。' },
          { text: 'was staying connected with colleagues', label: 'S-V 主幹（動名詞補語）', explanation: '「was + 動名詞」是把動名詞作為補語，說明「最難的部分」是什麼。「staying connected」強調維持連結是需要持續努力的動作（stay + 形容詞 表示維持狀態），不像在辦公室裡連結是自動發生的。' },
          { text: 'I never saw in person.', label: '關係子句', explanation: '省略了 that/whom 的關係子句，修飾 colleagues。「in person」是「親自、面對面」的固定說法，I never saw in person 表示「從來沒有實際見過面的」同事，帶出遠端工作的核心矛盾——每天一起工作，卻從未見面。' },
        ],
      },
      {
        id: 8,
        original: 'We started having a virtual coffee chat on Fridays just to catch up properly.',
        translation: '我們開始每週五辦線上咖啡閒聊，就是為了好好敘一下。',
        chunks: [
          { text: 'We started having a virtual coffee chat', label: 'S-V 主幹', explanation: '「virtual coffee chat」——線上咖啡閒聊——是遠端工作文化中的新創說法，把傳統的茶水間閒聊搬到線上。有名字（coffee chat）讓它顯得更像一個正式的習慣，而不只是隨機的視訊通話。' },
          { text: 'on Fridays', label: '時間頻率', explanation: '「on Fridays」（每週五）說明這是固定時間的週期性活動，比 every Friday 更正式，有一種「我們公司有這個慣例」的語感。固定在週五也符合一種「週末前的收尾、彼此報告近況」的儀式邏輯。' },
          { text: 'just to catch up properly.', label: '目的', explanation: '「catch up」是「敘舊、更新近況」的口語說法，properly 是關鍵副詞，意思是「好好地、認真地」，暗示平時忙於工作，這個時間是刻意留出來做真正的人際連結的。just to 強調這是唯一的目的，很單純。' },
        ],
        pattern: {
          skeleton: 'We started having ___ on Fridays just to ___.',
          function: '描述為了解決某個遠端工作問題而建立的固定小型儀式或習慣',
          examples: [
            { en: 'We started having a short check-in on Mondays just to align on priorities.', zh: '我們開始每週一做個短暫的確認，就是為了統一一下工作重心。' },
            { en: 'We started having a virtual lunch on Fridays just to feel like a team again.', zh: '我們開始每週五一起線上吃午餐，就是為了再找回一點團隊的感覺。' },
          ],
        },
      },
      {
        id: 9,
        original: 'Over time, I found a rhythm that worked for both my productivity and my well-being.',
        translation: '慢慢地，我找到了一套節奏，工作效率和身心狀態都顧到了。',
        chunks: [
          { text: 'Over time,', label: '時間', explanation: '「Over time」是「隨著時間過去、慢慢地」的口語說法，比 gradually 更常見。它暗示這個改變不是靠一個大決定，而是透過日積月累、反覆調整才達成的。放句首讓讀者先感受到這個過程的漸進性。' },
          { text: 'I found a rhythm', label: 'S-V 主幹', explanation: '「found a rhythm」——找到了一套節奏——是英文中非常有感的說法，rhythm（節奏）在這裡不是音樂的，而是生活方式的規律感。找到節奏暗示之前是混亂的，現在終於穩定了，是一種整體秩序的確立。' },
          { text: 'that worked for both my productivity and my well-being.', label: '關係子句', explanation: '「that worked for + 兩件事」說明這套節奏同時服務於兩個目標。「both A and B」是強調兩者都被照顧到的結構。productivity（生產力）和 well-being（身心健康）的並列，帶出一種工作與生活終於達到平衡的完成感。' },
        ],
        pattern: {
          skeleton: 'Over time, I found a rhythm that worked for both my ___ and my ___.',
          function: '描述經過一段時間的摸索，終於找到能同時平衡兩個面向的方式',
          examples: [
            { en: 'Over time, I found a rhythm that worked for both my focus and my rest.', zh: '慢慢地，我找到了一套節奏，兼顧了專注和休息。' },
            { en: 'Over time, I found a rhythm that worked for both my career and my relationships.', zh: '慢慢地，我找到了一套平衡事業和人際關係的節奏。' },
          ],
        },
      },
      {
        id: 10,
        original: "Remote work isn't perfect, but I've learned to make it work on my own terms.",
        translation: '遠端工作不是完美的，但我學會了用自己的方式讓它運作。',
        chunks: [
          { text: "Remote work isn't perfect,", label: 'S-V 主幹', explanation: '「isn\'t perfect」是一個坦誠的承認——說話者沒有說遠端工作很棒，而是先承認它的不完美。這種先退一步再進的說法讓後面的轉折更有力，也更真實可信。' },
          { text: "but I've learned to make it work", label: '對比 + S-V（完成式）', explanation: '「have learned to + 動詞」是現在完成式，表示「已經學會了某件事」，強調這是一種經過時間和努力才習得的能力。「make it work」——讓它運作——是口語中常用的說法，意思是「讓某件不完美的事情可以正常運行」。' },
          { text: 'on my own terms.', label: '方式（慣用語）', explanation: '「on my own terms」——按照我自己的條件/方式——是英文中非常有力的慣用語，表示不接受外部強加的規則，而是按自己設定的原則來做事。這句話放在句尾，是整個故事的核心主題句：不是被遠端工作的規則限制，而是主動掌控它。' },
        ],
        pattern: {
          skeleton: "___ isn't perfect, but I've learned to make it work on my own terms.",
          function: '承認某件事的不完美，同時表達已學會如何按自己的方式與之共存',
          examples: [
            { en: "This city isn't perfect, but I've learned to make it work on my own terms.", zh: '這個城市不是完美的，但我學會了用自己的方式讓生活在這裡運作。' },
            { en: "The job isn't perfect, but I've learned to make it work on my own terms.", zh: '這份工作不是完美的，但我學會了按自己的方式讓它有意義。' },
          ],
        },
      },
    ],
  },
  {
    id: 'learning-new-skill',
    topic: '學一項新技能',
    topicEn: 'Picking Up a New Skill as an Adult',
    level: 'B2',
    sentences: [
      {
        id: 1,
        original: 'I decided to learn guitar at thirty-two, which most people thought was too late.',
        translation: '我三十二歲決定學吉他，大多數人都覺得太晚了。',
        chunks: [
          { text: 'I decided to learn guitar at thirty-two,', label: 'S-V 主幹 + 時間', explanation: '「decided to + 動詞」表達主動的決定。「at thirty-two」是年齡時間點，放在這個位置讓它格外引人注目——三十二歲學樂器，隱含社會眼光的壓力。說出年齡是一種誠實，也是整個故事的核心矛盾設定。' },
          { text: 'which most people thought', label: '關係子句 S-V', explanation: '「which」是關係代名詞，指代前面整件事（三十二歲學吉他這個決定）。「most people thought」帶出外部聲音——不是說話者自己的懷疑，而是周圍的人的評判。這個對照讓說話者的選擇更顯得有勇氣。' },
          { text: 'was too late.', label: '關係子句述語', explanation: '「was too late」是 thought 的受詞子句述語，說明別人認為的內容。「too late」比 late 更強烈，帶有「超過了可以開始的時間點」的否定語氣。整個意群傳遞的訊息是：說話者在被眾人認為太晚的情況下仍然決定開始。' },
        ],
      },
      {
        id: 2,
        original: 'The first time I picked up the instrument, my fingers had no idea what to do.',
        translation: '第一次拿起樂器的時候，我的手指完全不知道該怎麼辦。',
        chunks: [
          { text: 'The first time I picked up the instrument,', label: '時間子句', explanation: '「The first time + 子句」是「第一次……的時候」的固定時間子句，比 when I first picked up 更強調「第一次」這個節點的特殊性。「picked up」是「拿起、拿取」的口語片語，常用於樂器、書本等，比 held 或 grabbed 更自然。' },
          { text: 'my fingers had no idea', label: 'S-V 主幹（慣用語）', explanation: '「had no idea」是「完全不知道」的慣用語，但這裡主詞是 my fingers（我的手指），不是說話者本人。這種擬人化的說法非常有趣和生動——把手指當成有意識的行動者，帶出一種幽默和自嘲的語感。' },
          { text: 'what to do.', label: '受詞子句（疑問詞 + 不定詞）', explanation: '「what to do」是「疑問詞 + 不定詞」的固定結構，作為 had no idea 的受詞，表示「不知道該做什麼」。這個結構非常口語，比完整的子句（what they should do）更精簡自然，是英文日常溝通中的高頻句型。' },
        ],
      },
      {
        id: 3,
        original: 'I practiced for twenty minutes every evening, even when I sounded terrible.',
        translation: '我每天晚上練二十分鐘，就算彈得很難聽也繼續練。',
        chunks: [
          { text: 'I practiced for twenty minutes every evening,', label: 'S-V 主幹 + 時間', explanation: '「practiced for twenty minutes」是「練習了二十分鐘」，for + 時間 表示持續的長度。注意 twenty minutes——不多不少，是一個真實可執行的時間量，讓習慣顯得具體可信，而不是說「我每天都練很久」。' },
          { text: 'even when', label: '讓步', explanation: '「even when」是讓步連接詞，意思是「即使在……的時候也……」，帶出一種「不管條件怎樣都持續」的堅持語氣。比 even though 更強調時間和情境的條件，用在描述克服困難、堅持習慣的語境中非常有力。' },
          { text: 'I sounded terrible.', label: '讓步子句述語', explanation: '「sounded terrible」——聽起來很糟糕——是感知動詞 sound + 形容詞的結構，表示「聽起來的感覺」。這個坦誠的自我評價讓整句充滿真實感——不是「我練得不好」，而是「我那時候彈得真的很難聽，但我還是繼續練了」。' },
        ],
        pattern: {
          skeleton: 'I practiced for ___ every evening, even when I ___.',
          function: '描述建立固定練習習慣，強調即便狀態不佳也持續執行',
          examples: [
            { en: 'I practiced for thirty minutes every evening, even when I felt exhausted.', zh: '我每天晚上練三十分鐘，就算很累也繼續練。' },
            { en: 'I wrote for twenty minutes every evening, even when I had nothing to say.', zh: '我每天晚上寫二十分鐘，就算腦袋空白也繼續寫。' },
          ],
        },
      },
      {
        id: 4,
        original: 'Progress was slow at first, but after a month, I could play a full song.',
        translation: '一開始進步很慢，但一個月後，我已經能完整彈一首歌了。',
        chunks: [
          { text: 'Progress was slow at first,', label: 'S-V 主幹 + 背景', explanation: '「at first」呼應前面說的「一開始」，承認進步緩慢的現實。注意主詞是 Progress（進步），而不是 I——把「進步緩慢」說成一種客觀現象，而非個人失敗，語氣更中立也更有成熟感。' },
          { text: 'but after a month,', label: '對比 + 時間', explanation: '「but + after + 時間」引出轉折，說明情況在一個月後改變了。after a month 是具體的時間節點，讓這個轉折有了現實依據——不是「不知道什麼時候突然就好了」，而是「一個月後，事情發生了改變」。' },
          { text: 'I could play a full song.', label: '結果子句', explanation: '「could play a full song」——能完整彈一首歌——是具體可量化的成就里程碑，比說「I improved」更有畫面感和成就感。a full song（完整的一首歌）強調是完整的、從頭到尾的，不是只會幾個和弦。' },
        ],
        pattern: {
          skeleton: 'Progress was slow at first, but after ___, I could ___.',
          function: '誠實承認初期的緩慢，再用具體的時間節點和成就來展示進步',
          examples: [
            { en: 'Progress was slow at first, but after three weeks, I could hold a conversation.', zh: '一開始進步很慢，但三個禮拜後，我已經能進行對話了。' },
            { en: 'Progress was slow at first, but after two months, I could run five kilometers.', zh: '一開始進步很慢，但兩個月後，我已經能跑五公里了。' },
          ],
        },
      },
      {
        id: 5,
        original: 'Learning something hard as an adult reminded me that failure is just part of the process.',
        translation: '成年後學一件難事，提醒了我失敗本來就是過程的一部分。',
        chunks: [
          { text: 'Learning something hard as an adult', label: '主詞（動名詞片語）', explanation: '「Learning something hard as an adult」是動名詞片語作主詞，把整個學習經驗當成一位「老師」。「something hard」是「一件困難的事」，something 用不定代詞帶出廣泛性——不只是吉他，是任何一件成年後才開始學的難事。「as an adult」強調這個時間點帶來的特殊挑戰和洞見。' },
          { text: 'reminded me that failure', label: 'V + 受詞 + 受詞子句主詞', explanation: '「reminded me that + 子句」是「提醒我……」的結構。注意這裡的提醒不是某個人說的話，而是一段親身經歷帶來的體悟，讓這個句子有一種更深的反思感。failure（失敗）作為 that 子句的主詞，直接把失敗擺到台面上討論。' },
          { text: 'is just part of the process.', label: '受詞子句述語', explanation: '「is just part of the process」中的 just 是關鍵——它把失敗降格為「只不過是……的一部分」，消解了失敗的嚴重性。「the process」用定冠詞 the，暗示這是一個普遍認知的學習歷程，任何人都必須經歷的。' },
        ],
        pattern: {
          skeleton: '___ reminded me that failure is just part of the process.',
          function: '透過某段親身經歷重新定義失敗，把它納入正常學習路徑',
          examples: [
            { en: 'Starting my own business reminded me that failure is just part of the process.', zh: '自己創業這件事提醒了我，失敗本來就是過程的一部分。' },
            { en: 'Learning a new language reminded me that failure is just part of the process.', zh: '學一門新語言提醒了我，犯錯本來就是過程的一部分。' },
          ],
        },
      },
      {
        id: 6,
        original: "I stopped comparing myself to people who had been playing since they were kids.",
        translation: '我不再拿自己跟那些從小就在彈琴的人比較。',
        chunks: [
          { text: 'I stopped comparing myself', label: 'S-V 主幹', explanation: '「stopped + 動名詞」表示停止了一個正在進行的動作，帶出一種「有意識地中止某個習慣」的感覺。「comparing myself」是反身動詞，強調比較的對象是自己——自我比較是一種主動的、可以選擇停止的行為。' },
          { text: 'to people', label: '比較對象', explanation: '「compare oneself to + 人」是「把自己和某人比較」的固定說法，介詞是 to，不是 with（compare with 通常用於兩個事物的比較，without self as subject）。「people」是廣義的「那些人」，不需要指名道姓。' },
          { text: "who had been playing since they were kids.", label: '關係子句（完成進行式）', explanation: '「had been playing」是過去完成進行式，表示在說話者開始學之前，那些人就已經持續練習很久了。「since they were kids」說明從小就開始，和說話者三十二歲才開始形成巨大對比——這個時態的選擇完美呈現了「不公平的起跑點」，也解釋了為什麼比較是沒有意義的。' },
        ],
        pattern: {
          skeleton: 'I stopped comparing myself to people who had been ___ since they were kids.',
          function: '描述放下不公平的自我比較，認清起跑點不同是事實而非缺陷',
          examples: [
            { en: 'I stopped comparing myself to people who had been coding since they were kids.', zh: '我不再拿自己跟那些從小就開始寫程式的人比較了。' },
            { en: 'I stopped comparing myself to people who had been drawing since they were kids.', zh: '我不再拿自己跟那些從小就開始畫畫的人比較了。' },
          ],
        },
      },
      {
        id: 7,
        original: 'My teacher told me that adults often learn faster because they understand why they are practicing.',
        translation: '老師跟我說，大人學東西其實常常比較快，因為他們知道自己為什麼在練。',
        chunks: [
          { text: 'My teacher told me', label: 'S-V 主幹', explanation: '「told me」是引用他人觀點的動詞，比 said 多了一個「對象」（me），強調這是說給說話者聽的，是有針對性的。用 My teacher 而不是泛指的「someone」，讓這個觀點有來源、有權威性。' },
          { text: 'that adults often learn faster', label: '受詞子句', explanation: '「that + 子句」是 told 的受詞子句，說明說的內容。「often learn faster」用 often（常常）而不是 always，讓說法更謹慎、更真實。「faster」是比較級，但省略了比較對象（than children），暗示讀者自然明白是在和年輕人比較。' },
          { text: 'because they understand why they are practicing.', label: '原因子句 + 間接問句', explanation: '「because + 子句」說明成人學更快的原因。「understand why they are practicing」——知道自己為什麼在練——是這整句的精華：成人的優勢不是記憶力或反應力，而是目的性的認知。「why they are practicing」是間接問句（疑問詞 + 子句），作為 understand 的受詞。' },
        ],
      },
      {
        id: 8,
        original: 'Six months in, I played a simple piece at a small gathering of friends.',
        translation: '練了六個月後，我在一個朋友的小聚會上彈了一首簡單的曲子。',
        chunks: [
          { text: 'Six months in,', label: '時間', explanation: '「六個月 in」是英文中非常口語的時間表達，in 在這裡不是介詞，而是副詞，表示「進入某個狀態/活動的第X個時間點」。「Six months in」比 After six months 更有「身在其中」的感覺，暗示說話者已深入這個學習歷程。' },
          { text: 'I played a simple piece', label: 'S-V 主幹', explanation: '「played a simple piece」——彈了一首簡單的曲子——是具體的行動成果。piece 在音樂語境中指一首曲子或作品。special 沒有說 a perfect piece，而是 a simple piece，這個謙遜的選詞帶出真實感——初學者不必一開始就演奏複雜的曲目。' },
          { text: 'at a small gathering of friends.', label: '地點', explanation: '「a small gathering of friends」——朋友的小聚會——是演出場合的描述。small 和 gathering（非正式的聚會）讓場景顯得親密而不壓迫，不是音樂廳，而是幾個朋友的聚會。這個選擇很重要——第一次公開演奏，應該在安全的環境中進行。' },
        ],
      },
      {
        id: 9,
        original: 'The applause was small, but the feeling of achievement was enormous.',
        translation: '掌聲不大，但那種成就感是真實的、巨大的。',
        chunks: [
          { text: 'The applause was small,', label: 'S-V 主幹', explanation: '「The applause was small」——掌聲不大——是誠實的自我評估，沒有誇大說「大家熱烈鼓掌」。small applause 表示只有少數幾個朋友在場，掌聲不算多，但這個事實為後面的情感對比做了鋪墊。' },
          { text: 'but the feeling of achievement', label: '對比 + 主詞', explanation: '「but」引出最關鍵的對比：外部反應（掌聲）的小 vs. 內部感受（成就感）的大。「the feeling of achievement」——成就感——是名詞片語作主詞，用 of 連接說明是哪種感覺，比直接說 the achievement feeling 更正式。' },
          { text: 'was enormous.', label: '述語', explanation: '「was enormous」——是巨大的——用最強烈的形容詞 enormous 來結尾，和 small 形成最大對比。這個句子的精妙在於：掌聲可以是小的，但成就感是屬於自己的、是完全不受外部大小影響的。' },
        ],
        pattern: {
          skeleton: 'The ___ was small, but the feeling of ___ was enormous.',
          function: '用外部評價的微小和內在感受的巨大形成對比，強調成就感的主觀性',
          examples: [
            { en: 'The audience was small, but the feeling of performing was enormous.', zh: '觀眾不多，但站上舞台的感覺是巨大的。' },
            { en: 'The win was small, but the feeling of progress was enormous.', zh: '那個勝利不算大，但那種進步的感覺是巨大的。' },
          ],
        },
      },
      {
        id: 10,
        original: "It's never too late to start — the only thing that really matters is that you do.",
        translation: '開始永遠不嫌晚——真正重要的，是你有沒有去做。',
        chunks: [
          { text: "It's never too late to start —", label: 'S-V 主幹（虛主詞）', explanation: '「It\'s + 形容詞 + to + 動詞」是虛主詞句型，真正的主詞是 to start，but 被移到後面，前面用 It 代替。「never too late」——永遠不嫌晚——是英文中的黃金肯定句，否定中帶正面，傳遞無條件的鼓勵。破折號之後是更深的延伸說明。' },
          { text: 'the only thing that really matters', label: '主詞 + 關係子句', explanation: '「the only thing that really matters」——唯一真正重要的事——是一個強調句型，the only 限定了討論範圍，that really matters 是關係子句修飾 thing。really 強調是真正的重要，過濾掉所有其他的顧慮（年齡、進度、他人眼光）。' },
          { text: 'is that you do.', label: '述語子句', explanation: '「is that you do」——是你有去做——是整句最精彩的部分。that you do 是名詞子句，作述語，do 是助動詞，後面省略了 start，完整是 that you do start。用最短的字說最深的意思：開始這件事，重要的不是時機、不是才能，而是你有沒有實際去做。' },
        ],
        pattern: {
          skeleton: "It's never too late to ___ — the only thing that really matters is that you do.",
          function: '用最簡潔的方式鼓勵行動，把所有外部顧慮歸零，聚焦在「你有沒有去做」這一點上',
          examples: [
            { en: "It's never too late to change direction — the only thing that really matters is that you do.", zh: '改變方向永遠不嫌晚——真正重要的，是你有沒有去做。' },
            { en: "It's never too late to ask for help — the only thing that really matters is that you do.", zh: '開口求助永遠不嫌晚——真正重要的，是你有沒有去開口。' },
          ],
        },
      },
    ],
  },
];

export function getLessonById(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}

export function getAvailableLessons(completedIds: string[]): Lesson[] {
  return LESSONS.filter((l) => !completedIds.includes(l.id));
}
