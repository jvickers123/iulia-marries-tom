'use client';

import Background from '../components/Background';
import '../styles/main.scss';
import Flowers from '../components/Flowers';
import TitleSign from '../components/TitleSign';
import { ThemeProvider } from '@mui/material';
import theme from '../utilities/theme';
import DrawerMenu from '@/components/DrawerMenu';
import { useState } from 'react';
import { emptyShowPanels } from '@/utilities/ui';
import Info from '@/components/Info';
import AccomodationInfo from '@/components/AccomodationInfo';
import BookAccomodationModal from '@/components/BookAccomodationModal';

export default function Home() {
  const [showPanels, setShowPanels] = useState(emptyShowPanels);

  return (
    <>
      <Background />
      <Flowers />
      <ThemeProvider theme={theme}>
        <DrawerMenu setShowPanels={setShowPanels} />
        <main className="main">
          <TitleSign />
          <Info
            closeModal={() =>
              setShowPanels(prev => ({ ...prev, generalInfo: false }))
            }
            showMoreInfo={showPanels.generalInfo}
          />
          <AccomodationInfo
            closeModal={() =>
              setShowPanels(prev => ({ ...prev, accomodationInfo: false }))
            }
            openBookAccomodation={() =>
              setShowPanels(prev => ({ ...prev, bookAccomodation: true }))
            }
            showMoreInfo={showPanels.accomodationInfo}
          />
          <BookAccomodationModal
            closeModal={() =>
              setShowPanels(prev => ({
                ...prev,
                bookAccomodation: false,
              }))
            }
            openAccomodationInfo={() =>
              setShowPanels(prev => ({
                ...prev,
                bookAccomodation: false,
                accomodationInfo: true,
              }))
            }
            showModal={showPanels.bookAccomodation}
          />
        </main>
      </ThemeProvider>
    </>
  );
}
