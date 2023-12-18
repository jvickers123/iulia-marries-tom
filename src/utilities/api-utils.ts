import { RSVPData } from '@/types/rsvp-types';
import axios from 'axios';
import React, { SetStateAction } from 'react';
import { emptyGuest, initialRSVPState } from './form-utils';
import { Guests, LoginData } from '@/types/admin-types';
import { getTokenFromLocal } from './auth';

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
}: {
  rsvpData: RSVPData;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
  setError: React.Dispatch<SetStateAction<boolean>>;
  setSuccess: React.Dispatch<SetStateAction<boolean>>;
  setAttending: React.Dispatch<SetStateAction<boolean>>;
  setMaybe: React.Dispatch<SetStateAction<boolean>>;
  setRSVPData: React.Dispatch<SetStateAction<RSVPData>>;
}) => {
  setLoading(true);
  setError(false);
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_FIRE_BASE_URL}/RSVPS.json`,
      rsvpData
    );
    setSuccess(true);

    if (rsvpData.attending === 'yes') {
      setAttending(true);
    }
    if (rsvpData.attending === 'maybe') {
      setMaybe(true);
    }

    setRSVPData(initialRSVPState);
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
    const { data } = await axios.put(
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

    const { data } = await axios.post(
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
}: {
  guestId: string;
  setError: React.Dispatch<SetStateAction<boolean>>;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
  setShowSuccessToast: React.Dispatch<SetStateAction<boolean>>;
}) => {
  setLoading(true);
  try {
    const token = getTokenFromLocal();

    const { data } = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/guests/${guestId}`,
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
