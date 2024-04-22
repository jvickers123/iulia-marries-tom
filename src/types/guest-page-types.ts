export type RSVPData = {
  email: string;
  attending: 'yes' | 'no' | 'maybe';
  notes: string;
  people: RSVPGuest[];
  id?: string;
};

export enum ModalVariant {
  DEFAULT = 'default',
  INFO = 'info',
}

export type RSVPGuest = {
  id: string;
  name: string;
  fullDay?: boolean;
  email?: string;
};

export type ShowPanels = {
  generalInfo: boolean;
  accomodationInfo: boolean;
  bookAccomodation: boolean;
  rsvp: boolean;
  gift: boolean;
};

export type TentPrices = {
  initialPrice: number;
  minPeople: number;
  maxPeople: number;
  pricePerExtra: number;
};

export type TentCosts = {
  emptyTent: TentPrices;
  partyTent: TentPrices;
  luxuryTent: TentPrices;
};

export type TentData = {
  email: string;
  type: 'empty' | 'party' | 'luxury';
  guests: RSVPGuest[];
  id?: string;
  notes: string;
  price: number;
  name: string;
};
