# Feature Specification: AI Language Training OS — 反射式語言能力學習系統

**Feature Branch**: `001-reflective-lang-os`
## Clarifications

### Session 2026-03-23

- Q: 使用者登入與身份識別採用哪種方案？ → A: 混合：匿名可用，登入後同步雲端資料
- Q: 使用者的初始程度（Proficiency Level）應如何決定？ → A: B+C（使用者自我選擇選項 + 預設最低難度且系統動態調整）
- Q: 對於 Persona 的「長期記憶 (Memory Context)」，應採用何種保留與控制策略？ → A: B（滑動時間窗 30 天 + 提供「忘記此話題」手動刪除功能）
- Q: Unit 30 的「時態轉換流暢度」應包含哪些具體評分指標？ → A: A（綜合：時態切換正確性 40% + 邏輯連詞使用 30% + 反議延遲 30%）
- Q: 在網路完全斷開或 AI 服務不可用時，系統應如何降級？ → A: B（優雅降級：唯讀模式 — 可查看紀錄但禁止新練習）

## 產品願景

建立一個以「反射式語言能力」為核心的學習系統，讓使用者達到：

- 不翻譯、不思考 → 直接輸出英文
- 從「知道」進化到「反射」
- 從「學習」轉變為「生活中的語言運作」

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — 反射訓練初學者完成第一個 FSI 訓練單元 (Priority: P1)

一位英文基礎薄弱的使用者打開 Reflex Lab，選擇 Unit 1（Reload 階段），
進行 10 題 Substitution 替換練習。系統即時給予語音回饋，並呈現 4-Block
拆解分析，讓使用者看到自己哪個環節出錯（單字、搭配、片語或子句層面）。

**Why this priority**: 這是「反射式輸出」的核心訓練迴路，所有其他模組都
以此為基礎建立語感。

**Independent Test**: 不依賴其他模組，可單獨測試：進入 Reflex Lab →
選擇 Unit 1 → 完成 10 題 → 看到得分與 4-Block 分析報告。

**Acceptance Scenarios**:

1. **Given** 使用者在 Reflex Lab 選擇 Substitution Unit 1，
   **When** 使用者以語音或文字輸入替換答案，
   **Then** 系統在 1 秒內回饋正誤並顯示 4-Block 分層標示。

2. **Given** 使用者完成 10 題練習，
   **When** 最後一題提交後，
   **Then** 系統呈現單元得分、錯誤分佈（4-Block 維度）及建議複習 prompt。

3. **Given** 使用者連續 3 題答錯同一類型，
   **When** 第 3 題回饋呈現，
   **Then** 系統主動標示該反射薄弱點並建議對應練習。

---

### User Story 2 — 使用者透過劇情模式完成「機場通關」任務 (Priority: P2)

使用者進入劇情模式（Epic Journey），選擇「機場 / 出入境」情境，
完成一段與 AI 角色的對話任務：辦理登機、回答移民官員問題。
完成後獲得任務評分與解鎖下一關獎勵。

**Why this priority**: 情境沉浸感是長期留存的關鍵驅動力，在 P1 訓練引擎
完成後為首要體驗延伸。

**Independent Test**: 進入 Epic Journey → 選擇機場情境 →
完成完整對話流程 → 看到任務評分與成就解鎖畫面。

**Acceptance Scenarios**:

1. **Given** 使用者選擇「機場通關」情境，
   **When** AI 角色發出第一個提示（如：May I see your boarding pass?），
   **Then** 使用者可以語音或文字回應，系統即時顯示 4-Block 分析。

2. **Given** 使用者完成所有對話節點，
   **When** 任務結束，
   **Then** 系統顯示任務完成評分（流暢度、準確度、反應時間）並解鎖下一情境。

3. **Given** 使用者回應偏離情境語境（如：回答完全不相關的句子），
   **When** AI 接收到回應，
   **Then** Persona 溫柔地重新引導，而非直接顯示錯誤訊息。

---

### User Story 3 — 使用者與 Persona「Aggressor」進行追問對話訓練 (Priority: P2)

使用者選擇 Persona Squad 中的「Aggressor」人格，進行一段關於使用者
日常生活的英文追問對話（AI 記住使用者過去提到的內容並延伸追問）。

