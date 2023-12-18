import { Guests } from '@/types/admin-types';
import { RSVPData, RSVPGuest } from '@/types/rsvp-types';
import { fetchGuests } from './api-utils';

export const initialRSVPState: RSVPData = {
  email: '',
  attending: 'yes',
  notes: '',
  people: '',
};

export const emptyGuest: Guests = {
  name: '',
  id: '',
  email: '',
  accomodation: '',
  attending: 'not-responded',
  price: '',
  fullDay: false,
  notes: '',
};

export const getPeopleInfoFromAPI = async () => {
  try {
    const data = await fetchGuests();
    if (!data) throw new Error('No data returned from API');

    const mappedData: RSVPGuest[] = data.map(guest => ({
      id: guest.id,
      name: guest.name,
      fullDay: guest.fullDay,
    }));

    return mappedData;
  } catch (error) {
    console.log(error);
  }
};
