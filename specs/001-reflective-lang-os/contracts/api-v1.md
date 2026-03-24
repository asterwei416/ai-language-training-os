# API Contracts: Global Core Engine

## 1. 4-Block Analysis (Real-time)
**Endpoint**: `POST /api/v1/analyze`
**Request**:
```json
{
  "text": "I would like to submit a report.",
  "context": "Scenario: Office"
}
```
**Response (200 OK)**:
```json
{
  "analysis": {
    "word": [{"text": "submit", "type": "verb"}],
    "collocation": [{"text": "submit a report"}],
    "phrase": [{"text": "would like to"}],
    "clause": [{"text": "I would like to submit a report.", "tense": "present_conditional"}]
  },
  "confidence": 0.98
}
```

## 2. Session Management
**Endpoint**: `POST /api/v1/sessions`
**Request**:
```json
{
  "mode": "Lab",
  "unit_id": "U01",
  "scenario_id": "workplace"
}
```

## 3. Persona Interaction (Streaming)
**WebSocket Event**: `persona:chat`
**Payload**:
```json
{
  "audio_blob": "base64...",
  "persona_id": "aggressor"
}
```
**Response (Stream)**:
```json
{
  "text_delta": "Why...",
  "emotion": "challenging",
  "audio_chunk": "base64..."
}
```
