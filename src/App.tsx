import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { useTheme } from './hooks/useTheme';
import { DashboardPage } from './routes/DashboardPage';
import { DailyPage } from './routes/DailyPage';
import { ImportPage } from './routes/ImportPage';
import { MockPage } from './routes/MockPage';
import { PlanPage } from './routes/PlanPage';
import { QuestionsPage } from './routes/QuestionsPage';
import { RecentThreeYearsPage } from './routes/RecentThreeYearsPage';
import { QuizPage } from './routes/QuizPage';
import { ReviewPage } from './routes/ReviewPage';
import { SettingsPage } from './routes/SettingsPage';
import { StudyPage } from './routes/StudyPage';
import { TrendPage } from './routes/TrendPage';
import { WrongPage } from './routes/WrongPage';

export default function App() {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppShell darkMode={darkMode} onDarkModeChange={setDarkMode}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/daily" element={<DailyPage />} />
          <Route path="/study" element={<StudyPage />} />
          <Route path="/questions" element={<QuestionsPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/trend-2026-1" element={<TrendPage />} />
          <Route path="/recent-3-years" element={<RecentThreeYearsPage />} />
          <Route path="/mock" element={<MockPage />} />
          <Route path="/wrong" element={<WrongPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/plan" element={<PlanPage />} />
          <Route path="/import" element={<ImportPage />} />
          <Route path="/settings" element={<SettingsPage darkMode={darkMode} onDarkModeChange={setDarkMode} />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}
