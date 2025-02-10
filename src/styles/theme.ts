import { createTheme, ThemeOptions } from '@mui/material/styles';

const defaultTheme = createTheme();

export const headerMinHeight = 84;
export const footerMinHeight = 152;

const customTheme: ThemeOptions = {
  palette: {
    mode: 'light',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1500,
    },
  },
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: headerMinHeight,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: defaultTheme.palette.error.main,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          'color': defaultTheme.palette.text.secondary,
          '&.Mui-focused': {
            // Убрал изменение цвета на focus
            color: defaultTheme.palette.text.secondary,
          },
        },
      },
    },
  },
};

export const theme = createTheme(customTheme);
