import type { Question, QuestionLanguage, QuestionPriority, QuestionType } from './question';
import { trendSignalIds } from '../data/trendSignals';
import type { SourceConfidence, SourceKind } from './trend';

export interface ImportResult {
  questions: Question[];
  errors: string[];
}

const questionTypes: QuestionType[] = [
  'short-answer',
  'multiple-choice',
  'fill-blank',
  'code-output',
  'sql-result',
  'term-matching',
  'keyword-check',
];
const priorities: QuestionPriority[] = ['A', 'B', 'C'];
const languages: QuestionLanguage[] = ['C', 'Java', 'Python', 'SQL'];
const sourceKinds: SourceKind[] = ['official', 'publisher', 'restored', 'review', 'user-local'];
const confidences: SourceConfidence[] = ['high', 'medium', 'low'];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function toStringArray(value: unknown) {
  if (Array.isArray(value)) {
    return value.map(String).filter(Boolean);
  }

  if (typeof value === 'string') {
    return value
      .split(/[|,;]/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function toBoolean(value: unknown) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value.trim().toLowerCase() === 'true';
  return Boolean(value);
}

function toNumber(value: unknown) {
  if (typeof value === 'number') return value;
  if (typeof value === 'string' && value.trim()) return Number(value);
  return undefined;
}

export function validateQuestion(candidate: unknown): { question?: Question; errors: string[] } {
  const errors: string[] = [];

  if (!isRecord(candidate)) {
    return { errors: ['문제 항목이 객체가 아닙니다.'] };
  }

  const required = ['id', 'title', 'type', 'chapter', 'topic', 'priority', 'prompt', 'answer', 'explanation', 'sourceNote'];
  for (const field of required) {
    if (typeof candidate[field] !== 'string' || String(candidate[field]).trim() === '') {
      errors.push(`${String(candidate.id ?? 'unknown')}: ${field} 필드가 필요합니다.`);
    }
  }

  if (!questionTypes.includes(candidate.type as QuestionType)) {
    errors.push(`${String(candidate.id ?? 'unknown')}: type 값이 올바르지 않습니다.`);
  }

  if (!priorities.includes(candidate.priority as QuestionPriority)) {
    errors.push(`${String(candidate.id ?? 'unknown')}: priority 값은 A, B, C 중 하나여야 합니다.`);
  }

  if (candidate.language && !languages.includes(candidate.language as QuestionLanguage)) {
    errors.push(`${String(candidate.id ?? 'unknown')}: language 값이 올바르지 않습니다.`);
  }

  const tags = toStringArray(candidate.tags);
  if (tags.length === 0) {
    errors.push(`${String(candidate.id ?? 'unknown')}: tags가 비어 있습니다.`);
  }

  if (toBoolean(candidate.originalIncluded)) {
    errors.push(
      `${String(candidate.id ?? 'unknown')}: 공개 저장소/앱 기본 데이터에는 실제 기출 원문을 포함할 수 없습니다. 개인 로컬 학습용으로만 사용하려면 private import 영역에 별도 저장하세요.`,
    );
  }

  if (candidate.sourceKind && !sourceKinds.includes(candidate.sourceKind as SourceKind)) {
    errors.push(`${String(candidate.id ?? 'unknown')}: sourceKind 값이 올바르지 않습니다.`);
  }

  if (candidate.sourceConfidence && !confidences.includes(candidate.sourceConfidence as SourceConfidence)) {
    errors.push(`${String(candidate.id ?? 'unknown')}: sourceConfidence 값이 올바르지 않습니다.`);
  }

  const derivedFromTrendSignalIds = toStringArray(candidate.derivedFromTrendSignalIds);
  for (const signalId of derivedFromTrendSignalIds) {
    if (!trendSignalIds.has(signalId)) {
      errors.push(`${String(candidate.id ?? 'unknown')}: 알 수 없는 trend signal id입니다. (${signalId})`);
    }
  }

  if (candidate.type === 'code-output' && (!Array.isArray(candidate.trace) || candidate.trace.length < 2)) {
    errors.push(`${String(candidate.id ?? 'unknown')}: code-output 문제는 trace가 최소 2단계 이상 필요합니다.`);
  }

  if (errors.length > 0) {
    return { errors };
  }

  const now = new Date().toISOString();
  const question: Question = {
    id: String(candidate.id),
    title: String(candidate.title),
    type: candidate.type as QuestionType,
    chapter: String(candidate.chapter),
    topic: String(candidate.topic),
    tags,
    priority: candidate.priority as QuestionPriority,
    trend2026Round1: Boolean(candidate.trend2026Round1),
    language: candidate.language as QuestionLanguage | undefined,
    prompt: String(candidate.prompt),
    code: typeof candidate.code === 'string' ? candidate.code : undefined,
    choices: toStringArray(candidate.choices),
    answer: String(candidate.answer),
    aliases: toStringArray(candidate.aliases),
    explanation: String(candidate.explanation),
    trace: Array.isArray(candidate.trace) ? (candidate.trace as Question['trace']) : undefined,
    tableAnswer: isRecord(candidate.tableAnswer) ? (candidate.tableAnswer as unknown as Question['tableAnswer']) : undefined,
    sourceNote: String(candidate.sourceNote),
    sourceYear: toNumber(candidate.sourceYear),
    sourceRound: typeof candidate.sourceRound === 'string' ? candidate.sourceRound : undefined,
    sourceKind: (candidate.sourceKind as SourceKind | undefined) ?? 'user-local',
    sourceConfidence: (candidate.sourceConfidence as SourceConfidence | undefined) ?? 'medium',
    sourceUrl: typeof candidate.sourceUrl === 'string' ? candidate.sourceUrl : undefined,
    derivedFromTrendSignalIds,
    originalIncluded: false,
    createdAt: typeof candidate.createdAt === 'string' ? candidate.createdAt : now,
    updatedAt: typeof candidate.updatedAt === 'string' ? candidate.updatedAt : now,
  };

  return { question, errors: [] };
}

export function parseJsonImport(text: string): ImportResult {
  try {
    const parsed = JSON.parse(text) as unknown;
    const items = isRecord(parsed) && Array.isArray(parsed.questions) ? parsed.questions : [];

    if (!items.length) {
      return { questions: [], errors: ['questions 배열이 필요합니다.'] };
    }

    const questions: Question[] = [];
    const errors: string[] = [];

    for (const item of items) {
      const result = validateQuestion(item);
      if (result.question) questions.push(result.question);
      errors.push(...result.errors);
    }

    return { questions, errors };
  } catch (error) {
    return { questions: [], errors: [`JSON 파싱 실패: ${(error as Error).message}`] };
  }
}

function splitCsvLine(line: string) {
  const cells: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];
    if (char === '"' && next === '"') {
      current += '"';
      index += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      cells.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  cells.push(current);
  return cells.map((cell) => cell.trim());
}

export function parseCsvImport(text: string): ImportResult {
  const lines = text.split(/\r?\n/).filter((line) => line.trim());
  if (lines.length < 2) {
    return { questions: [], errors: ['CSV 헤더와 최소 1개 행이 필요합니다.'] };
  }

  const headers = splitCsvLine(lines[0]);
  const rows = lines.slice(1).map((line) => splitCsvLine(line));
  const items = rows.map((cells) =>
    Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? ''])),
  );
  const json = JSON.stringify({ questions: items });
  return parseJsonImport(json);
}

export function parseMarkdownImport(text: string): ImportResult {
  const blocks = text
    .split(/\n---+\n/)
    .map((block) => block.trim())
    .filter(Boolean);
  const items = blocks.map((block) => {
    const record: Record<string, string> = {};
    for (const line of block.split(/\r?\n/)) {
      const match = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
      if (match) {
        record[match[1]] = match[2];
      }
    }
    return record;
  });

  return parseJsonImport(JSON.stringify({ questions: items }));
}

export function parseImportByFilename(filename: string, text: string): ImportResult {
  const lower = filename.toLowerCase();
  if (lower.endsWith('.json')) return parseJsonImport(text);
  if (lower.endsWith('.csv')) return parseCsvImport(text);
  if (lower.endsWith('.md') || lower.endsWith('.markdown')) return parseMarkdownImport(text);
  return { questions: [], errors: ['지원하지 않는 파일 형식입니다. JSON, CSV, Markdown만 가능합니다.'] };
}