**Why this priority**: 情感連結與多風格輸出訓練，提升長期使用黏著度。

**Independent Test**: 進入 Persona Squad → 選擇 Aggressor →
進行 5 輪追問對話 → AI 正確引用使用者先前提及的生活內容。

**Acceptance Scenarios**:

1. **Given** 使用者曾在對話中提到「我在台北工作」，
   **When** 使用者下次開啟 Persona Squad，
   **Then** AI 可主動引用此資訊進行追問（"So you work in Taipei—what's it like?"）。

2. **Given** Aggressor 模式啟動，
   **When** 使用者給出簡短回答（如："It's fine."），
   **Then** AI 追問至少 2 層深度，迫使使用者擴充句子。

---

### User Story 4 — 使用者使用 Snap & Talk 描述生活照片 (Priority: P3)

使用者在 Daily Lens 模式拍下一張照片（如：午餐、街景），
用英文語音描述，AI 即時回饋語言品質並「吐槽」或延伸話題。

**Why this priority**: 將語言融入生活，降低學習與真實使用之間的落差。

**Independent Test**: 進入 Daily Lens → 使用 Snap & Talk →
拍照 + 語音描述 → 收到 AI 即時回饋。

**Acceptance Scenarios**:

1. **Given** 使用者拍下一張午餐照片並說出描述，
   **When** 語音輸入完成，
   **Then** 系統在 2 秒內回應，包含：語言回饋 + 一個追問或延伸話題。

2. **Given** 使用者的描述有文法錯誤，
   **When** AI 回饋呈現，
   **Then** 回饋以對話方式自然糾正（非直接列出錯誤清單），
   並顯示 4-Block 中對應出錯的層次。

---

### Edge Cases

- 使用者在語音輸入時說話不清晰或切換語言（中英混用）時，系統如何處理？
- ASR 辨識失敗率超過 10% 時，系統是否自動降級為文字輸入模式？
- Persona 記憶系統若使用者從未主動告知個人資訊，AI 如何開始對話？
- FSI 單元生成引擎若模板不足以涵蓋學習者當前錯誤類型，如何回退？
- 使用者在離線狀態下或 AI 服務不可用時，系統 MUST 啟動**優雅降級 (Graceful Degradation) 模式**：
  - **唯讀存取**：使用者仍可查閱已完成的 Session 紀錄、4-Block 分析報告及已儲存的單字卡。
  - **功能阻斷**：禁止發起新的語音/文字對話、開啟新的 Reflex Lab 單元或使用 Snap & Talk。
  - **提示資訊**：明確顯示「目前處於離線模式，僅供複習」之提示。

---

## Requirements *(mandatory)*

### Functional Requirements

#### 身份認證與跨裝置 (Identity & Synchronization)

- **FR-0a**: 系統 MUST 支援**混合登入模式**：
  - 使用者初次下載安裝後 MUST 能立即匿名使用（以裝置本地 ID 記錄進度），降低入門阻力。
  - 系統 MUST 具備雲端同步功能，允許使用者後續綁定第三方 OAuth（如 Google/Apple）或 Email，綁定後將本地記憶與進度同步至雲端（支援 FR-10 跨裝置體驗延續）。
- **FR-0b**: 使用者初始程度（Proficiency Level）設定 MUST 採**自評與動態調整混合模式**：
  - 初次進入時提供輕量化選擇題（初級 / 中級 / 高級）讓使用者自我評估。
  - Reflex Lab 等訓練模組的實際起始難度 MUST 預設從該級別的最低難度開始，並依據使用者的實際表現（反應時間、正確率）進行持續式的**動態彈性調整 (Auto-scaling)**。

#### 全域核心引擎 (Global Core Engine)

