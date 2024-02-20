import { Guests, Tent } from '@/types/admin-types';
import { fetchAccomodationAndGuests } from './api-utils';

export const getData = async ({
  setLoading,
  setGuests,
  setTents,
}: {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTents: React.Dispatch<React.SetStateAction<Tent[]>>;
  setGuests: React.Dispatch<React.SetStateAction<Guests[]>>;
}) => {
  setLoading(true);
  const data = await fetchAccomodationAndGuests();
  setLoading(false);

  if (!data) return;

  setGuests(data.guests);
  setTents(data.accomodation);
};

export const getGuestNamesOneString = (guests?: Guests[]) => {
  if (!guests) return '';

  return guests.reduce((acc, guest) => `${acc && ', '}${guest.name}`, '');
};
