import { useEffect, useMemo, useState } from 'react';
import { QuestionSolver } from '../components/question/QuestionSolver';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { getWrongAttempts } from '../db/repository';
import type { Attempt, Question } from '../domain/question';
import { useQuestions } from '../hooks/useRepositoryData';

export function WrongPage() {
  const { questions, loading, refresh } = useQuestions();
  const [attempts, setAttempts] = useState<Attempt[]>([]);

  useEffect(() => {
    void getWrongAttempts().then(setAttempts);
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

  if (loading) return <Card title="오답노트">문제를 불러오는 중입니다.</Card>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="page-heading">오답노트</h1>
        <p className="page-subtitle">틀린 문제는 2회 연속 정답 전까지 약점으로 유지됩니다.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <QuestionSolver questions={wrongQuestions} mode="wrong" title="오답만 다시 풀기" onAnswered={refresh} />
        <Card title="같은 태그 추천">
          {recommended.length ? (
            <div className="space-y-2">
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
    </div>
  );
}
