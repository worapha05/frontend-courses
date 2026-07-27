import { createTheme } from '@mui/material/styles';

/**
 * Harbor Enterprise Theme
 * Tokens → MUI palette/typography/shape → component overrides
 */
export const harborTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0f766e',
      dark: '#115e59',
      light: '#14b8a6',
      contrastText: '#ecfdf5',
    },
    secondary: {
      main: '#b45309',
      contrastText: '#fff7ed',
    },
    background: {
      default: '#f6f4ef',
      paper: '#ffffff',
    },
    text: {
      primary: '#1c1917',
      secondary: '#78716c',
    },
  },
  typography: {
    fontFamily: '"Source Sans 3", "Sarabun", system-ui, sans-serif',
    h1: {
      fontFamily: '"Fraunces", Georgia, serif',
      fontWeight: 700,
      fontSize: 'clamp(1.75rem, 1.2rem + 1.5vw, 2.75rem)',
    },
    button: {
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 999,
          paddingInline: 16,
        },
      },
      variants: [
        {
          props: { variant: 'outlined', color: 'primary' },
          style: {
            borderWidth: 1.5,
          },
        },
      ],
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});
