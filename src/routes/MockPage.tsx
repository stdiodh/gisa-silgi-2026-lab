import { Clock, Play, Save } from 'lucide-react';
import { useMemo, useState } from 'react';
import { QuestionMeta } from '../components/question/QuestionMeta';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Select, TextArea, TextInput } from '../components/ui/Field';
import { saveMockResult } from '../db/repository';
import type { MockExamResult, Question } from '../domain/question';
import { generateMockQuestions, gradeMockExam } from '../domain/scoringMock';
import { useQuestions } from '../hooks/useRepositoryData';

export function MockPage() {
  const { questions, loading } = useQuestions();
  const [trend, setTrend] = useState(true);
  const [limitMinutes, setLimitMinutes] = useState(30);
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [startedAt, setStartedAt] = useState<Date | null>(null);
  const [result, setResult] = useState<MockExamResult | null>(null);

  const codeCount = useMemo(
    () => examQuestions.filter((question) => question.type === 'code-output').length,
    [examQuestions],
  );

  const handleStart = () => {
    const generated = generateMockQuestions(questions, {
      trend2026Round1: trend,
      count: 20,
      random: () => 0.42,
    });
    setExamQuestions(generated);
    setAnswers({});
    setStartedAt(new Date());
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!startedAt) return;
    const graded = gradeMockExam(examQuestions, answers, trend, startedAt, new Date());
    setResult(graded);
    await saveMockResult(graded);
  };

  if (loading) return <Card title="모의고사">문제를 불러오는 중입니다.</Card>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="page-heading">모의고사</h1>
        <p className="page-subtitle">20문항, 100점 만점, 문항당 5점 기준으로 채점합니다.</p>
      </div>

      <Card title="모의고사 설정">
        <div className="grid gap-3 sm:grid-cols-3">
          <Select value={trend ? 'trend' : 'normal'} onChange={(event) => setTrend(event.target.value === 'trend')}>
            <option value="trend">2026 1회 경향 모의고사</option>
            <option value="normal">일반 모의고사</option>
          </Select>
          <label className="relative">
            <Clock className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <TextInput
              className="pl-9"
              min={10}
              type="number"
              value={limitMinutes}
              onChange={(event) => setLimitMinutes(Number(event.target.value))}
            />
          </label>
          <Button variant="primary" icon={<Play className="h-4 w-4" />} onClick={handleStart}>
            생성
          </Button>
        </div>
        {examQuestions.length > 0 && (
          <p className="mt-3 text-sm text-ink-muted dark:text-slate-400">
            제한 시간 {limitMinutes}분 · 코드 출력 {codeCount}문항
          </p>
        )}
      </Card>

      {examQuestions.length > 0 && (
        <div className="space-y-3">
          {examQuestions.map((question, index) => (
            <Card key={question.id} title={`${index + 1}. ${question.title}`}>
              <div className="space-y-3">
                <QuestionMeta question={question} />
                <p className="whitespace-pre-wrap text-sm leading-6">{question.prompt}</p>
                {question.code && (
                  <div className="rounded-2xl bg-code-bg text-code-text">
                    <div className="border-b border-slate-800 px-5 py-3 text-xs font-bold text-slate-400">
                      {question.language ?? 'code'}
                    </div>
                    <pre className="overflow-x-auto p-5 text-xs leading-5">
                      <code>{question.code}</code>
                    </pre>
                  </div>
                )}
                <TextArea
                  placeholder="답안"
                  value={answers[question.id] ?? ''}
                  onChange={(event) => setAnswers((prev) => ({ ...prev, [question.id]: event.target.value }))}
                />
              </div>
            </Card>
          ))}
          <Button variant="primary" icon={<Save className="h-4 w-4" />} onClick={handleSubmit}>
            제출 및 채점
          </Button>
        </div>
      )}

      {result && (
        <Card title="채점 결과">
          <div className="flex flex-wrap items-center gap-3">
            <Badge tone={result.status === '합격권' ? 'green' : result.status === '위험' ? 'amber' : 'red'}>
              {result.status}
            </Badge>
            <p className="text-2xl font-semibold">
              {result.score} / {result.total}
            </p>
          </div>
          <div className="mt-4 grid gap-2 md:grid-cols-2">
            {Object.entries(result.sectionScores).map(([section, score]) => (
              <div key={section} className="rounded-xl bg-surface-muted p-4 text-sm dark:bg-slate-800">
                <p className="font-medium">{section}</p>
                <p className="mt-1 text-ink-muted dark:text-slate-400">
                  {score.correct} / {score.total}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
