import { useMemo } from 'react';
import { QuestionSolver } from '../components/question/QuestionSolver';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { trendSources } from '../data/trendSources';
import { trend2026Round1Weights } from '../data/trendWeights';
import { useQuestions } from '../hooks/useRepositoryData';

export function TrendPage() {
  const { questions, loading, refresh } = useQuestions();
  const trendQuestions = useMemo(() => questions.filter((question) => question.trend2026Round1), [questions]);
  const codeCount = trendQuestions.filter((question) => question.type === 'code-output').length;
  const languageCounts = ['C', 'Java', 'Python', 'SQL'].map((language) => ({
    language,
    count: trendQuestions.filter((question) => question.language === language && question.type === 'code-output').length,
  }));
  const restoredSource = trendSources.find((source) => source.id === 'restored-2026-round1-patterns');

  if (loading) return <Card title="2026 1회 경향 집중 모드">문제를 불러오는 중입니다.</Card>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="page-heading">2026 1회 경향 집중 모드</h1>
        <p className="page-subtitle">
          코드 출력 비중을 높이고 SQL, DB, 보안/네트워크, 테스트/패턴을 함께 훈련합니다.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge tone="amber">복원/후기 기반 · 공식 확정 아님</Badge>
          <Badge tone="blue">confidence {restoredSource?.confidence ?? 'medium'}</Badge>
        </div>
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
        {codeCount < 7 && (
          <div className="mt-3 rounded-xl bg-state-warningContainer p-3 text-sm text-amber-800">
            코드 출력 샘플이 7문항보다 적으면 모의고사 품질이 떨어집니다. 샘플 변형 문제를 먼저 보강해야 합니다.
          </div>
        )}
      </Card>

      <Card title="왜 이 비율인가">
        <p className="text-sm leading-6 text-ink-muted dark:text-slate-400">
          공식 출제기준은 범주를 잡는 기준으로 사용하고, 2026년 1회 복원/후기는 코드 출력 강화 신호로만 반영합니다.
          복원/후기 기반 신호는 공식 기출처럼 확정 표시하지 않고 confidence를 낮춰 과도하게 뽑히지 않게 제한합니다.
        </p>
      </Card>

      <Card title="언어별 코드 문항 수">
        <div className="grid gap-3 sm:grid-cols-4">
          {languageCounts.map((item) => (
            <div key={item.language} className="rounded-xl bg-surface-muted p-4 dark:bg-slate-800">
              <p className="text-xs font-bold text-ink-muted dark:text-slate-400">{item.language}</p>
              <p className="mt-2 text-2xl font-bold">{item.count}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {['C', 'Java', 'Python', 'SQL'].map((language) => (
            <Button key={language}>{language} drill 시작</Button>
          ))}
        </div>
      </Card>
      <QuestionSolver questions={trendQuestions} mode="trend-2026-1" title="2026 1회 경향 문제" onAnswered={refresh} />
    </div>
  );
}
