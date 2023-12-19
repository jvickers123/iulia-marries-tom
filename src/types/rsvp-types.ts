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
  fullDay: boolean;
};
