export type DrillType = 'substitution' | 'transformation' | 'response';
export type Judgment = 'reflex_hit' | 'slow_pass' | 'mental_lag';

export interface InfuseExample {
  prompt: string;
  answer: string;
  blocks: { word: string; collocation: string; phrase: string; clause: string };
}

export interface DrillQuestion {
  id: number;
  type: DrillType;
  instruction: string;
  prompt: string;
  options: string[];
  correct: number; // index into options
}

export interface LabUnit {
  id: number;
  stage: 'reload' | 'rapid_fire' | 'live_action';
  title: string;
  grammarFocus: string;
  scenario: string;
  infuse: InfuseExample[];
  questions: DrillQuestion[]; // exactly 10
}

export function getJudgment(reactionMs: number, isCorrect: boolean): Judgment {
  if (reactionMs > 5000) return 'mental_lag';
  if (reactionMs <= 3000 && isCorrect) return 'reflex_hit';
  if (reactionMs <= 5000 && isCorrect) return 'slow_pass';
  return 'mental_lag';
}

export function calcReflexRate(judgments: Judgment[]): number {
  if (judgments.length === 0) return 0;
  const hits = judgments.filter((j) => j === 'reflex_hit').length;
  return Math.round((hits / judgments.length) * 100);
}

// ─── Unit 1: 身份建立 ──────────────────────────────────────────────────────────

const unit1: LabUnit = {
  id: 1,
  stage: 'reload',
  title: '身份建立 (Identity)',
  grammarFocus: 'I am / You are / He is',
  scenario: '外交場合',
  infuse: [
    {
      prompt: 'diplomat',
      answer: 'I am a diplomat.',
      blocks: {
        word: 'diplomat',
        collocation: 'a diplomat',
        phrase: 'I am a [role]',
        clause: '簡單主詞 + 繫動詞 + 名詞補語',
      },
    },
    {
      prompt: 'spokesperson',
      answer: 'She is the spokesperson.',
      blocks: {
        word: 'spokesperson',
        collocation: 'the spokesperson',
        phrase: 'She is the [role]',
        clause: '第三人稱單數 + is + 定冠詞 + 名詞',
      },
    },
    {
      prompt: 'ambassador',
      answer: 'He is the ambassador.',
      blocks: {
        word: 'ambassador',
        collocation: 'the ambassador',
        phrase: 'He is the [role]',
        clause: '第三人稱單數 + is + 定冠詞 + 名詞',
      },
    },
  ],
  questions: [
    // ② Substitution Drill × 3
    {
      id: 1,
      type: 'substitution',
      instruction: '替換句型：I am the ___',
      prompt: '提示詞：project manager',
      options: [
        'I am the project manager.',
        'I am a project manager.',
        'I were the project manager.',
        'I is the project manager.',
      ],
      correct: 0,
    },
    {
      id: 2,
      type: 'substitution',
      instruction: '替換句型：She is ___',
      prompt: '提示詞：available',
      options: [
        'She are available.',
        'She is available.',
        'She am available.',
        'She been available.',
      ],
      correct: 1,
    },
    {
      id: 3,
      type: 'substitution',
      instruction: '替換句型：You are ___',
      prompt: '提示詞：in charge',
      options: [
        'You am in charge.',
        'You is in charge.',
        'You are in charge.',
        'You been in charge.',
      ],
      correct: 2,
    },
    // ③ Transformation × 4
    {
      id: 4,
      type: 'transformation',
      instruction: '轉換為否定句',
      prompt: '"I am the lead negotiator." → 否定',
      options: [
        "I am not the lead negotiator.",
        "I not am the lead negotiator.",
        "I aren't the lead negotiator.",
        "I don't am the lead negotiator.",
      ],
      correct: 0,
    },
    {
      id: 5,
      type: 'transformation',
      instruction: '轉換為疑問句',
      prompt: '"She is the delegate." → 疑問句',
      options: [
        'Is she the delegate?',
        'She is the delegate?',
        'Does she is the delegate?',
        'She be the delegate?',
      ],
      correct: 0,
    },
    {
      id: 6,
      type: 'transformation',
      instruction: '轉換為否定句',
      prompt: '"He is ready." → 否定',
      options: [
        "He isn't ready.",
        "He not is ready.",
        "He don't ready.",
        "He isn't been ready.",
      ],
      correct: 0,
    },
    {
      id: 7,
      type: 'transformation',
      instruction: '轉換為疑問句',
      prompt: '"You are the assigned officer." → 疑問句',
      options: [
        'You are the assigned officer?',
        'Are you the assigned officer?',
        'Do you are the assigned officer?',
        'Is you the assigned officer?',
      ],
      correct: 1,
    },
    // ④ Response Drill × 3
    {
      id: 8,
      type: 'response',
      instruction: '即時回應：選擇最適切的答句',
      prompt: 'AI: "Who handles the media briefing?"',
      options: [
        'I am the spokesperson.',
        'I am handle the briefing.',
        'I handles the briefing.',
        'I do the spokesperson.',
      ],
      correct: 0,
    },
    {
      id: 9,
      type: 'response',
      instruction: '即時回應：選擇最適切的答句',
      prompt: 'AI: "Are you the team leader?"',
      options: [
        'Yes, I am the team leader.',
        'Yes, I is the team leader.',
        'Yes, I am team leader.',
        'Yes, I are the team leader.',
      ],
      correct: 0,
    },
    {
      id: 10,
      type: 'response',
      instruction: '即時回應：選擇最適切的答句',
      prompt: 'AI: "Who is responsible for this?"',
      options: [
        'He are the project manager.',
        'He am the project manager.',
        'He is the project manager.',
        'He is a project managers.',
      ],
      correct: 2,
    },
  ],
};

export const LAB_UNITS: LabUnit[] = [unit1];

export function getUnit(id: number): LabUnit | undefined {
  return LAB_UNITS.find((u) => u.id === id);
}
