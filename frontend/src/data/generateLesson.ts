import type { Lesson } from './labLessons';
import type { AIProvider, ApiSettings } from '../store/useAppStore';

// ─── Prompt ────────────────────────────────────────────────────────────────────

function buildPrompt(topic: string): string {
  return `You are an expert English language teacher. Generate a lesson for a language learning app.

Topic: "${topic}"
Level: B1-B2
Language for explanations: Traditional Chinese (繁體中文)

Generate exactly 10 connected sentences that form a short narrative about the topic. Each sentence should flow naturally into the next.

Return ONLY valid JSON matching this exact TypeScript interface (no markdown, no extra text):

{
  "id": "custom-<slug>",
  "topic": "<topic in Chinese>",
  "topicEn": "<topic in English>",
  "level": "B1",
  "sentences": [
    {
      "id": 1,
      "original": "<English sentence>",
      "translation": "<Traditional Chinese translation>",
      "chunks": [
        {
          "text": "<meaning chunk text>",
          "label": "<grammar label in Chinese, e.g. 時間, S-V 主幹, 原因>",
          "explanation": "<detailed explanation in Traditional Chinese, 2-4 sentences explaining grammar logic, word choice, and nuance>"
        }
      ],
      "pattern": {
        "skeleton": "<sentence pattern with ___ for variable parts>",
        "function": "<what this pattern communicates, in Traditional Chinese>",
        "examples": [
          { "en": "<example sentence>", "zh": "<Traditional Chinese translation>" },
          { "en": "<example sentence>", "zh": "<Traditional Chinese translation>" }
        ]
      }
    }
  ]
}

Rules:
- Each sentence must have 2-4 meaning chunks
- Chunks must cover the FULL sentence with no gaps
- explanation must be detailed and educational (grammar logic + word choice + usage tips)
- Only add "pattern" to sentences with genuinely reusable skeleton patterns (at least 5 out of 10 sentences)
- Sentences without a reusable pattern should omit the "pattern" field entirely
- The id slug should be based on the English topic, lowercase with hyphens
- Make sentences feel like a real personal narrative, not textbook examples`;
}

// ─── Provider Callers ──────────────────────────────────────────────────────────

async function callAnthropic(settings: ApiSettings, topic: string): Promise<string> {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': settings.apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: settings.model,
      max_tokens: 4096,
      messages: [{ role: 'user', content: buildPrompt(topic) }],
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: { message?: string } }).error?.message || `Anthropic API error ${res.status}`);
  }
  const data = await res.json() as { content: { type: string; text: string }[] };
  return data.content[0].text;
}

async function callOpenAI(settings: ApiSettings, topic: string): Promise<string> {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${settings.apiKey}`,
    },
    body: JSON.stringify({
      model: settings.model,
      messages: [{ role: 'user', content: buildPrompt(topic) }],
      max_tokens: 4096,
      response_format: { type: 'json_object' },
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: { message?: string } }).error?.message || `OpenAI API error ${res.status}`);
  }
  const data = await res.json() as { choices: { message: { content: string } }[] };
  return data.choices[0].message.content;
}

async function callGoogle(settings: ApiSettings, topic: string): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${settings.model}:generateContent?key=${settings.apiKey}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: buildPrompt(topic) }] }],
      generationConfig: { maxOutputTokens: 4096 },
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: { message?: string } }).error?.message || `Google API error ${res.status}`);
  }
  const data = await res.json() as { candidates: { content: { parts: { text: string }[] } }[] };
  return data.candidates[0].content.parts[0].text;
}

// ─── Parser ────────────────────────────────────────────────────────────────────

function parseLesson(raw: string): Lesson {
  // Strip markdown code fences if present
  const cleaned = raw.replace(/^```(?:json)?\n?/m, '').replace(/\n?```$/m, '').trim();
  const parsed = JSON.parse(cleaned) as Lesson;

  // Basic validation
  if (!parsed.id || !parsed.sentences || parsed.sentences.length === 0) {
    throw new Error('Invalid lesson format returned by AI');
  }

  // Ensure custom prefix
  if (!parsed.id.startsWith('custom-')) {
    parsed.id = `custom-${parsed.id}`;
  }

  return parsed;
}

// ─── Main export ───────────────────────────────────────────────────────────────

const PROVIDER_CALLERS: Record<AIProvider, (settings: ApiSettings, topic: string) => Promise<string>> = {
  anthropic: callAnthropic,
  openai: callOpenAI,
  google: callGoogle,
};

export async function generateLesson(settings: ApiSettings, topic: string): Promise<Lesson> {
  if (!settings.apiKey.trim()) {
    throw new Error('請先在設定頁面填入 API Key');
  }

  const caller = PROVIDER_CALLERS[settings.provider];
  const raw = await caller(settings, topic);
  return parseLesson(raw);
}
