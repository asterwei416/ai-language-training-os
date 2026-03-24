# Tasks: AI Language Training OS - Reflective Language OS

**Input**: Design documents from `/specs/001-reflective-lang-os/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create project structure (backend/src, frontend/src) per implementation plan
- [ ] T002 Initialize Node.js backend with Express/Socket.io dependencies in backend/package.json
- [ ] T003 Initialize React frontend via Vite in frontend/
- [ ] T004 [P] Configure shared linting (ESLint) and formatting (Prettier) in repo root

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure for AI proxy and local reviewer mode

- [ ] T005 [P] Implement Backend AI Proxy Service for OpenAI SDK in backend/src/services/ai_proxy.ts
- [ ] T006 [P] Setup PostgreSQL connection pool in backend/src/lib/db.ts (per data-model.md)
- [ ] T007 [P] Implement Graceful Degradation (Read-only mode) trigger in frontend/src/hooks/useOffline.ts
- [ ] T008 [P] Configure DOMPurify for user input sanitization in frontend/src/utils/security.ts

---

## Phase 3: User Story 1 - 4-Block Analysis (Priority: P0) 🎯 MVP

**Goal**: Implement real-time passive linguistic analysis for all English input/output.

**Independent Test**: Use the `/api/v1/analyze` endpoint to verify that a sentence is correctly split into Word, Collocation, Phrase, and Clause components with confidence > 0.75.

### Implementation for User Story 1

- [ ] T009 [P] [US1] Create Analysis model and schema in backend/src/models/analysis.ts
- [ ] T010 [P] [US1] Implement 4-Block Parsing Logic (Instruction Engineering) in backend/src/services/analyzer.ts
- [ ] T011 [US1] Create `POST /api/v1/analyze` endpoint in backend/src/api/routes/analysis.ts
- [ ] T012 [P] [US1] Build 4-Block Visualization Component (Layered UI) in frontend/src/components/Analysis/BlockView.tsx
- [ ] T013 [US1] Integrate analyzer with frontend text input in frontend/src/pages/Home.tsx

---

## Phase 4: User Story 2 - Reflex Lab & FSI Engine (Priority: P1)

**Goal**: Implement the 30-unit staircase curriculum with reaction time monitoring and mastery-based progression.

**Independent Test**: Complete a "Substitution Drill" (Unit 1) and verify the 3.0s reaction timer correctly calculates "Reflex Success" and unlocks the next unit if > 80%.

### Implementation for User Story 2

- [ ] T014 [P] [US2] Create DrillUnit and Progress models in backend/src/models/drill.ts
- [ ] T015 [US2] Implement Mastery-Based Progression Logic (80% gate) in backend/src/services/progression.ts
- [ ] T016 [P] [US2] Build Reflex Lab Scenario Selector in frontend/src/components/Lab/ScenarioPicker.tsx
- [ ] T017 [US2] Implement Four-Phase Learning Loop (Infuse to Live) in frontend/src/modules/lab/LearningEngine.tsx
- [ ] T018 [US2] Implement Reaction Timer (3s/5s thresholds) in frontend/src/utils/timer.ts

---

## Phase 5: User Story 3 - Persona Squad & Long-term Memory (Priority: P2)

**Goal**: Implement AI Persona interactions with 30-day sliding window context and emotion detection.

**Independent Test**: Engage in a 5-turn conversation with an "Aggressor" persona, verify the emotion is correctly detected as "Challenging", and manual memory deletion works.

### Implementation for User Story 3

- [ ] T019 [P] [US3] Setup Vector DB connection (Metadata filtering) in backend/src/lib/vector_store.ts
- [ ] T020 [P] [US3] Implement 30-Day Sliding Window Memory Extraction in backend/src/services/memory.ts
- [ ] T021 [US3] Implement Streaming Audio/Text Bridge via Socket.io in backend/src/services/persona_bridge.ts
- [ ] T022 [P] [US3] Build Emotion Detection Integration (GPT-4o mini audio) in backend/src/services/emotion_analyzer.ts
- [ ] T023 [US3] Create "Forget this topic" manual deletion UI in frontend/src/components/Persona/MemoryControl.tsx

---

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] T024 [P] Finalize API documentation in docs/api_reference.md
- [ ] T025 Performance audit: Ensure ASR Interaction Latency < 1s
- [ ] T026 [P] Run SC-010 validation: Verify "Forget this topic" deletes corresponding vector data
- [ ] T027 Run quickstart.md validation for end-to-end flow

---

## Dependencies & Execution Order

### Phase Dependencies
- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on T001-T004.
- **US1 (P0)**: Depends on Phase 2 completion.
- **US2 (P1) & US3 (P2)**: Can start in parallel after US1 (P0) foundation is stable.

### User Story Dependencies
- **US2 (Reflex Lab)**: Integrates with US1's 4-Block component in the "Infuse" phase.
- **US3 (Persona)**: Integrates with US1's 4-Block for real-time talk analysis.

---

## Parallel Example: MVP (US1)

```bash
# Models and Service Logic can start together:
Task: "T009 [P] [US1] Create Analysis model in backend/src/models/analysis.ts"
Task: "T010 [P] [US1] Implement 4-Block Parsing Logic in backend/src/services/analyzer.ts"
Task: "T012 [P] [US1] Build 4-Block Visualization in frontend/src/components/Analysis/BlockView.tsx"
```

## Implementation Strategy
### MVP First (User Story 1 Only)
1. Complete Setup & Foundational.
2. Complete US1 (4-Block Analysis).
3. **STOP**: Validate real-time parsing accuracy and latency.
