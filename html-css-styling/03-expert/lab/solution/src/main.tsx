import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { HarborThemeProvider } from './HarborThemeProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HarborThemeProvider>
      <App />
    </HarborThemeProvider>
  </StrictMode>,
);
