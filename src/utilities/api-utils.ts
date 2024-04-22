import { RSVPData, RSVPGuest, TentData } from '@/types/guest-page-types';
import axios from 'axios';
import React, { Dispatch, SetStateAction } from 'react';
import { emptyGuest, initialRSVPState } from './form-utils';
import { Guests, LoginData, TentForm } from '@/types/admin-types';
import { getTokenFromLocal } from './auth';

export const fetchAccomodationAndGuests = async () => {
  try {
    const token = getTokenFromLocal();

    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/all`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchGuests = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/guests`
    );
    return data.data as Guests[];
  } catch (error) {
    console.error(error);
  }
};

export const sendRSVP = async ({
  rsvpData,
  setLoading,
  setError,
  setSuccess,
  setAttending,
  setMaybe,
  setRSVPData,
  setRecievedPeople,
}: {
  rsvpData: RSVPData;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
  setError: React.Dispatch<SetStateAction<boolean>>;
  setSuccess: React.Dispatch<SetStateAction<boolean>>;
  setAttending: React.Dispatch<SetStateAction<boolean>>;
  setMaybe: React.Dispatch<SetStateAction<boolean>>;
  setRSVPData: React.Dispatch<SetStateAction<RSVPData>>;
  setRecievedPeople: React.Dispatch<SetStateAction<RSVPGuest[]>>;
}) => {
  setLoading(true);
  setError(false);
  try {
    rsvpData.people.forEach(async person => {
      await editGuest({
        body: {
          id: person.id,
          name: person.name,
          fullDay: person.fullDay!,
          attending: rsvpData.attending,
          notes: rsvpData.notes,
          email: rsvpData.email,
        },
        setLoading,
        setError,
        setShowSuccessToast: setSuccess,
      });
    });

    if (rsvpData.attending === 'yes') {
      setAttending(true);
    }
    if (rsvpData.attending === 'maybe') {
      setMaybe(true);
    }
    setRecievedPeople(rsvpData.people);
    setRSVPData(initialRSVPState);
  } catch (error) {
    console.error(error);
    setError(true);
  }
};

