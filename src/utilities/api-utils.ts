import { RSVPData } from '@/types/rsvp-types';
import axios from 'axios';
import { SetStateAction } from 'react';
import { initialRSVPState } from './form-utils';

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

export const sendRSVP = async ({
  rsvpData,
  setLoading,
  setError,
  setSuccess,
  setAttending,
  setMaybe,
  setRSVPData,
}: {
  rsvpData: RSVPData;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
  setError: React.Dispatch<SetStateAction<boolean>>;
  setSuccess: React.Dispatch<SetStateAction<boolean>>;
  setAttending: React.Dispatch<SetStateAction<boolean>>;
  setMaybe: React.Dispatch<SetStateAction<boolean>>;
  setRSVPData: React.Dispatch<SetStateAction<RSVPData>>;
}) => {
  setLoading(true);
  setError(false);
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_FIRE_BASE_URL}/RSVPS.json`,
      rsvpData
    );
    setSuccess(true);

    if (rsvpData.attending === 'yes') {
      setAttending(true);
    }
    if (rsvpData.attending === 'maybe') {
      setMaybe(true);
    }

    setRSVPData(initialRSVPState);
  } catch (error) {
    console.error(error);
    setError(true);
  } finally {
    setLoading(false);
  }
};
