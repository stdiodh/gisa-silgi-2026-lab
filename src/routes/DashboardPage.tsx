import { CalendarClock, CheckCircle2, Flame, NotebookTabs, Target } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SevenDayChart } from '../components/dashboard/SevenDayChart';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { getDashboardStats, seedSampleQuestions } from '../db/repository';
import { calculateDday, EXAM_DATE } from '../domain/studyPlan';

type DashboardStats = Awaited<ReturnType<typeof getDashboardStats>>;

function StatCard({ label, value, icon: Icon }: { label: string; value: string | number; icon: typeof Target }) {
  return (
    <Card>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-ink-muted dark:text-slate-400">{label}</p>
          <p className="mt-2 text-3xl font-bold text-ink dark:text-white">{value}</p>
        </div>
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-secondaryContainer text-brand-secondary dark:bg-blue-950 dark:text-blue-200">
          <Icon className="h-6 w-6" />
        </span>
      </div>
    </Card>
  );
}

export function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const dday = calculateDday(new Date(), new Date(EXAM_DATE));

  useEffect(() => {
    void seedSampleQuestions().then(() => getDashboardStats()).then(setStats);
  }, []);

  if (!stats) {
    return <Card title="대시보드">데이터를 불러오는 중입니다.</Card>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <h1 className="page-heading">대시보드</h1>
          <p className="page-subtitle">
            시험일 {EXAM_DATE} · {dday > 0 ? `D-${dday}` : dday === 0 ? 'D-Day' : `D+${Math.abs(dday)}`}
          </p>
        </div>
        <Badge tone="blue">샘플 문제 {stats.totalQuestions}개</Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="D-day" value={dday > 0 ? `D-${dday}` : dday === 0 ? 'D-Day' : `D+${Math.abs(dday)}`} icon={CalendarClock} />
        <StatCard label="오늘 푼 문제" value={stats.todaySolved} icon={CheckCircle2} />
        <StatCard label="오늘 복습할 오답" value={stats.dueReviewCount} icon={NotebookTabs} />
        <StatCard label="2026 1회 진척도" value={`${stats.trendProgress}%`} icon={Target} />
        <StatCard label="누적 오답" value={stats.wrongCount} icon={Flame} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.6fr)]">
        <Card title="최근 7일 학습 그래프">
          <SevenDayChart data={stats.recent7Days} />
        </Card>
        <Card title="약점 TOP 5 태그">
          {stats.weakTags.length ? (
            <div className="space-y-2">
              {stats.weakTags.map((item) => (
                <div key={item.tag} className="flex items-center justify-between rounded-xl bg-surface-muted px-4 py-3 dark:bg-slate-800">
                  <span className="text-sm font-medium">{item.tag}</span>
                  <Badge tone="amber">{item.count}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-ink-muted dark:text-slate-400">아직 약점 태그가 없습니다.</p>
          )}
        </Card>
      </div>
    </div>
  );
}