export const sendPaymentEmail = async (booking: TentData) => {
  const message = `Hi,

Thanks for booking accomodation for Thomas and Iulia's wedding!
  
Your booking is as follows: 

Type: ${booking.type} tent 
Guests: ${booking.name}
Cost: £${booking.price}.

In order to pay please send a bank transfer to:

Account Name: ${process.env.NEXT_PUBLIC_ACCOUNT_NAME}
Sort Code: ${process.env.NEXT_PUBLIC_SORT_CODE}
Account Number: ${process.env.NEXT_PUBLIC_ACCOUNT_NUMBER}

Thanks and looking forward to seeing you there,

Thomas and Iulia xxx
  `;
  try {
    await axios.post(`${process.env.NEXT_PUBLIC_SEND_EMAIL_URL}`, {
      email: booking.email,
      message,
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendGiftEmail = async ({
  setError,
  setSuccess,
  setLoading,
  email,
}: {
  setSuccess: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<boolean>>;
  email: string;
}) => {
  const message = `Hi,

Thank you for offering to send a gift! We are really grateful for any contribution.

We are planning to go on a honeymoon and to renovate our house in the future so any contribution towards either of these would be very much appreciated.

In order to pay please send a bank transfer to:

Account Name: ${process.env.NEXT_PUBLIC_ACCOUNT_NAME}
Sort Code: ${process.env.NEXT_PUBLIC_SORT_CODE}
Account Number: ${process.env.NEXT_PUBLIC_ACCOUNT_NUMBER}

Thanks and looking forward to seeing you at the wedding,

Thomas and Iulia xxx
  `;
  try {
    setLoading(true);
    await axios.post(`${process.env.NEXT_PUBLIC_SEND_EMAIL_URL}`, {
      email,
      message,
    });
    setSuccess(true);
  } catch (error) {
    console.log(error);
    setError(true);
  } finally {
    setLoading(false);
  }
};

export const bookAccomodation = async ({
  accomodationData,
  setLoading,
  setSuccess,
  setError,
}: {
  accomodationData: TentData;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
  setSuccess: React.Dispatch<SetStateAction<boolean>>;
  setError: React.Dispatch<SetStateAction<boolean>>;
}) => {
  setLoading(true);

  try {
    const guestIds = accomodationData.guests.map(guest => guest.id);

    const formattedData = { ...accomodationData, guests: guestIds };

    await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/accomodation`,
      formattedData
    );

    setSuccess(true);
    sendPaymentEmail(accomodationData);
  } catch (error) {
    console.error(error);
    setError(true);
  } finally {
    setLoading(false);
  }
};

export const login = async ({
  formData,
  setError,
  setFormData,
  setLoading,
  setIsLoggedIn,
}: {
  formData: LoginData;
  setError: React.Dispatch<SetStateAction<boolean>>;
  setFormData: React.Dispatch<SetStateAction<LoginData>>;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
  setIsLoggedIn: React.Dispatch<SetStateAction<boolean>>;
}) => {
  setLoading(true);
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/login`,
      formData
    );
    window.localStorage.setItem('token-wedding', data.token);
    setFormData({ email: '', password: '' });
    setIsLoggedIn(true);
  } catch (error) {
    console.error(error);
    setError(true);
  } finally {
    setLoading(false);
  }
};

export const editGuest = async ({
  body,
  setLoading,
  setError,
  setShowSuccessToast,
}: {
  body: Guests;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
  setError: React.Dispatch<SetStateAction<boolean>>;
  setShowSuccessToast: React.Dispatch<SetStateAction<boolean>>;
}) => {
  setLoading(true);
  try {
    await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/guests/${body.id}`,
      body
    );
    setShowSuccessToast(true);
  } catch (error) {
    console.error(error);
    setError(true);
  } finally {
    setLoading(false);
  }
};

export const editAccomodation = async ({
  body,
  setLoading,
  setError,
  setShowSuccessToast,
}: {
  body: TentForm;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
  setError: React.Dispatch<SetStateAction<boolean>>;
  setShowSuccessToast: React.Dispatch<SetStateAction<boolean>>;
}) => {
  setLoading(true);
  try {
    const token = getTokenFromLocal();

    await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/accomodation/${body.id}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setShowSuccessToast(true);
  } catch (error) {
    console.error(error);
    setError(true);
  } finally {
    setLoading(false);
  }
};

export const addGuest = async ({
  body,
  setLoading,
  setError,
  setShowSuccessToast,
  setFormData,
}: {
  body: Guests;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
  setError: React.Dispatch<SetStateAction<boolean>>;
  setShowSuccessToast: React.Dispatch<SetStateAction<boolean>>;
  setFormData: React.Dispatch<SetStateAction<Guests>>;
}) => {
  setLoading(true);
  try {
    const token = getTokenFromLocal();

    await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/guests/`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setShowSuccessToast(true);
    setFormData(emptyGuest);
  } catch (error) {
    console.error(error);
    setError(true);
  } finally {
    setLoading(false);
  }
};

export const updateOrAddGuest = async ({
  edit = true,
  data,
  setLoading,
  setError,
  setShowSuccessToast,
  setFormData,
}: {
  data: Guests;
  edit?: boolean;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
  setError: React.Dispatch<SetStateAction<boolean>>;
  setShowSuccessToast: React.Dispatch<SetStateAction<boolean>>;
  setFormData: React.Dispatch<SetStateAction<Guests>>;
}) => {
  if (edit) {
    editGuest({ body: data, setLoading, setError, setShowSuccessToast });

    return;
  }

  addGuest({
    body: data,
    setLoading,
    setError,
    setShowSuccessToast,
    setFormData,
  });
};

export const deleteGuest = async ({
  guestId,
  setError,
  setLoading,
  setShowSuccessToast,
  isAccomodation,
}: {
  guestId: string;
  setError: React.Dispatch<SetStateAction<boolean>>;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
  setShowSuccessToast: React.Dispatch<SetStateAction<boolean>>;
  isAccomodation: boolean;
}) => {
  setLoading(true);
  try {
    const token = getTokenFromLocal();

    await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/${
        isAccomodation ? 'accomodation' : 'guests'
      }/${guestId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setShowSuccessToast(true);
  } catch (error) {
    console.error(error);
    setError(true);
  } finally {
    setLoading(false);
  }
};
