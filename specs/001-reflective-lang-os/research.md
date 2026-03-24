# Research: AI Language Training OS - Core Technologies

## 1. 實時語音處理 (Real-time ASR/TTS)
- **選擇**: OpenAI Whisper (ASR) + OpenAI TTS (or Azure Cognitive Services)
- **原因**: OpenAI 提供極佳的語意理解與自然的語音合成。為了達成 < 1s 延遲 (SC-007)，前端需實作音頻串流 (Audio Streaming) 並透過 WebSocket (Socket.io) 傳輸。
- **替代方案**: 
  - Web Speech API: 瀏覽器內建，延遲最低但準確度與 Persona 風格控制較差。
  - Deepgram: 極速 ASR，若 OpenAI 延遲過高則切換。

## 2. 四維反射解析 (4-Block Analysis) 算法
- **選擇**: LLM-Based Parsing with JSON Schema
- **原因**: Word, Collocation, Phrase, Clause 的邊界具備主觀性與上下文依賴。透過指令工程 (Prompt Engineering) 要求 LLM 輸出結構化 JSON 是最穩健的路徑。
- **實作**:
  - 系統提示詞須包含分層定義。
  - 透過後端快取 (Redis) 儲存常用解析以降低成本。

## 3. 情緒辨識 (Emotion Detection)
- **選擇**: Hume AI 或 OpenAI GPT-4o-audio (原生音頻模型)
- **原因**: GPT-4o-audio 可直接從語調中感知情緒，無需先轉文字再分析，延遲最低。
- **備選**: 傳統 NLP 情感分析 (Text-based)，但會失去語氣中的關鍵資訊。

## 4. Persona 記憶與 30 天滑動窗口
- **選擇**: Vector DB (ChromaDB/Pinecone) + Metadata Filter
- **原因**: 使用向量儲存可進行語意檢索。Metadata 標記 `created_at` 即可輕鬆實作 30 天失效過濾。
- **刪除機制**: 提供 UI 介面透過 `memory_id` 觸發向量刪除。
