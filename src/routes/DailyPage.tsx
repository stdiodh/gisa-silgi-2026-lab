import { CheckCircle2, NotebookTabs, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { QuestionSolver } from '../components/question/QuestionSolver';
import { Badge } from '../components/ui/Badge';
import { Button, buttonClassName } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import {
  completeDailyMission,
  getAllQuestions,
  getAttempts,
  getCurrentDailyStreak,
  getOrCreateDailyMission,
} from '../db/repository';
import type { Attempt, DailyMission, Question } from '../domain/question';
import { fixedExamPlan } from '../domain/studyPlan';

function scoreMission(mission: DailyMission, attempts: Attempt[], questions: Question[]) {
  const ids = new Set(mission.questionIds);
  const scoped = attempts.filter((attempt) => ids.has(attempt.questionId));
  const latest = new Map<string, Attempt>();
  for (const attempt of scoped) {
    const previous = latest.get(attempt.questionId);
    if (!previous || new Date(attempt.answeredAt).getTime() > new Date(previous.answeredAt).getTime()) {
      latest.set(attempt.questionId, attempt);
    }
  }
  const solved = [...latest.values()];
  const correct = solved.filter((attempt) => attempt.isCorrect).length;
  const wrongIds = new Set(solved.filter((attempt) => !attempt.isCorrect).map((attempt) => attempt.questionId));
  const weakTags = [
    ...new Set(
      questions
        .filter((question) => wrongIds.has(question.id))
        .flatMap((question) => question.tags)
        .slice(0, 8),
    ),
  ];

  return {
    score: correct * 5,
    total: Math.max(mission.questionIds.length * 5, 0),
    solved: solved.length,
    weakTags,
  };
}

export function DailyPage() {
  const [mission, setMission] = useState<DailyMission | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [streak, setStreak] = useState(0);

  const refresh = async () => {
    const [nextMission, allQuestions, allAttempts, nextStreak] = await Promise.all([
      getOrCreateDailyMission(),
      getAllQuestions(),
      getAttempts(),
      getCurrentDailyStreak(),
    ]);
    setMission(nextMission);
    setQuestions(allQuestions);
    setAttempts(allAttempts);
    setStreak(nextStreak);
  };

  useEffect(() => {
    void refresh();
  }, []);

  const missionQuestions = useMemo(() => {
    if (!mission) return [];
    const questionMap = new Map(questions.map((question) => [question.id, question]));
    return mission.questionIds.map((id) => questionMap.get(id)).filter(Boolean) as Question[];
  }, [mission, questions]);

  if (!mission) {
    return <Card title="오늘의 1회 학습">오늘 미션을 불러오는 중입니다.</Card>;
  }

  const score = scoreMission(mission, attempts, questions);
  const tomorrowPlan = fixedExamPlan.find((plan) => plan.dday === mission.dday - 1);
  const remainingCount = Math.max(mission.questionIds.length - score.solved, 0);
  const progressPercent = mission.questionIds.length ? Math.round((score.solved / mission.questionIds.length) * 100) : 100;
  const canComplete = remainingCount === 0;

  if (mission.dday === 0) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="page-heading">D-Day 체크리스트</h1>
          <p className="page-subtitle">새 문제 풀이는 금지하고 시험장 루틴만 확인합니다.</p>
        </div>
        <Card title={mission.title}>
          <ul className="grid gap-3 sm:grid-cols-3">
            {(fixedExamPlan.find((plan) => plan.date === mission.date)?.checklist ?? mission.focus).map((item) => (
              <li key={item} className="rounded-xl bg-surface-muted px-4 py-3 text-sm dark:bg-slate-800">
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h1 className="page-heading">오늘의 1회 학습</h1>
          <p className="page-subtitle">
            {mission.date} · D-{mission.dday} · {mission.title}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge tone={mission.completedAt ? 'green' : 'blue'}>
            {mission.completedAt ? '오늘 완료됨' : '진행 중'}
          </Badge>
          <Badge tone="amber">streak {streak}</Badge>
        </div>
      </div>

      <Card
        title="미션 구성"
        action={
          mission.completedAt ? (
            <Link className={buttonClassName()} to="/review">
              <NotebookTabs className="h-4 w-4" />
              추가 복습
            </Link>
          ) : null
        }
      >
        <div className="grid gap-3 sm:grid-cols-4">
          <div className="rounded-xl bg-surface-muted p-4 dark:bg-slate-800">
            <p className="text-xs font-bold text-ink-muted dark:text-slate-400">총 문항</p>
            <p className="mt-2 text-2xl font-bold">{mission.questionIds.length}</p>
          </div>
          <div className="rounded-xl bg-surface-muted p-4 dark:bg-slate-800">
            <p className="text-xs font-bold text-ink-muted dark:text-slate-400">코드 trace 필수</p>
            <p className="mt-2 text-2xl font-bold">{mission.requiredCodeTraceCount}</p>
          </div>
          <div className="rounded-xl bg-surface-muted p-4 dark:bg-slate-800">
            <p className="text-xs font-bold text-ink-muted dark:text-slate-400">오답 복습</p>
            <p className="mt-2 text-2xl font-bold">{mission.requiredWrongReviewCount}</p>
          </div>
          <div className="rounded-xl bg-surface-muted p-4 dark:bg-slate-800">
            <p className="text-xs font-bold text-ink-muted dark:text-slate-400">현재 풀이</p>
            <p className="mt-2 text-2xl font-bold">{score.solved}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {mission.focus.map((item) => (
            <Badge key={item} tone="blue">
              {item}
            </Badge>
          ))}
        </div>
        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-xs font-bold text-ink-muted dark:text-slate-400">
            <span>오늘 세트 진행률</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-surface-muted dark:bg-slate-800">
            <div className="h-full rounded-full bg-brand-secondary" style={{ width: `${Math.min(progressPercent, 100)}%` }} />
          </div>
        </div>
      </Card>

      {mission.completedAt ? (
        <Card title="오늘 완료">
          <div className="grid gap-3 sm:grid-cols-4">
            <div>
              <p className="text-sm text-ink-muted dark:text-slate-400">오늘 점수</p>
              <p className="mt-2 text-2xl font-bold">
                {mission.score ?? score.score} / {mission.total ?? score.total}
              </p>
            </div>
            <div>
              <p className="text-sm text-ink-muted dark:text-slate-400">틀린 태그</p>
              <p className="mt-2 text-sm font-bold">{(mission.weakTagsAfterSession ?? score.weakTags).join(', ') || '없음'}</p>
            </div>
            <div>
              <p className="text-sm text-ink-muted dark:text-slate-400">내일 집중</p>
              <p className="mt-2 text-sm font-bold">{tomorrowPlan?.title ?? '오답 복습'}</p>
            </div>
            <div>
              <p className="text-sm text-ink-muted dark:text-slate-400">streak</p>
              <p className="mt-2 text-2xl font-bold">{streak}</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link className={buttonClassName()} to="/review">
              <NotebookTabs className="h-4 w-4" />
              추가 복습
            </Link>
            <Link className={buttonClassName('secondary')} to="/">
              <CheckCircle2 className="h-4 w-4" />
              오늘 끝
            </Link>
          </div>
        </Card>
      ) : (
        <>
          <QuestionSolver questions={missionQuestions} mode="daily" title="Daily Mission 풀이" onAnswered={refresh} />
          <Card
            title="미션 완료"
            action={
              <Button
                variant="primary"
                icon={<PlayCircle className="h-4 w-4" />}
                disabled={!canComplete}
                onClick={async () => {
                  if (!canComplete) return;
                  const completed = await completeDailyMission(mission.date, {
                    score: score.score,
                    total: score.total,
                    weakTagsAfterSession: score.weakTags,
                  });
                  setMission(completed);
                  await refresh();
                }}
              >
                {canComplete ? '완료 체크' : `${remainingCount}문항 남음`}
              </Button>
            }
          >
            <p className="text-sm text-ink-muted dark:text-slate-400">
              오늘 한 세트를 모두 풀면 완료 체크가 활성화됩니다. 같은 날짜에는 중복 완료 기록을 만들지 않습니다.
            </p>
          </Card>
        </>
      )}
    </div>
  );
}
