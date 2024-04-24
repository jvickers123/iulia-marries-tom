import { Guests } from './admin-types';

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
  foodInfo: boolean;
  orderFood: boolean;
  contact: boolean;
  timings: boolean;
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

export type FoodOptions = {
  lunch: LunchOptions;
  hotdog: HotdogOptions;
  dietryRequirements?: string;
};

export type FoodOrder = FoodOptions & {
  guestId: string;
  fullDay?: boolean;
  key: number;
};

export type LunchOptions = 'lamb' | 'salmon' | 'veggie' | 'vegan' | 'none';
export type HotdogOptions = 'classic' | 'fish' | 'halloumi' | 'tofu' | 'none';
