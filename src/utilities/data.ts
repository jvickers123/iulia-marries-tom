import { Guests, Notice, Tent } from '@/types/admin-types';
import { fetchAccomodationAndGuests } from './api-utils';

export const getData = async ({
  setLoading,
  setGuests,
  setTents,
  setNotices,
}: {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTents: React.Dispatch<React.SetStateAction<Tent[]>>;
  setGuests: React.Dispatch<React.SetStateAction<Guests[]>>;
  setNotices: React.Dispatch<React.SetStateAction<Notice[]>>;
}) => {
  setLoading(true);
  const data = await fetchAccomodationAndGuests();
  setLoading(false);

  if (!data) return;

  setGuests(data.guests);
  setTents(data.accomodation);
  setNotices(data.notices);
};

export const getGuestNamesOneString = (guests?: Guests[]) => {
  if (!guests) return '';
  return guests.reduce((acc, guest) => `${acc && `${acc}, `}${guest.name}`, '');
};