- **FR-1**: 系統 MUST 內建「四維反射解析引擎」（4-Block Analysis）作為全域被動技能，
  對**所有模式**（Story / Persona / Daily / Lab）中任何英文輸入或 AI 輸出
  進行即時 X 光掃描式拆解，不需使用者主動觸發。四個解析維度定義如下：

  | 維度 | 定義 | 範例 |
  |------|------|------|
  | **Word**（核心詞彙）| 句中承載主要語意的關鍵詞，包含動詞、名詞與形容詞 | `submitted`, `report`, `urgent` |
  | **Collocation**（慣用搭配）| 詞彙間的慣用共現組合，不可隨意替換 | `submit a report`（非 `send a report`）|
  | **Phrase**（功能片語）| 具有完整功能的固定或半固定片語 | `on behalf of`, `as a result of` |
  | **Clause**（邏輯子句）| 含主謂結構的子句，聚焦邏輯關係與時態正確性 | `After the meeting concluded, we agreed…` |


- **FR-2**: 分析結果 MUST 支援點擊展開，顯示每個語言單位的說明與範例。
- **FR-3**: 系統 MUST 支援語音輸入（ASR），語音輸入延遲 MUST < 1 秒。
- **FR-4**: 系統 MUST 支援語音輸出（TTS）進行 AI 回應朗讀。
- **FR-5**: 系統 MUST 支援語氣/情緒辨識（Emotion Detection），
  用於調整 Persona 回應風格。

#### 模組一：劇情模式 (Epic Journey)

- **FR-6**: 系統 MUST 提供至少四種情境主題（點餐、機場、工作、社交），
  每個主題 MUST 包含完整對話流程與任務評分機制。
- **FR-7**: 系統 MUST 實作主線任務 + 支線任務架構，任務完成後
  MUST 觸發成就解鎖（新場景或人物）。
- **FR-8**: 任務評分 MUST 涵蓋流暢度、準確度、反應時間三個維度。

#### 模組二：Persona Squad

- **FR-9**: 系統 MUST 提供至少四種人格（Guide、Aggressor、
  Perfectionist、Riddler），每種人格 MUST 有明確差異化的對話行為規則。
- **FR-10**: 系統 MUST 實作** Persona 長期記憶系統 (Contextual Memory)**：
  - 系統 MUST 從對話中主動提取使用者的生活背景、職涯資訊或興趣點，儲存於 `memory_context`。
  - **記憶保留策略**：採用 30 天滑動時間窗（Sliding Window），僅保留近 30 天內提取的活躍記憶點。
  - **隱私控制**：系統 MUST 提供「忘記此話題」介面，允許使用者查閱並手動刪除特定的記憶條目。
- **FR-11**: Aggressor 人格 MUST 在使用者給出過短答案時，
  自動追問至少 2 層深度。

#### 模組三：Daily Lens

- **FR-12**: 系統 MUST 提供「對講機模式」，支援按住說話 → AI 即時回應流程。
- **FR-13**: 系統 MUST 提供「Snap & Talk」功能：使用者拍照後
  以語音描述，AI MUST 在 2 秒內回饋語言品質與追問。
- **FR-14**: Snap & Talk 的 AI 回饋 MUST 以自然對話方式呈現
  （非錯誤清單），並連結至 4-Block 分析。

#### 模組四：Reflex Lab（FSI 訓練引擎）

- **FR-15**: 系統 MUST 實作四種操練類型：Substitution（替換）、
  Transformation（轉換）、Response（回應）、Expansion（擴展）。
- **FR-16**: 系統 MUST 實作三階段進化：
  Reload（Unit 1–10，以 Substitution 為主）、
  Rapid Fire（Unit 11–20，引入 Transformation + Expansion）、
  Live Action（Unit 21–30，即時長句輸出）。
- **FR-17**: 系統 MUST 包含單元生成引擎，可根據模板自動生成練習，
  每個 Unit MUST 包含 Prompt、10 題訓練題目及即時回饋。
- **FR-18**: 系統 MUST 在使用者連續 3 題答錯同一操練類型時，
  主動標示反射薄弱點並提供對應建議。
- **FR-19**: 系統 MUST 在使用者進入 Reflex Lab 並開始 30 單元修煉前，
  提供**場景選擇介面**，包含兩種選擇路徑：
  1. **預設場景庫 (Scenario Presets)**：提供至少 6 種預設情境主題（如外交、
     職場、旅遊、美食、荒島、科技），使用者一鍵選擇即可啟動整組 30 單元。
  2. **自定義場景 (Custom Input)**：使用者輸入任意關鍵字（如「米其林餐廳廚師」），
     AI MUST 自動將 Unit 1–30 所有練習的場景、提示詞與句子範例，
     全部轉化為與該關鍵字相關的情境，保持語法焦點不變。
