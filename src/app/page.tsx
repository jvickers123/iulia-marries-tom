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
import RsvpModal from '@/components/RsvpModal';
import Gifts from '@/components/Gifts';
import FoodInfo from '@/components/FoodInfo';
import ContactUs from '@/components/ContactUs';
import Timings from '@/components/Timings';
import OrderFoodModal from '@/components/OrderFoodModal';
import Notices from '@/components/Notices';

export default function Home() {
  const [showPanels, setShowPanels] = useState(emptyShowPanels);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <Background />
      <Flowers />
      <ThemeProvider theme={theme}>
        <DrawerMenu
          setShowPanels={setShowPanels}
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />
        <main className="main">
          <TitleSign setIsDrawerOpen={setIsDrawerOpen} />
          <Info
            closeModal={() =>
              setShowPanels(prev => ({ ...prev, generalInfo: false }))
            }
            showMoreInfo={showPanels.generalInfo}
          />
          <Gifts
            closeModal={() => setShowPanels(prev => ({ ...prev, gift: false }))}
            showGifts={showPanels.gift}
          />
          <FoodInfo
            closeModal={() =>
              setShowPanels(prev => ({ ...prev, foodInfo: false }))
            }
            openOrderFood={() =>
              setShowPanels(prev => ({ ...prev, orderFood: true }))
            }
            showFoodInfo={showPanels.foodInfo}
          />

          <OrderFoodModal
            closeModal={() =>
              setShowPanels(prev => ({ ...prev, orderFood: false }))
            }
            showModal={showPanels.orderFood}
            openFoodInfo={() =>
              setShowPanels(prev => ({
                ...prev,
                foodInfo: true,
                orderFood: false,
              }))
            }
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
          <RsvpModal
            closeModal={() =>
              setShowPanels(prev => ({
                ...prev,
                rsvp: false,
              }))
            }
            showRSVP={showPanels.rsvp}
          />

          <Timings
            closeModal={() =>
              setShowPanels(prev => ({
                ...prev,
                timings: false,
              }))
            }
            showTimings={showPanels.timings}
          />

          <ContactUs
            closeModal={() =>
              setShowPanels(prev => ({
                ...prev,
                contact: false,
              }))
            }
            showContactUs={showPanels.contact}
          />
          <Notices
            closeModal={() =>
              setShowPanels(prev => ({
                ...prev,
                notices: false,
              }))
            }
            showNotices={showPanels.notices}
          />
        </main>
      </ThemeProvider>
    </>
  );
}
