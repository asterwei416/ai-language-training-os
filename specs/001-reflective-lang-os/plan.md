# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

## Summary

建立一個以「反射式語言能力」為核心的學習系統，整合 AI + 語音互動（ASR/TTS）+ 情境模擬。核心技術挑戰在於實現 **FR-1 四維反射解析 (4-Block Analysis)** 的即時性、**FR-21/22 FSI 訓練引擎**的反應時間計量與動態調整，以及 **FR-10 Persona 長期記憶**的 30 天滑動窗口管理。本計畫將採用 React (Vite) + Node.js 結構，並透過後端代理串接高可靠性的 AI 服務。

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript / Node.js 20+ (Frontend: React 18+ via Vite)  
**Primary Dependencies**: OpenAI SDK (or Anthropic SDK), Socket.io (for real-time voice), Web Speech API (or external ASR/TTS), DOMPurify  
**Storage**: PostgreSQL (Users/Sessions/Progress), Redis (Session Context/Memory) or NEEDS CLARIFICATION  
**Testing**: Vitest (Unit/Integration), Playwright (E2E/ASR Latency)  
**Target Platform**: Modern Web Browsers (Chrome/Safari/Edge)  
**Project Type**: Full-stack Web Application  
**Performance Goals**: ASR Interaction Latency < 1s (SC-007), AI Response p95 < 2s  
**Constraints**: Offline-capable for review (Edge Case Clarified), p95 < 1s for 4-Block analysis  
**Scale/Scope**: 30-Unit Curriculum (Reflex Lab), 4+ Scenarios, 4+ Personas

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### I. 使用者學習主權 (Learner Sovereignty)
- [ ] 所有功能對應學習指標 (SC-001 ~ SC-005)
- [ ] 提供「關閉 AI 介入」逃生艙介面

### II. AI 輸出透明度 (AI Output Transparency)
- [ ] AI 生成內容標示模型版本
- [ ] 信心門檻警告機制 (Threshold: 0.75)

### III. 資料隱私最小化 (Data Minimization)
- [ ] 離線模式支持歷史複習 (Q5 Clarified)
- [ ] 後端代理處理第三方 API，禁止前端暴露 Key

### VI. 簡約優先 (Simplicity First)
- [ ] 減少不必要的服務依賴 (≤ 3 依賴項預設)

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