- **FR-20**: 場景化轉換 MUST 作用於練習的所有層面（教官指令語言、提示詞、
  參考答案、4-Block 分析範例），確保相同語法操練在不同場景下
  產生完全不同的沉浸感。場景設定在整個 30 單元過程中 MUST 保持一致。
- **FR-21**: 系統 MUST 實作**精通導向解鎖機制 (Mastery-Based Progression)**，
  規則如下：
  - 使用者 MUST 從 Unit 1 循序開始，禁止跳關。
  - 每題 MUST 即時監測「反應時間」（從提示詞顯示到使用者開始輸入/說話）：

    | 反應時間 | 判定結果 |
    |---------|---------|
    | ≤ 3 秒且正確 | ✅ **反射成功 (Reflex Hit)** |
    | 3–5 秒且正確 | ⚠️ **及格但遲緩 (Slow Pass)** |
    | > 5 秒（無論對錯）| ❌ **思維遲鈍 (Mental Lag)** |

  - 進入下一單元的門檻：該單元 10 題中 **≥ 80%** 判定為「反射成功」。
  - 未達門檻時，系統 MUST 告知差距並提供強化重練建議，而非強制重做整個單元。

- **FR-22**: 每個 Unit 內部 MUST 嚴格執行以下四階段教學循環，不可省略或重排：

  | 階段 | 名稱 | 說明 |
  |------|------|------|
  | ① | **注入 (Infuse)** | 教官提供 3 組示範，每組附帶 4-Block 拆解，供使用者理解結構再開始操練 |
  | ② | **熱身 (Substitution Drill)** | 進行簡單替換練習，建立對該句型的初步肌肉記憶 |
  | ③ | **強化 (Transformation / Expansion)** | 依該單元語法焦點執行轉換或擴展（如肯定→否定、加入副詞）|
  | ④ | **實戰反射 (Response Drill)** | 模擬突發狀況，使用者需在反應時間限制內即時回應 |

  四個階段的題目計入最終「反射成功率」計算（共 10 題跨四階段分配）。

#### 模組四附錄：30 單元課程設計總表 (Reflex Lab Curriculum)

> 本附錄為 FR-15 ~ FR-22 的詳細規格補述，定義每個 Unit 的學習目標、
> 操練類型與 AI 生成 Prompt 模板，供單元生成引擎使用。

##### 進階算法示意：單元執行流程

```
Unit N 開始
│
├─ ① 注入 (3 組示範 + 4-Block 解析)
│
├─ ② 熱身 Substitution Drill (3 題)
│     └─ 計時開始 → 判定 Reflex Hit / Slow Pass / Mental Lag
│
├─ ③ 強化 Transformation / Expansion (4 題)
│     └─ 計時開始 → 判定
│
└─ ④ 實戰反射 Response Drill (3 題)
      └─ 計時開始 → 判定
      
總計 10 題 → 計算反射成功率
≥ 80% → 解鎖 Unit N+1
< 80% → 顯示弱點分析 + 建議強化項目（不強迫重做）
```



##### 場景系統運作示例

相同語法焦點（Substitution Drill — `I am the [Position/Condition]`），
場景不同時產生截然不同的沉浸體驗：

**場景 A：【職場求生】**
> 教官指令：「聽著，現在你在電梯遇到 CEO。句型：I am the [Position]。提示詞：Project Manager。」
>
> 使用者輸出：`I am the project manager.`
>
> 4-Block 解析：Word: `manager` ／ Collocation: `project manager` ／
> Phrase: `the [role] of…` ／ Clause: 簡單主句

**場景 B：【荒島求生】**
> 教官指令：「你剛從空難倖存。句型：I am the [Condition]。提示詞：Only survivor。」
>
> 使用者輸出：`I am the only survivor.`
>
> 4-Block 解析：Word: `survivor` ／ Collocation: `only survivor` ／
> Phrase: `the only…` ／ Clause: 簡單主句

