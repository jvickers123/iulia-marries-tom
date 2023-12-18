import { Guests } from '@/types/admin-types';
import { RSVPData } from '@/types/rsvp-types';

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
