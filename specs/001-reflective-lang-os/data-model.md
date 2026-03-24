# Data Model: AI Language Training OS

## 實體關係圖 (ERD)

```mermaid
erDiagram
    USER ||--o{ SESSION : "initiates"
    USER ||--o{ ACHIEVEMENT : "earns"
    USER {
        string id PK
        string proficiency_level "初/中/高 自評值"
        float dynamic_difficulty_index "動態調整係數"
        json learning_history "學習統計"
        string persona_preference "慣用人格"
        json memory_context "30天滑動記憶"
    }
    SESSION ||--|{ ANALYSIS : "contains"
    SESSION {
        string id PK
        string user_id FK
        string mode "Story/Persona/Daily/Lab"
        string input_text
        string input_audio_ref "云端存儲 URL"
        float score
        timestamp created_at
    }
    ANALYSIS {
        string id PK
        string session_id FK
        json blocks "4-Block YAML/JSON"
        float confidence "AI 信心分數"
    }
    DRILL_UNIT ||--o{ SESSION : "is_performed_in"
    DRILL_UNIT {
        string unit_id PK
        string stage "Reload/RapidFire/LiveAction"
        string type "Substitution/Transformation/..."
        json content "Prompt + Questions"
    }
```

## 關鍵欄位定義與約束
- **User.memory_context**: 陣列結構 `[{id, text, topic, created_at}]`。
- **Analysis.blocks**: 嚴格對齊 4-Block 維度 (Word/Collocation/Phrase/Clause)。
- **Session.score**: 在 Unit 30 中依據 A 方案權重 (40/30/30) 計算。
