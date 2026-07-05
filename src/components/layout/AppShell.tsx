import {
  BarChart3,
  BookOpen,
  CalendarDays,
  Database,
  FileUp,
  GraduationCap,
  Home,
  Moon,
  NotebookPen,
  Search,
  Settings,
  Sparkles,
  Sun,
  TimerReset,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { TextInput } from '../ui/Field';

interface AppShellProps {
  children: ReactNode;
  darkMode: boolean;
  onDarkModeChange: (value: boolean) => void;
}

const navItems = [
  { to: '/', label: '대시보드', icon: Home },
  { to: '/study', label: '오늘 학습', icon: GraduationCap },
  { to: '/questions', label: '문제은행', icon: BookOpen },
  { to: '/quiz', label: '퀴즈', icon: Sparkles },
  { to: '/trend-2026-1', label: '2026 1회', icon: BarChart3 },
  { to: '/mock', label: '모의고사', icon: TimerReset },
  { to: '/wrong', label: '오답노트', icon: NotebookPen },
  { to: '/review', label: '복습', icon: CalendarDays },
  { to: '/plan', label: '플랜', icon: Database },
  { to: '/import', label: 'Import', icon: FileUp },
  { to: '/settings', label: '설정', icon: Settings },
];

export function AppShell({ children, darkMode, onDarkModeChange }: AppShellProps) {
  const [keyword, setKeyword] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key !== '/') return;
      const target = event.target as HTMLElement | null;
      if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.tagName === 'SELECT') return;
      event.preventDefault();
      searchRef.current?.focus();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-brand-container bg-brand-primary text-white shadow-[0_1px_2px_rgba(15,23,42,0.16)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            <button
              className="focus-ring flex items-center gap-3 rounded-xl text-left"
              onClick={() => navigate('/')}
              type="button"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-secondary text-sm font-bold text-white">
                GI
              </span>
              <span>
                <span className="block text-sm font-semibold">GISA Silgi 2026 Lab</span>
                <span className="block text-xs text-slate-300">로컬 우선 학습 도구</span>
              </span>
            </button>
            <div className="flex items-center gap-2">
              <form
                className="hidden w-64 sm:block"
                onSubmit={(event) => {
                  event.preventDefault();
                  navigate(`/questions?q=${encodeURIComponent(keyword)}`);
                }}
              >
                <label className="relative block">
                  <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <TextInput
                    ref={searchRef}
                    aria-label="검색"
                    className="border-slate-700 bg-brand-container pl-9 text-white placeholder:text-slate-400"
                    placeholder="/ 검색"
                    value={keyword}
                    onChange={(event) => setKeyword(event.target.value)}
                  />
                </label>
              </form>
              <Button
                aria-label={darkMode ? '라이트 모드' : '다크 모드'}
                className="border-slate-700 bg-brand-container text-white hover:bg-slate-700"
                icon={darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                onClick={() => onDarkModeChange(!darkMode)}
              />
            </div>
          </div>
          <nav className="flex gap-1 overflow-x-auto pb-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `focus-ring inline-flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition ${
                      isActive
                        ? 'bg-white text-brand-primary'
                        : 'text-slate-300 hover:bg-brand-container hover:text-white'
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-8">{children}</main>
    </div>
  );
}
