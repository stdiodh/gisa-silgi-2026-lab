import { useEffect, useState } from 'react';

const themeKey = 'gisa-lab-theme';

export function useTheme() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem(themeKey) === 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem(themeKey, darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return { darkMode, setDarkMode };
}
