import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createHarborTheme } from './theme/harborTheme';

type ColorModeContextValue = {
  mode: 'light' | 'dark';
  toggle: () => void;
};

const ColorModeContext = createContext<ColorModeContextValue>({
  mode: 'light',
  toggle: () => {},
});

export function useColorMode() {
  return useContext(ColorModeContext);
}

function readInitialMode(): 'light' | 'dark' {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.getAttribute('data-color-scheme') === 'dark' ? 'dark' : 'light';
}

export function HarborThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark'>(readInitialMode);
  const theme = useMemo(() => createHarborTheme(mode), [mode]);

  useEffect(() => {
    document.documentElement.setAttribute('data-color-scheme', mode);
    localStorage.setItem('harbor-theme', mode);
  }, [mode]);

  const value = useMemo(
    () => ({
      mode,
      toggle: () => setMode((m) => (m === 'dark' ? 'light' : 'dark')),
    }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
