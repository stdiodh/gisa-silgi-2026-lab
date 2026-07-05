import { useMemo } from 'react';
import { QuestionSolver } from '../components/question/QuestionSolver';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { trend2026Round1Weights } from '../data/trendWeights';
import { useQuestions } from '../hooks/useRepositoryData';

export function TrendPage() {
  const { questions, loading, refresh } = useQuestions();
  const trendQuestions = useMemo(() => questions.filter((question) => question.trend2026Round1), [questions]);
  const codeCount = trendQuestions.filter((question) => question.type === 'code-output').length;

  if (loading) return <Card title="2026 1회 경향 집중 모드">문제를 불러오는 중입니다.</Card>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="page-heading">2026 1회 경향 집중 모드</h1>
        <p className="page-subtitle">
          코드 출력 비중을 높이고 SQL, DB, 보안/네트워크, 테스트/패턴을 함께 훈련합니다.
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-5">
        {trend2026Round1Weights.map((weight) => (
          <Card key={weight.category}>
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold">{weight.category}</p>
              <Badge tone="green">{weight.weight}%</Badge>
            </div>
            <p className="mt-3 text-xs leading-5 text-ink-muted dark:text-slate-400">{weight.topics.join(' · ')}</p>
          </Card>
        ))}
      </div>
      <Card title="집중 모드 구성">
        <div className="grid gap-2 text-sm sm:grid-cols-3">
          <p>전체 경향 문제: {trendQuestions.length}개</p>
          <p>코드 출력 문제: {codeCount}개</p>
          <p>모의고사 코드 최소 기준: 7문항</p>
        </div>
      </Card>
      <QuestionSolver questions={trendQuestions} mode="trend-2026-1" title="2026 1회 경향 문제" onAnswered={refresh} />
    </div>
  );
}
