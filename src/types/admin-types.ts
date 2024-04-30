export type LoginData = { email: string; password: string };

export type Guests = {
  name: string;
  id: string;
  email?: string;
  encryptedEmail?: string;
  slug?: string;
  accomodation?: string;
  accomodationTents?: TentForm;
  attending?: 'yes' | 'no' | 'maybe' | 'not-responded';
  price?: string;
  fullDay?: boolean;
  lunch?: 'lamb' | 'salmon' | 'veggie' | 'vegan' | 'none';
  hotdog?: 'classic' | 'fish' | 'halloumi' | 'tofu' | 'none';
  dietryRequirements?: string;
  notes?: string;
};

type TentBase = {
  name: string;
  id: string;
  type: 'party' | 'empty' | 'luxury';
  slug?: string;
  users?: [];
  paid: boolean;
  price: number;
  notes?: string;
};

export type Tent = TentBase & {
  guests: Guests[];
};

export type TentForm = TentBase & {
  guests: string[];
};

export type FoodTotals = {
  lamb: number;
  salmon: number;
  veggie: number;
  vegan: number;
  classic: number;
  fish: number;
  halloumi: number;
  tofu: number;
}