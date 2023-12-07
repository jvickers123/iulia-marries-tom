import { RSVPData } from '@/types/rsvp-types';
import axios from 'axios';
import { SetStateAction } from 'react';

const processAxiosData = (data: any) => {
  return Object.keys(data).map(key => {
    return {
      id: key,
      ...data[key],
    };
  });
};

export const fetchRSVPS = async (
  setRSVPs: React.Dispatch<SetStateAction<RSVPData[]>>
) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_FIRE_BASE_URL}/RSVPS.json`
    );
    const processedData = processAxiosData(data);
    setRSVPs(processedData);
  } catch (error) {
    console.error(error);
  }
};

export const sendRSVP = async (rsvpData: RSVPData) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_FIRE_BASE_URL}/RSVPS.json`,
      rsvpData
    );
  } catch (error) {
    console.error(error);
  }
};
