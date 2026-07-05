import { Moon, RotateCcw } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { resetLocalData } from '../db/repository';
import { useLocalSetting } from '../hooks/useLocalSetting';

interface SettingsPageProps {
  darkMode: boolean;
  onDarkModeChange: (value: boolean) => void;
}

export function SettingsPage({ darkMode, onDarkModeChange }: SettingsPageProps) {
  const [strictCodeOutput, setStrictCodeOutput] = useLocalSetting('gisa-lab-strict-code-output', false);

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
        <Button
          icon={<RotateCcw className="h-4 w-4" />}
          variant="danger"
          onClick={async () => {
            await resetLocalData();
            window.location.reload();
          }}
        >
          샘플 데이터로 초기화
        </Button>
      </Card>
    </div>
  );
}
