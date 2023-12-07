'use client';

import Background from '../components/Background';
import '../styles/main.scss';
import Flowers from '../components/Flowers';
import TitleSign from '../components/TitleSign';
import { ThemeProvider } from '@mui/material';
import theme from '../utilities/theme';

export default function Home() {
  return (
    <>
      <Background />
      <Flowers />
      <ThemeProvider theme={theme}>
        <main className="main">
          <TitleSign />
        </main>
      </ThemeProvider>
    </>
  );
}