> **結論**：語法骨架相同，場景賦予靈魂。單元生成引擎 MUST 能在不改變語法焦點的
> 前提下，依場景關鍵字重新填充所有練習內容。


---

##### 🔫 第一週期：裝彈 (Reload) — 基礎反射建立 (Unit 1–10)

**週期核心目標**：建立「自動導航」系統，以 Substitution 替換練習磨練基礎語法反射。
**主要操練類型**：Substitution（替換）為主。

| Unit | 主題 | 語法焦點 | 操練場景 |
|------|------|---------|---------|
| U01 | 身份建立 | 繫動詞 `I am / You are / He is` | 外交場合身份認同 |
| U02 | 社交確認 | 一般疑問句 `Are you…? / Is he…?` | 大使館接待問答 |
| U03 | 空間定位 | 存在句 `There is / There are / It is in…` | 辦公室與城市導航 |
| U04 | 數量感知 | 基數詞 + 名詞複數 | 物資清點、預算報告 |
| U05 | 所屬關係 | 領屬代詞 `my / your / his / their` | 外交財產與文件歸屬 |
| U06 | 意志表達 | 助動詞 `I want to / I need to / I would like to` | 外交談判需求溝通 |
| U07 | 職業習慣 | 一般現在時（簡單式）| 外交官日常作息描述 |
| U08 | 社交博弈 | 祈使句 + `Could you please…?` | 外交禮賓與會議安排 |
| U09 | 否定防禦 | 否定結構 `I don't / He isn't / We can't` | 外交場合委婉拒絕 |
| U10 | 經驗回顧 | 一般過去時（規則動詞）| 外交任務彙報 |

**Unit Prompt 模板（U01 示例）**：
> 你是一位 FSI 語言教官。請用「I am / You are / He is」的句型，
> 設計 10 組身份建立的替換練習（Substitution Drill），場景設定為外交場合。
> 每組包含提示詞和完整回答。

*其餘 U02–U10 Prompt 依相同格式定義，具體 Prompt 文字已於需求提供，
 納入單元生成引擎之 Prompt 資料庫。*

---

##### 🔵 第二週期：連射 (Rapid Fire) — 語感慣性養成 (Unit 11–20)

**週期核心目標**：訓練邏輯鏈條與描述深度，讓句子變長變複雜。
**主要操練類型**：Transformation（轉換）+ Expansion（擴展）。

| Unit | 主題 | 語法焦點 | 操練場景 |
|------|------|---------|---------|
| U11 | 未來投射 | `I will / I'm going to` | 外交行程規劃 |
| U12 | 描述性感知 | 形容詞 + 程度副詞 `very / quite / extremely` | 國家形勢描述 |
| U13 | 因果鏈條 | 邏輯連詞 `because / so / therefore / however` | 外交政策分析 |
| U14 | 行為頻率 | 頻度副詞 `always / usually / sometimes / never` | 外交官工作模式 |
| U15 | 動作進行 | 現在進行時 `is doing / are working` | 國際峰會現場實況 |
| U16 | 工具使用 | 介詞 `with / by / through / in`（手段方式）| 外交工具與方法 |
| U17 | 比較競爭 | 比較級與最高級 | 國家實力與政策比較 |
| U18 | 義務責任 | 情態動詞 `must / should / have to` | 外交協議義務條款 |
| U19 | 許可博弈 | 情態動詞 `may / can / could / be allowed to` | 外交場合許可與權限 |
| U20 | 感官體驗 | 感官動詞 `look / sound / feel / taste / smell` | 海外駐派生活體驗 |

---

##### 🟡 第三週期：實戰 (Live Action) — 融合與自由輸出 (Unit 21–30)

**週期核心目標**：應對複雜時態，進行長段落即時轉換，達到自由輸出。
**主要操練類型**：Response（回應）+ Narrative Flow（敘事流）。

