'use client'; // This is a client component

import Background from './components/Background';
import './styles/main.scss';
import Flowers from './components/Flowers';
import TitleSign from './components/TitleSign';
import { useState } from 'react';
import RSVPForm from './components/RSVPForm';

export default function Home() {
  const [showRSVP, setShowRSVP] = useState(false);

  return (
    <>
      <Background />
      <Flowers />
      <main className="main">
        <TitleSign setShowRSVP={setShowRSVP} />
      </main>
      {showRSVP && <RSVPForm closeModal={() => setShowRSVP(false)} />}
    </>
  );
}
