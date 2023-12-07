'use client';

import '../../styles/main.scss';

import { RSVPData } from '@/types/rsvp-types';
import { fetchRSVPS } from '@/utilities/api-utils';
import { useEffect, useState } from 'react';
import RSVPTable from '../../components/RSVPTable';

const Admin = () => {
  const [RSVPs, setRSVPs] = useState<RSVPData[]>([]);

  useEffect(() => {
    fetchRSVPS(setRSVPs);
  }, []);

  return (
    <main>
      <h1>RSVPs</h1>

      <RSVPTable rsvps={RSVPs} />
    </main>
  );
};

export default Admin;
