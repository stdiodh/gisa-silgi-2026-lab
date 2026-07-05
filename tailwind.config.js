/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'Pretendard',
          'Noto Sans KR',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Consolas', 'ui-monospace', 'monospace'],
      },
      colors: {
        brand: {
          primary: '#0F172A',
          container: '#1E293B',
          secondary: '#2563EB',
          secondaryHover: '#1D4ED8',
          secondaryContainer: '#DBEAFE',
          tertiary: '#10B981',
          tertiaryHover: '#059669',
          tertiaryContainer: '#D1FAE5',
        },
        surface: {
          neutral: '#F8FAFC',
          DEFAULT: '#FFFFFF',
          muted: '#F1F5F9',
          dark: '#020617',
        },
        ink: {
          DEFAULT: '#0F172A',
          muted: '#475569',
          subtle: '#64748B',
          inverse: '#FFFFFF',
        },
        line: {
          DEFAULT: '#CBD5E1',
          subtle: '#E2E8F0',
        },
        state: {
          success: '#22C55E',
          successContainer: '#DCFCE7',
          warning: '#F59E0B',
          warningContainer: '#FEF3C7',
          error: '#EF4444',
          errorHover: '#DC2626',
          errorContainer: '#FEE2E2',
          info: '#38BDF8',
          infoContainer: '#E0F2FE',
        },
        code: {
          bg: '#020617',
          text: '#E2E8F0',
        },
      },
    },
  },
  plugins: [],
};
