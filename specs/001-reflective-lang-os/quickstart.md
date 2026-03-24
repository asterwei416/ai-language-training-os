# Quickstart: AI Language Training OS Development

## 1. 環境準備
- **Node.js**: 20.x 或更高版本。
- **Package Manager**: npm 或 pnpm。
- **API Keys**: 需準備 OpenAI (GPT-4o, Whisper, TTS) 與 Hume AI (選配情緒辨識)。

## 2. 啟動開發環境
1. 安裝依賴：`npm install`
2. 複製設定：`cp .env.example .env` (並填入 API Key)
3. 啟動前端：`npm run dev`
4. 啟動後端：`npm run server`

## 3. 核心功能入口
- **4-Block 解析**: `src/services/analyzer.ts`
- **Reflex Lab 邏輯**: `src/modules/lab/engine.ts`
- **Persona 記憶**: `src/services/memory.ts`

## 4. 測試指令
- 單元測試：`npm test`
- 延遲基準測試：`npm run test:latency`
- 串流合規檢查：`npm run test:contracts`
