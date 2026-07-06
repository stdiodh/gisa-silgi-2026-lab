import { AlertTriangle, Database, Moon, RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { getLocalDataCounts, resetLocalData, resetStudyProgress } from '../db/repository';
import { useLocalSetting } from '../hooks/useLocalSetting';

interface SettingsPageProps {
  darkMode: boolean;
  onDarkModeChange: (value: boolean) => void;
}

export function SettingsPage({ darkMode, onDarkModeChange }: SettingsPageProps) {
  const [strictCodeOutput, setStrictCodeOutput] = useLocalSetting('gisa-lab-strict-code-output', false);
  const [counts, setCounts] = useState<Awaited<ReturnType<typeof getLocalDataCounts>> | null>(null);
  const [message, setMessage] = useState('');

  const refreshCounts = async () => {
    setCounts(await getLocalDataCounts());
  };

  useEffect(() => {
    void refreshCounts();
  }, []);

  const learningRecordCount = counts
    ? counts.attempts +
      counts.reviews +
      counts.sessions +
      counts.mockResults +
      counts.dailyMissions +
      counts.wrongAnalyses +
      counts.userTraceSteps
    : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="page-heading">설정</h1>
        <p className="page-subtitle">브라우저 로컬 저장소와 화면 옵션을 관리합니다.</p>
      </div>

      <Card title="화면 / 채점">
        <div className="space-y-3">
          <label className="flex items-center justify-between gap-3 rounded-xl bg-surface-muted px-4 py-3 dark:bg-slate-800">
            <span className="text-sm font-medium">다크 모드</span>
            <Button icon={<Moon className="h-4 w-4" />} onClick={() => onDarkModeChange(!darkMode)}>
              {darkMode ? '켜짐' : '꺼짐'}
            </Button>
          </label>
          <label className="flex items-center justify-between gap-3 rounded-xl bg-surface-muted px-4 py-3 dark:bg-slate-800">
            <span className="text-sm font-medium">코드 출력 엄격 채점</span>
            <input
              checked={strictCodeOutput}
              className="h-5 w-5 accent-brand-secondary"
              type="checkbox"
              onChange={(event) => setStrictCodeOutput(event.target.checked)}
            />
          </label>
        </div>
      </Card>

      <Card title="로컬 데이터">
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-4">
            <div className="rounded-xl bg-surface-muted p-4 dark:bg-slate-800">
              <p className="text-xs font-bold text-ink-muted dark:text-slate-400">문제은행</p>
              <p className="mt-2 text-2xl font-bold">{counts?.questions ?? '-'}</p>
            </div>
            <div className="rounded-xl bg-surface-muted p-4 dark:bg-slate-800">
              <p className="text-xs font-bold text-ink-muted dark:text-slate-400">풀이 기록</p>
              <p className="mt-2 text-2xl font-bold">{counts?.attempts ?? '-'}</p>
            </div>
            <div className="rounded-xl bg-surface-muted p-4 dark:bg-slate-800">
              <p className="text-xs font-bold text-ink-muted dark:text-slate-400">오답 분석</p>
              <p className="mt-2 text-2xl font-bold">{counts?.wrongAnalyses ?? '-'}</p>
            </div>
            <div className="rounded-xl bg-surface-muted p-4 dark:bg-slate-800">
              <p className="text-xs font-bold text-ink-muted dark:text-slate-400">복습 상태</p>
              <p className="mt-2 text-2xl font-bold">{counts?.reviews ?? '-'}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-line-subtle bg-surface-muted p-4 dark:border-slate-800 dark:bg-slate-800">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Database className="h-5 w-5 text-brand-secondary" />
                  <p className="font-bold">학습 기록만 초기화</p>
                  <Badge tone="green">문제은행 유지</Badge>
                </div>
                <p className="mt-2 text-sm leading-6 text-ink-muted dark:text-slate-400">
                  풀이 기록, 오답노트, 복습 예약, Daily Mission, 모의고사 결과, trace 기록을 모두 지웁니다.
                  샘플 문제와 직접 import한 문제는 유지됩니다.
                </p>
              </div>
              <Button
                disabled={!learningRecordCount}
                icon={<RotateCcw className="h-4 w-4" />}
                variant="danger"
                onClick={async () => {
                  if (!window.confirm('풀이 기록, 오답노트, 복습 예약을 모두 초기화할까요? 문제은행은 유지됩니다.')) return;
                  await resetStudyProgress();
                  await refreshCounts();
                  setMessage('학습 기록을 초기화했습니다.');
                }}
              >
                기록 초기화
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-state-error bg-state-errorContainer p-4 text-red-950 dark:border-red-900 dark:bg-red-950 dark:text-red-100">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  <p className="font-bold">전체 로컬 DB 초기화</p>
                </div>
                <p className="mt-2 text-sm leading-6">
                  직접 import한 문제까지 삭제하고 기본 샘플 문제만 다시 생성합니다. 공개 저장소에는 영향이 없고 이 브라우저의 IndexedDB만 초기화됩니다.
                </p>
              </div>
              <Button
                icon={<RotateCcw className="h-4 w-4" />}
                variant="danger"
                onClick={async () => {
                  if (!window.confirm('정말 전체 로컬 DB를 초기화할까요? import한 문제도 삭제됩니다.')) return;
                  await resetLocalData();
                  await refreshCounts();
                  setMessage('전체 로컬 DB를 샘플 데이터 기준으로 초기화했습니다.');
                }}
              >
                전체 초기화
              </Button>
            </div>
          </div>

          {message && <p className="text-sm font-bold text-brand-tertiaryHover dark:text-emerald-300">{message}</p>}
        </div>
      </Card>
    </div>
  );
}
