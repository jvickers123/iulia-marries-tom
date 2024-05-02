import {
  FoodOrder,
  RSVPData,
  RSVPGuest,
  TentData,
} from '@/types/guest-page-types';
import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
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
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<boolean>>;
  setSuccess: Dispatch<SetStateAction<boolean>>;
  setAttending: Dispatch<SetStateAction<boolean>>;
  setMaybe: Dispatch<SetStateAction<boolean>>;
  setRSVPData: Dispatch<SetStateAction<RSVPData>>;
  setRecievedPeople: Dispatch<SetStateAction<RSVPGuest[]>>;
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

export const sendPaymentEmail = async ({
  booking,
  sendEmailToFirstGuest,
}: {
  booking: TentData;
  sendEmailToFirstGuest: boolean;
}) => {
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

  const body = sendEmailToFirstGuest
    ? { encryptedEmail: booking.encryptedEmail, message }
    : { email: booking.email, message };

  try {
    await axios.post(`${process.env.NEXT_PUBLIC_SEND_EMAIL_URL}`, body);
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

If you would like to give a cash gift please use these bank details to make the payment:

Account Name: ${process.env.NEXT_PUBLIC_ACCOUNT_NAME}
Sort Code: ${process.env.NEXT_PUBLIC_SORT_CODE}
Account Number: ${process.env.NEXT_PUBLIC_ACCOUNT_NUMBER}

Thank you and warmest wishes,

Thomas and Iulia xxx
  `;
  try {
    setLoading(true);
    await axios.post(`${process.env.NEXT_PUBLIC_SEND_EMAIL_URL}`, {
      email,
      message,
      gift: true,
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
  sendEmailToFirstGuest,
}: {
  accomodationData: TentData;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSuccess: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<boolean>>;
  sendEmailToFirstGuest: boolean;
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
    sendPaymentEmail({ booking: accomodationData, sendEmailToFirstGuest });
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
  setError: Dispatch<SetStateAction<boolean>>;
  setFormData: Dispatch<SetStateAction<LoginData>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
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
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<boolean>>;
  setShowSuccessToast: Dispatch<SetStateAction<boolean>>;
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
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<boolean>>;
  setShowSuccessToast: Dispatch<SetStateAction<boolean>>;
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
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<boolean>>;
  setShowSuccessToast: Dispatch<SetStateAction<boolean>>;
  setFormData: Dispatch<SetStateAction<Guests>>;
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
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<boolean>>;
  setShowSuccessToast: Dispatch<SetStateAction<boolean>>;
  setFormData: Dispatch<SetStateAction<Guests>>;
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
  setError: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setShowSuccessToast: Dispatch<SetStateAction<boolean>>;
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

const sendFoodOrder = async (order: FoodOrder) => {
  const { guestId, hotdog, lunch, dietryRequirements } = order;

  try {
    return axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/guests/${guestId}`,
      {
        hotdog,
        lunch,
        dietryRequirements,
      }
    );
  } catch (error: any) {
    throw new Error(`${error} for guest ${guestId}`);
  }
};

export const orderFood = async ({
  formData,
  setLoading,
  setSuccess,
  setError,
}: {
  formData: FoodOrder[];
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSuccess: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<boolean>>;
}) => {
  setLoading(true);
  try {
    const promises = formData.map(sendFoodOrder);
    await Promise.all(promises);
    setSuccess(true);
  } catch (error: any) {
    setError(true);
  } finally {
    setLoading(false);
  }
};
