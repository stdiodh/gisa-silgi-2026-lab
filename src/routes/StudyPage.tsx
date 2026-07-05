import { useMemo, useState } from 'react';
import { QuestionSolver } from '../components/question/QuestionSolver';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useQuestions } from '../hooks/useRepositoryData';
import type { QuestionLanguage } from '../domain/question';

const languages: Array<QuestionLanguage | 'all'> = ['all', 'C', 'Java', 'Python', 'SQL'];

export function StudyPage() {
  const { questions, loading, refresh } = useQuestions();
  const [language, setLanguage] = useState<QuestionLanguage | 'all'>('all');
  const dailyQuestions = useMemo(
    () =>
      questions
        .filter((question) => question.priority === 'A' || question.trend2026Round1)
        .slice(0, 20),
    [questions],
  );
  const codeQuestions = useMemo(
    () =>
      questions.filter(
        (question) =>
          (question.type === 'code-output' || question.type === 'sql-result') &&
          (language === 'all' || question.language === language),
      ),
    [language, questions],
  );

  if (loading) return <Card title="오늘의 학습">문제를 불러오는 중입니다.</Card>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="page-heading">오늘의 학습</h1>
        <p className="page-subtitle">A급과 2026 1회 경향 문제를 우선 풉니다.</p>
      </div>
      <QuestionSolver questions={dailyQuestions} mode="daily" title="오늘의 우선 문제" onAnswered={refresh} />

      <section className="space-y-5">
        <div>
          <h2 className="text-2xl font-bold text-ink dark:text-white">코드 출력 훈련 모드</h2>
          <p className="page-subtitle">코드를 실행하지 않고 직접 추적해 출력값을 입력합니다.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {languages.map((item) => (
            <Button
              key={item}
              variant={language === item ? 'primary' : 'secondary'}
              onClick={() => setLanguage(item)}
            >
              {item === 'all' ? '전체' : item}
            </Button>
          ))}
        </div>
        <QuestionSolver questions={codeQuestions} mode="quiz" title="실행 없이 출력 추적" onAnswered={refresh} />
      </section>
    </div>
  );
}