| Unit | 主題 | 語法焦點 | 操練場景 |
|------|------|---------|---------|
| U21 | 完成狀態 | 現在完成時 `have done / has completed` | 外交任務完成彙報 |
| U22 | 社交委婉 | 虛擬語氣 `If I were… / I would…` | 外交斡旋假設提案 |
| U23 | 被動承受 | 被動語態 `was decided / has been approved` | 國際條約與決議 |
| U24 | 複雜從句 | 定語從句 `who / which / that` | 外交人物與事件描述 |
| U25 | 時間跨度 | 過去完成時 `had done / had been` | 外交歷史事件回顧 |
| U26 | 自我指涉 | 反身代詞 `myself / himself / themselves` | 外交官自我管理 |
| U27 | 意向深度 | 動名詞與分詞結構 | 外交政策討論與意向表達 |
| U28 | 社會關係 | 交互動詞 `each other / cooperate / negotiate` | 多國外交合作 |
| U29 | 決策辯論 | 高階邏輯連詞 `although / nevertheless / in conclusion` | 聯合國議題辯論 |
| U30 | 敘事流 | 綜合時態轉換（≥ 3 種時態/段落）| 外交官職涯故事敘述 |

**Unit 30 特殊規格**：此單元為開放式敘事，每題需在一段敘述中自然轉換至少 3 種時態（過去 / 現在 / 將來）。評分標準採**綜合權重法 (Comprehensive Scoring)**：
- **時態切換正確性 (40%)**: 驗證基礎時態語法與 4-Block Clause 層級的正確性。
- **邏輯連詞使用 (30%)**: 評估段落間轉折詞 (However, Therefore, Thus) 的自然度。
- **反應延遲 (30%)**: 依據 FR-21 之 Reflex Hit 門檻計量，評估敘事流的即時性。
系統 MUST 提供針對「連貫性」的質性評語。

---

### Key Entities

- **User**: `id`、`proficiency_level`（初/中/高 自評值）、`dynamic_difficulty_index`（系統動態調整的隱藏難度係數）、`learning_history`（學習記錄）、
  `persona_preference`（慣用人格）、`memory_context`（AI 記憶內容，含 30 天失效機制與手動刪除標記）
- **Session**: `mode`（Story / Persona / Daily / Lab）、`input_text`、
  `input_audio_ref`、`analysis_result`（4-Block 結構化輸出）、`score`、
  `timestamp`
- **DrillUnit**: `unit_id`、`stage`（Reload / RapidFire / LiveAction）、
  `type`（Substitution / Transformation / Response / Expansion）、
  `difficulty`、`content`（Prompt + 題目）
- **Persona**: `name`、`tone`、`behavior_rules`（JSON 規則集）
- **Scenario**: `theme`（點餐 / 機場 / 工作 / 社交）、
  `quest_type`（main / side）、`dialogue_nodes`、`scoring_rubric`
- **Achievement**: `achievement_id`、`unlock_condition`、
  `reward_type`（new_scenario / new_persona）

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 使用者每日主動開口次數 > 30 次（以 Session 語音輸入事件計量）。
- **SC-002**: 7 日留存率 > 40%（以第 7 天仍有活躍 Session 的使用者比率計算）。
- **SC-003**: 使用者平均輸出句長在 30 天內提升 50%
  （以字數/句子計，從初始基準衡量）。
- **SC-004**: 使用者英文反應時間（收到 prompt 到開始輸出）在 30 天內
  縮短至 2 秒以內（以 Session 記錄的 time-to-first-word 計量）。
- **SC-005**: 使用者文法錯誤率在 30 天內下降 60%
  （以 4-Block 分析中 Clause 層錯誤次數/總輸出次數計算）。
- **SC-006**: 語音輸入 ASR 準確率 > 90%（以 AI 判定「語意可辨識」比率計）。
- **SC-007**: 任意 AI 互動回應時間 < 1 秒（從使用者完成輸入到第一個 token 呈現）。

---

## Assumptions

1. 使用者願意使用語音作為主要互動方式（Voice-first），並具備基本麥克風設備。
2. 後端 AI 服務能支援即時低延遲對話（p95 回應 < 1 秒）。
3. FSI 操練方法論（Substitution / Transformation / Response / Expansion）
   對口語能力建立具有實證效果。
4. 使用者願意在使用過程中分享個人生活內容以啟動 Persona 記憶功能。
5. 系統初版以英文作為目標語言，中文為母語介面語言。
6. AI 模型具備足夠的語境理解能力，可辨識語氣與情緒以驅動 Emotion Detection。
