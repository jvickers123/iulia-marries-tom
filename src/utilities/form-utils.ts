import { Guests, TentForm } from '@/types/admin-types';
import { RSVPData, RSVPGuest, TentData } from '@/types/guest-page-types';
import { fetchGuests } from './api-utils';

export const initialAccomodationState: TentData = {
  email: '',
  guests: [],
  type: 'empty',
  notes: '',
};

export const initialRSVPState: RSVPData = {
  email: '',
  attending: 'yes',
  notes: '',
  people: [],
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

export const emptyAccomodation: TentForm = {
  name: '',
  id: '',
  type: 'empty',
  guests: [],
  paid: false,
  price: 0,
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
