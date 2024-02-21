export type LoginData = { email: string; password: string };

export type Guests = {
  name: string;
  id: string;
  email?: string;
  slug?: string;
  accomodation?: string;
  attending?: 'yes' | 'no' | 'maybe' | 'not-responded';
  price?: string;
  fullDay?: boolean;
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
