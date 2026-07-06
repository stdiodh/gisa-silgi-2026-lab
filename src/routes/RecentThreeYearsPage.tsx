import { useEffect, useMemo, useState } from 'react';
import { QuestionSolver } from '../components/question/QuestionSolver';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Select } from '../components/ui/Field';
import { getWrongAttempts } from '../db/repository';
import { generateMockQuestions } from '../domain/scoringMock';
import type { Attempt, QuestionLanguage, QuestionType } from '../domain/question';
import type { SourceConfidence } from '../domain/trend';
import { useQuestions } from '../hooks/useRepositoryData';
import { questionTypeLabels } from '../utils/questionLabels';

const years = ['all', '2023', '2024', '2025', '2026'];
const rounds = ['all', '1', '2', '3'];
const confidences: Array<SourceConfidence | 'all'> = ['all', 'high', 'medium', 'low'];
const languages: Array<QuestionLanguage | 'all'> = ['all', 'C', 'Java', 'Python', 'SQL'];
const types: Array<QuestionType | 'all'> = ['all', 'code-output', 'sql-result', 'short-answer', 'term-matching', 'keyword-check'];

export function RecentThreeYearsPage() {
  const { questions, loading, refresh } = useQuestions();
  const [year, setYear] = useState('all');
  const [confidence, setConfidence] = useState<SourceConfidence | 'all'>('all');
  const [language, setLanguage] = useState<QuestionLanguage | 'all'>('all');
  const [type, setType] = useState<QuestionType | 'all'>('all');
  const [round, setRound] = useState('all');
  const [topic, setTopic] = useState('all');
  const [repeatOnly, setRepeatOnly] = useState(false);
  const [recentWrongOnly, setRecentWrongOnly] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState<Attempt[]>([]);

  useEffect(() => {
    void getWrongAttempts().then(setWrongAttempts);
  }, []);

  const topics = useMemo(() => [...new Set(questions.map((question) => question.topic))].sort(), [questions]);
  const repeatedTopics = useMemo(() => {
    const counts = new Map<string, number>();
    questions.forEach((question) => counts.set(question.topic, (counts.get(question.topic) ?? 0) + 1));
    return new Set([...counts.entries()].filter(([, count]) => count >= 2).map(([item]) => item));
  }, [questions]);
  const recentWrongIds = useMemo(() => {
    const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return new Set(
      wrongAttempts
        .filter((attempt) => new Date(attempt.answeredAt).getTime() >= cutoff)
        .map((attempt) => attempt.questionId),
    );
  }, [wrongAttempts]);

  const filtered = useMemo(
    () =>
      questions.filter((question) => {
        if (!question.sourceYear || question.sourceYear < 2023 || question.sourceYear > 2026) return false;
        if (year !== 'all' && question.sourceYear !== Number(year)) return false;
        if (round !== 'all' && question.sourceRound !== round) return false;
        if (confidence !== 'all' && question.sourceConfidence !== confidence) return false;
        if (language !== 'all' && question.language !== language) return false;
        if (type !== 'all' && question.type !== type) return false;
        if (topic !== 'all' && question.topic !== topic) return false;
        if (repeatOnly && !repeatedTopics.has(question.topic)) return false;
        if (recentWrongOnly && !recentWrongIds.has(question.id)) return false;
        return true;
      }),
    [confidence, language, questions, recentWrongIds, recentWrongOnly, repeatedTopics, repeatOnly, round, topic, type, year],
  );
  const drill = useMemo(
    () => generateMockQuestions(filtered.length ? filtered : questions, { recentThreeYears: true, count: 20, random: () => 0.42 }),
    [filtered, questions],
  );

  if (loading) return <Card title="최근 3년+최신 경향">문제를 불러오는 중입니다.</Card>;

  const codeCount = drill.filter((question) => question.type === 'code-output').length;
  const sqlCount = drill.filter((question) => question.language === 'SQL' || question.type === 'sql-result').length;
  const yearsInDrill = [...new Set(drill.map((question) => question.sourceYear).filter(Boolean))].join(', ');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="page-heading">최근 3년+최신 경향</h1>
        <p className="page-subtitle">
          2023~2025 반복 패턴과 2026년 1회 복원/후기 경향을 원문 없이 변형 문제로 훈련합니다.
        </p>
      </div>

      <Card title="출처 정책">
        <div className="flex flex-wrap gap-2">
          <Badge tone="blue">최근 3년 반복 패턴 60%</Badge>
          <Badge tone="amber">2026 1회 복원/후기 25%</Badge>
          <Badge tone="green">사용자 오답/약점 15%</Badge>
          <Badge tone="red">원문 미포함</Badge>
        </div>
      </Card>

      <Card title="필터">
        <div className="grid gap-3 md:grid-cols-4">
          <Select value={year} onChange={(event) => setYear(event.target.value)}>
            {years.map((item) => (
              <option key={item} value={item}>
                {item === 'all' ? '전체 연도' : item}
              </option>
            ))}
          </Select>
          <Select value={round} onChange={(event) => setRound(event.target.value)}>
            {rounds.map((item) => (
              <option key={item} value={item}>
                {item === 'all' ? '전체 회차' : `${item}회`}
              </option>
            ))}
          </Select>
          <Select value={confidence} onChange={(event) => setConfidence(event.target.value as SourceConfidence | 'all')}>
            {confidences.map((item) => (
              <option key={item} value={item}>
                {item === 'all' ? '전체 신뢰도' : item}
              </option>
            ))}
          </Select>
          <Select value={language} onChange={(event) => setLanguage(event.target.value as QuestionLanguage | 'all')}>
            {languages.map((item) => (
              <option key={item} value={item}>
                {item === 'all' ? '전체 언어' : item}
              </option>
            ))}
          </Select>
          <Select value={type} onChange={(event) => setType(event.target.value as QuestionType | 'all')}>
            {types.map((item) => (
              <option key={item} value={item}>
                {item === 'all' ? '전체 유형' : questionTypeLabels[item]}
              </option>
            ))}
          </Select>
          <Select value={topic} onChange={(event) => setTopic(event.target.value)}>
            <option value="all">전체 주제</option>
            {topics.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button variant={repeatOnly ? 'primary' : 'secondary'} onClick={() => setRepeatOnly((value) => !value)}>
            반복 출제 여부
          </Button>
          <Button variant={recentWrongOnly ? 'primary' : 'secondary'} onClick={() => setRecentWrongOnly((value) => !value)}>
            최근 7일 오답
          </Button>
        </div>
      </Card>

      <Card title="20문항 구성">
        <div className="grid gap-3 sm:grid-cols-4">
          <div className="rounded-xl bg-surface-muted p-4 dark:bg-slate-800">
            <p className="text-xs font-bold text-ink-muted dark:text-slate-400">코드 출력</p>
            <p className="mt-2 text-2xl font-bold">{codeCount}</p>
          </div>
          <div className="rounded-xl bg-surface-muted p-4 dark:bg-slate-800">
            <p className="text-xs font-bold text-ink-muted dark:text-slate-400">SQL</p>
            <p className="mt-2 text-2xl font-bold">{sqlCount}</p>
          </div>
          <div className="rounded-xl bg-surface-muted p-4 dark:bg-slate-800">
            <p className="text-xs font-bold text-ink-muted dark:text-slate-400">연도 다양성</p>
            <p className="mt-2 text-sm font-bold">{yearsInDrill}</p>
          </div>
          <div className="rounded-xl bg-surface-muted p-4 dark:bg-slate-800">
            <p className="text-xs font-bold text-ink-muted dark:text-slate-400">필터 결과</p>
            <p className="mt-2 text-2xl font-bold">{filtered.length}</p>
          </div>
        </div>
        <div className="mt-4">
          <Button variant="primary">Drill 시작</Button>
        </div>
      </Card>

      <QuestionSolver questions={drill} mode="recent-3-years" title="최근 3년+최신 Drill" onAnswered={refresh} />
    </div>
  );
}
