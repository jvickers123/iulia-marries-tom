import { createTheme } from '@mui/material/styles';
import { transport } from './fonts';

const theme = createTheme({
  typography: {
    button: {
      textTransform: 'none',
    },
    fontFamily: transport.style.fontFamily,
  },
  palette: {
    primary: {
      main: '#38b29f',
      dark: '#3d796f',
      contrastText: '#fff',
    },
  },
});

export default theme;
