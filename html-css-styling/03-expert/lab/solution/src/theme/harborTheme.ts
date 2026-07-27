import { createTheme, type Theme } from '@mui/material/styles';

export function createHarborTheme(mode: 'light' | 'dark' = 'light'): Theme {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#0f766e',
        dark: '#115e59',
        light: '#14b8a6',
        contrastText: '#ecfdf5',
      },
      secondary: { main: '#b45309' },
      background: isDark
        ? { default: '#0c0a09', paper: '#1c1917' }
        : { default: '#f6f4ef', paper: '#ffffff' },
      text: isDark
        ? { primary: '#fafaf9', secondary: '#a8a29e' }
        : { primary: '#1c1917', secondary: '#78716c' },
    },
    typography: {
      fontFamily: '"Source Sans 3", "Sarabun", system-ui, sans-serif',
      h4: {
        fontFamily: '"Fraunces", Georgia, serif',
        fontWeight: 700,
        fontSize: 'clamp(1.5rem, 1.1rem + 1.2vw, 2.25rem)',
      },
      button: {
        textTransform: 'none',
        fontWeight: 700,
      },
    },
    shape: { borderRadius: 10 },
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: { borderRadius: 999, paddingInline: 16 },
        },
      },
    },
  });
}

/** theme เริ่มต้น (light) — ใช้ตอน SSR / first paint */
export const harborTheme = createHarborTheme('light');
