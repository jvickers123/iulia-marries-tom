import { FoodTotals, Guests, TentForm } from '@/types/admin-types';
import { RSVPData, RSVPGuest, TentData } from '@/types/guest-page-types';
import { fetchGuests } from './api-utils';
import { tentCosts } from './accomodation';

export const initialAccomodationState: TentData = {
  encryptedEmail: '',
  guests: [],
  type: 'empty',
  notes: '',
  price: tentCosts.emptyTent.initialPrice,
  name: '',
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
  dietryRequirements: '',
  hotdog: 'none',
  lunch: 'none',
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
      email: guest.email,
      encryptedEmail: guest.encryptedEmail,
    }));

    return mappedData;
  } catch (error) {
    console.log(error);
  }
};

export const getTotalFood = (guests: Guests[]) => {
  const food = guests.reduce(
    (acc, guest) => {
      if (guest.lunch === 'lamb') acc.lamb += 1;
      if (guest.lunch === 'salmon') acc.salmon += 1;
      if (guest.lunch === 'veggie') acc.veggie += 1;
      if (guest.lunch === 'vegan') acc.vegan += 1;
      if (guest.hotdog === 'classic') acc.classic += 1;
      if (guest.hotdog === 'fish') acc.fish += 1;
      if (guest.hotdog === 'halloumi') acc.halloumi += 1;
      if (guest.hotdog === 'tofu') acc.tofu += 1;
      return acc;
    },
    {
      lamb: 0,
      salmon: 0,
      veggie: 0,
      vegan: 0,
      classic: 0,
      fish: 0,
      halloumi: 0,
      tofu: 0,
    }
  );

  return food as FoodTotals;
};
