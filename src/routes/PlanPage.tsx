import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { calculateDday, EXAM_DATE, generateFixedExamPlan, toKstDateKey } from '../domain/studyPlan';

export function PlanPage() {
  const today = new Date();
  const dday = calculateDday(today, new Date(EXAM_DATE));
  const todayKey = toKstDateKey(today);
  const plan = generateFixedExamPlan();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="page-heading">D-day 학습 플랜</h1>
        <p className="page-subtitle">
          시험일 {EXAM_DATE} 기준 자동 플랜 · {dday > 0 ? `D-${dday}` : dday === 0 ? 'D-Day' : `D+${Math.abs(dday)}`}
        </p>
      </div>
      <div className="space-y-3">
        {plan.map((item) => (
          <Card
            key={item.date}
            title={
              <span className="flex flex-wrap items-center gap-2">
                {item.date}
                <Badge tone={item.date === todayKey ? 'blue' : item.dday <= 3 ? 'red' : item.dday <= 9 ? 'amber' : 'green'}>
                  {item.dday === 0 ? 'D-Day' : `D-${item.dday}`}
                </Badge>
                {item.date < todayKey && <Badge>기록 확인</Badge>}
                {item.date === todayKey && <Badge tone="blue">오늘</Badge>}
              </span>
            }
          >
            <h2 className="font-semibold">{item.title}</h2>
            <p className="mt-2 text-sm text-ink-muted dark:text-slate-400">{item.focus.join(' · ')}</p>
            <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
              {item.checklist.map((todo) => (
                <li key={todo} className="rounded-xl bg-surface-muted px-4 py-3 dark:bg-slate-800">
                  {todo}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
