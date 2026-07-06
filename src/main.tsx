import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import App from './App';

const redirectPath = sessionStorage.getItem('gisa-lab-redirect');
if (redirectPath) {
  sessionStorage.removeItem('gisa-lab-redirect');
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  window.history.replaceState(null, '', `${base}${redirectPath}`);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
