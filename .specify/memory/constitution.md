<!--
SYNC IMPACT REPORT
==================
Version change: (none) → 1.0.0  [INITIAL RATIFICATION]
Added sections:
  - Core Principles (I–VI)
  - AI 安全與倫理標準
  - 開發工作流程
  - Governance
Templates requiring updates:
  - .specify/templates/plan-template.md  ✅ 憲法檢查閘門已對齊原則
  - .specify/templates/spec-template.md  ✅ 無結構性衝突
  - .specify/templates/tasks-template.md ✅ 無結構性衝突
  - .specify/templates/agent-file-template.md ✅ 無衝突
Deferred TODOs:
  - TODO(CTO_APPROVER): 正式批准人待指定後補填
-->

# AI Language Training OS Constitution

## Core Principles

### I. 使用者學習主權 (Learner Sovereignty)

學習作業系統的一切設計 MUST 以提升使用者語言能力與自主學習成效為首要目標，而非
最大化系統功能的複雜度。具體規範：

- 功能 MUST 能直接對應至可量測的學習進展指標（如：完成率、復習間隔、準確率）。
- 系統 MUST NOT 在未獲使用者明確同意的情況下，以推薦或通知打斷主動學習流程。
- 每項 AI 輔助功能 MUST 提供「關閉 AI 介入」的逃生艙選項，確保學習者掌握控制權。

**理由**：語言學習的核心是認知參與，過度自動化反而削弱學習固化效果。

### II. AI 輸出透明度 (AI Output Transparency)

凡由 AI 模型生成之內容（解釋、翻譯、回饋、對話），系統 MUST 以視覺或元資料方式
清楚標示其 AI 來源及信心程度，不得以「系統內容」偽裝。具體規範：

- AI 生成內容 MUST 附帶來源標籤（模型名稱 + 版本）。
- 若 AI 信心分數低於閾值（預設 0.75），系統 MUST 顯示警告並建議使用者人工驗證。
- 系統 MUST NOT 將 AI 翻譯直接寫入使用者的學習記錄，需經使用者確認或至少一次曝光。

**理由**：AI 幻覺在語言教學中具有直接傷害性（強化錯誤用法），透明度是品質防線。

### III. 資料隱私最小化 (Data Minimization)

系統 MUST 僅收集達成學習目標所必要的最少量個人資料，且在本地端優先處理敏感資訊。

- 學習行為日誌（錯誤答案、練習記錄）MUST NOT 在使用者主動同意前傳送至遠端伺服器。
- 系統 MUST 提供本地離線模式，使核心學習功能在無網路環境下維持可運作。
- 所有與第三方 AI API 的通訊 MUST 透過後端代理進行，禁止在前端直接暴露 API 金鑰。

**理由**：學習錯誤記錄屬高度私密資料，不當共享將造成社會性羞恥感而阻礙學習。

### IV. 測試驅動品質 (Test-First Quality) — 非強制性（RECOMMENDED）

新功能 SHOULD 遵循測試先行原則：撰寫測試 → 確認紅燈 → 實作 → 確認綠燈。
對於 AI 整合類功能，MUST 建立 Mock/Fixture 機制以隔離真實 AI API 呼叫：

- Contract test MUST 驗證每個 AI API 回應的 schema 符合預期結構。
- 每個使用者故事 MUST 提供至少一個獨立可執行的整合測試。
- 回歸測試套件 MUST 在 CI 中全數通過方可合併至主線。

**理由**：AI 輸出不穩定性要求比傳統應用更嚴格的自動化測試護欄。

### V. 漸進式可觀測性 (Progressive Observability)

系統 MUST 在每個關鍵學習事件（課程開始、AI 互動、評測完成）產生結構化日誌，
以支援未來的學習科學分析。

- 日誌格式 MUST 採用 JSON structured logging，包含 `session_id`、`event_type`、
  `timestamp`（ISO 8601）、`user_id`（匿名化）。
- 效能關鍵路徑（AI 回應 p95 延遲）MUST 設定告警閾值，並在儀表板呈現。
- 錯誤追蹤 MUST 包含足夠的上下文以在不重現的情況下診斷問題。

**理由**：無法量測的學習系統無法進行有效迭代與個人化最佳化。

### VI. 簡約優先 (Simplicity First)

每個架構決策 MUST 優先選擇最簡單能達成目標的方案，禁止為「可能的未來需求」超前
設計。

- YAGNI（You Aren't Gonna Need It）是預設立場；複雜度引入 MUST 附帶書面理由。
- 若新功能需要第三個以上的服務依賴，MUST 在 plan.md 的「複雜度追蹤」章節填寫
  例外理由。
- 程式碼可讀性 MUST 優先於效能最佳化，除非有可量測的效能需求（如 p95 < 200ms）。

**理由**：作業系統類產品的長期維護成本遠超過初期開發成本，簡約性是最重要的擴充性。

## AI 安全與倫理標準

本節規範適用於所有與大型語言模型整合的功能模組。

- **Prompt Injection 防護**：所有使用者輸入 MUST 經過清洗（DOMPurify 或同等方案）
  後再傳入 LLM；嚴禁將使用者原始輸入直接串接至系統提示詞。
- **輸出過濾**：AI 生成之語言練習內容 MUST 經過有害內容過濾層，禁止在兒童學習模式
  中呈現任何不宜內容。
- **成本護欄**：每個使用者每日的 API 呼叫 MUST 設定上限（預設 500 tokens/次，
  100 次/日），超限須降級至本地規則引擎。
- **模型版本鎖定**：生產環境 MUST 鎖定 AI 模型版本，禁止使用「latest」等浮動標籤，
  每次模型升版需通過回歸測試。

## 開發工作流程

- **分支策略**：功能分支命名格式 `###-feature-name`，壽命不超過 5 個工作日。
- **品質閘門**：所有 PR MUST 通過 CI（lint + tests），MUST 附帶自我審查清單，
  且涉及 AI 整合的 PR MUST 由至少一名熟悉 LLM 安全的成員審查。
- **合規驗證**：每次 PR 合併前，提交者 MUST 自我確認本 PR 未違反上述六項核心原則。
  若有例外，MUST 在 PR 描述中說明並標記 `constitution-exception` 標籤。
- **Feature Flags**：新的 AI 功能模組 MUST 使用 Feature Flag 包裹，允許在生產環境
  隨時關閉，不得讓半完成功能直接暴露給使用者。
- **Runtime 指引**：日常開發 AI 整合行為請參閱 `.github/agents/` 目錄中的 agent
  指引檔案（speckit.specify、speckit.plan 等）。

## Governance

本憲法凌駕一切其他開發實踐文件。

- **修訂程序**：對憲法的任何修訂 MUST 透過 `/speckit.constitution` 指令進行，
  並附帶版本號說明與 Sync Impact Report。重大修訂（MAJOR 版本）需團隊核可。
- **版本政策**：遵循語意化版本規則：MAJOR（原則移除/重定義）、MINOR（新增原則或
  重大擴充）、PATCH（澄清、措辭、錯別字修正）。
- **合規審查**：每季度 MUST 執行一次憲法合規審查，確認所有活躍功能仍符合各項原則。
- **`/speckit.analyze` 整合**：Constitution 衝突在分析報告中自動歸為 CRITICAL 等級，
  MUST 在進入 `/speckit.implement` 前解決，不得以「後續再處理」轉移。

**Version**: 1.0.0 | **Ratified**: 2026-03-23 | **Last Amended**: 2026-03-23
