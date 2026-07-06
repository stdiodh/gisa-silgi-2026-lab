import { useEffect, useMemo, useRef, useState } from 'react';
import { QuestionSolver } from '../components/question/QuestionSolver';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { getWrongAnalyses, getWrongAttempts } from '../db/repository';
import type { Attempt, Question, WrongAnalysis } from '../domain/question';
import { useQuestions } from '../hooks/useRepositoryData';

export function WrongPage() {
  const { questions, loading, refresh } = useQuestions();
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [analyses, setAnalyses] = useState<WrongAnalysis[]>([]);
  const [drillQuestions, setDrillQuestions] = useState<Question[]>([]);
  const [drillTitle, setDrillTitle] = useState('같은 태그 5문항 더 풀기');
  const [drillKey, setDrillKey] = useState(0);
  const drillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    void getWrongAttempts().then(setAttempts);
    void getWrongAnalyses().then(setAnalyses);
  }, [questions]);

  const wrongQuestions = useMemo(() => {
    const ids = [...new Set(attempts.map((attempt) => attempt.questionId))];
    return ids.map((id) => questions.find((question) => question.id === id)).filter(Boolean) as Question[];
  }, [attempts, questions]);

  const recommended = useMemo(() => {
    const weakTags = new Set(wrongQuestions.flatMap((question) => question.tags));
    const wrongIds = new Set(wrongQuestions.map((question) => question.id));
    return questions.filter((question) => !wrongIds.has(question.id) && question.tags.some((tag) => weakTags.has(tag))).slice(0, 6);
  }, [questions, wrongQuestions]);
  const mustReviewQuestions = useMemo(() => {
    const ids = analyses.filter((analysis) => analysis.mustReviewBeforeExam).map((analysis) => analysis.questionId);
    return ids.map((id) => questions.find((question) => question.id === id)).filter(Boolean) as Question[];
  }, [analyses, questions]);

  const startDrill = (nextQuestions: Question[], title: string) => {
    if (!nextQuestions.length) return;
    setDrillQuestions(nextQuestions);
    setDrillTitle(title);
    setDrillKey((value) => value + 1);
    requestAnimationFrame(() => drillRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  const startFinalPack = () => {
    const seen = new Set<string>();
    const pack = [...mustReviewQuestions, ...wrongQuestions, ...recommended].filter((question) => {
      if (seen.has(question.id)) return false;
      seen.add(question.id);
      return true;
    });
    startDrill(pack.slice(0, 10), 'D-1 최종 오답팩');
  };

  if (loading) return <Card title="오답노트">문제를 불러오는 중입니다.</Card>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="page-heading">오답노트</h1>
        <p className="page-subtitle">틀린 문제는 2회 연속 정답 전까지 약점으로 유지됩니다.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card title="시험 전 반드시 볼 것">
          <p className="text-3xl font-bold">{analyses.filter((analysis) => analysis.mustReviewBeforeExam).length}</p>
          <p className="mt-2 text-sm text-ink-muted dark:text-slate-400">resolvedAt이 없는 오답 분석입니다.</p>
        </Card>
        <Card title="틀린 이유별 보기">
          <div className="space-y-2">
            {[...new Set(analyses.map((analysis) => analysis.wrongPattern))].slice(0, 5).map((pattern) => (
              <div key={pattern} className="flex items-center justify-between rounded-xl bg-surface-muted px-3 py-2 dark:bg-slate-800">
                <span className="text-sm">{pattern}</span>
                <Badge tone="amber">{analyses.filter((analysis) => analysis.wrongPattern === pattern).length}</Badge>
              </div>
            ))}
          </div>
        </Card>
        <Card title="D-1 최종 오답팩">
          <p className="text-sm leading-6 text-ink-muted dark:text-slate-400">
            mustReviewBeforeExam 문제와 같은 태그 문제를 묶어 D-1에는 새 문제 대신 이 목록만 반복합니다.
          </p>
          <Button className="mt-4" disabled={!mustReviewQuestions.length && !wrongQuestions.length} onClick={startFinalPack}>
            최종 오답팩 시작
          </Button>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <QuestionSolver questions={wrongQuestions} mode="wrong" title="오답만 다시 풀기" onAnswered={refresh} />
        <Card title="같은 태그 추천">
          {recommended.length ? (
            <div className="space-y-2">
              <Button className="w-full" variant="primary" onClick={() => startDrill(recommended.slice(0, 5), '같은 태그 5문항 더 풀기')}>
                같은 태그 5문항 더 풀기
              </Button>
              {recommended.map((question) => (
                <div key={question.id} className="rounded-2xl border border-line-subtle bg-surface-muted p-4 dark:border-slate-800 dark:bg-slate-800">
                  <p className="text-sm font-medium">{question.title}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {question.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-ink-muted dark:text-slate-400">추천할 문제가 아직 없습니다.</p>
          )}
        </Card>
      </div>

      {drillQuestions.length > 0 && (
        <div ref={drillRef}>
          <QuestionSolver key={drillKey} questions={drillQuestions} mode="wrong" title={drillTitle} onAnswered={refresh} />
        </div>
      )}
    </div>
  );
}
