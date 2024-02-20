import { Tent } from '@/types/admin-types';
import {
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { emptyAccomodation } from '@/utilities/form-utils';
import LoadingSpinner from '../LoadingSpinner';
import Success from './Success';
import { getGuestNamesOneString } from '@/utilities/data';
import AutoCompleteMultiSelect from '../AutoCompleteMultiSelect';
import { RSVPGuest } from '@/types/rsvp-types';
import { editAccomodation } from '@/utilities/api-utils';

const AccomodationForm = ({ tent }: { tent: Tent }) => {
  const [formData, setFormData] = useState(emptyAccomodation);
  const [guests, setGuests] = useState(tent.guests);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const guestNames = getGuestNamesOneString(tent?.guests);

  const handleMultiSelectChange = (
    _event: React.SyntheticEvent<Element>,
    value: RSVPGuest[]
  ) => {
    setGuests(value);
    const guestIDs = value.map(guest => guest.id);
    setFormData(prev => {
      return { ...prev, guests: guestIDs };
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
    setError(false);
  };

  const handleRadioChangeTentType = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      type: value as 'party' | 'empty' | 'luxury',
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    editAccomodation({
      body: formData,
      setLoading,
      setError,
      setShowSuccessToast,
    });
  };

  const handleRadioChangePaid = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      paid: value === 'paid',
    });
  };

  useEffect(() => {
    if (tent) {
      const guests = tent.guests.map(guest => guest.id);
      setFormData({ ...tent, guests });
    }
  }, [tent]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (showSuccessToast) {
      timeoutId = setTimeout(() => {
        setShowSuccessToast(false);
      }, 5000);
    }
    return () => clearTimeout(timeoutId);
  }, [showSuccessToast]);

  return (
    <>
      <h2 className="edit-form__heading">{`Edit tent for ${guestNames}`}</h2>
      <form onSubmit={handleSubmit} className="edit-form">
        <div className="edit-form__flex-container">
          <FormControl className="edit-form__input">
            <FormLabel id="type-label">Accomodation Type</FormLabel>
            <AutoCompleteMultiSelect
              onChange={handleMultiSelectChange}
              value={guests}
              isRSVPForm={false}
            />
            <RadioGroup
              aria-labelledby="type-label"
              defaultValue={formData.type}
              value={formData.type}
              name="radio-buttons-group-type"
              row
              id="type"
              onChange={handleRadioChangeTentType}>
              <FormControlLabel
                value="empty"
                control={<Radio />}
                label="Empty"
              />
              <FormControlLabel
                value="party"
                control={<Radio />}
                label="Party"
              />
              <FormControlLabel
                value="luxury"
                control={<Radio />}
                label="Luxury"
              />
            </RadioGroup>
          </FormControl>
          <FormControl className="edit-form__input">
            <FormLabel id="full-day-label">Paid?</FormLabel>
            <RadioGroup
              aria-labelledby="full-day-label"
              defaultValue={formData.paid ? 'paid' : 'not-paid'}
              value={formData.paid ? 'paid' : 'not-paid'}
              name="radio-buttons-group-full-day"
              row
              id="paid"
              onChange={handleRadioChangePaid}>
              <FormControlLabel value="paid" control={<Radio />} label="Paid" />
              <FormControlLabel
                value="not-paid"
                control={<Radio />}
                label="Not Paid"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="edit-form__flex-container">
          <TextField
            onChange={handleChange}
            value={formData.price}
            className="edit-form__input"
            id="price"
            label="Price"
            type="number"
          />
          <TextField
            onChange={handleChange}
            value={formData.notes}
            className="edit-form__input"
            id="notes"
            label="Notes"
            variant="standard"
            multiline
            type="text"
          />
        </div>
        <Button className="edit-form__button" variant="contained" type="submit">
          Update
        </Button>
        {loading && <LoadingSpinner />}
        {showSuccessToast && <Success />}

        {error && (
          <p className="login__error">Something went wrong, please try again</p>
        )}
      </form>
    </>
  );
};

export default AccomodationForm;
