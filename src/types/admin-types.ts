export type LoginData = { email: string; password: string };

export type Guests = {
  name: string;
  id: string;
  email?: string;
  slug?: string;
  accomodation?: string;
  attending?: 'yes' | 'no' | 'maybe' | 'not-responded';
  price: string;
  fullDay?: boolean;
  notes?: string;
};
