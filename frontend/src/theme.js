import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#0f766e' },
    secondary: { main: '#f97316' },
    background: { default: '#f5f7f8' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: { borderRadius: 10 },
});

export default theme;
