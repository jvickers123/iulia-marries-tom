import { Guests } from '@/types/admin-types';
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
import { emptyGuest } from '@/utilities/form-utils';
import LoadingSpinner from '../LoadingSpinner';
import { updateOrAddGuest } from '@/utilities/api-utils';
import SuccessToast from '../SuccessToast';

const GuestForm = ({ guest }: { guest?: Guests }) => {
  const [formData, setFormData] = useState(emptyGuest);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
    setError(false);
  };

  const handleRadioChangeAttending = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      attending: value as 'yes' | 'no' | 'maybe' | 'not-responded',
    });
  };

  const handleRadioChangeLunch = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      lunch: value as 'lamb' | 'salmon' | 'veggie' | 'vegan' | 'none',
    });
  };

  const handleRadioChangeHotdog = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      hotdog: value as 'classic' | 'fish' | 'halloumi' | 'tofu' | 'none',
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateOrAddGuest({
      edit: guest ? true : false,
      data: formData,
      setLoading,
      setError,
      setShowSuccessToast,
      setFormData,
    });
  };

  const handleRadioChangeFullDay = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      fullDay: value === 'fullDay',
    });
  };

  useEffect(() => {
    if (guest) {
      setFormData(guest);
    }
  }, [guest]);

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
      <h2 className="edit-form__heading">
        {guest ? `Edit ${guest.name}` : 'add new guest'}
      </h2>
      <form onSubmit={handleSubmit} className="edit-form">
        <div className="edit-form__flex-container">
          <TextField
            onChange={handleChange}
            className="edit-form__input"
            id="name"
            label="Name"
            variant="standard"
            type="text"
            value={formData.name}
            required
          />
          <TextField
            onChange={handleChange}
            className="edit-form__input"
            id="email"
            value={formData.email}
            label="Email"
            variant="standard"
            type="email"
          />
        </div>
        <div className="edit-form__flex-container">
          <FormControl className="edit-form__input">
            <FormLabel id="attending-label">Attending</FormLabel>
            <RadioGroup
              aria-labelledby="attending-label"
              defaultValue={formData.attending}
              value={formData.attending}
              name="radio-buttons-group-attending"
              row
              id="attending"
              onChange={handleRadioChangeAttending}>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
              <FormControlLabel
                value="maybe"
                control={<Radio />}
                label="Maybe"
              />
              <FormControlLabel
                value="not-responded"
                control={<Radio />}
                label="Not Responded"
              />
            </RadioGroup>
          </FormControl>
          <FormControl className="edit-form__input">
            <FormLabel id="full-day-label">Full Day?</FormLabel>
            <RadioGroup
              aria-labelledby="full-day-label"
              defaultValue={formData.fullDay ? 'fullDay' : 'ReceptionOnly'}
              value={formData.fullDay ? 'fullDay' : 'ReceptionOnly'}
              name="radio-buttons-group-full-day"
              row
              id="fullDay"
              onChange={handleRadioChangeFullDay}>
              <FormControlLabel
                value="fullDay"
                control={<Radio />}
                label="Full Day"
              />
              <FormControlLabel
                value="ReceptionOnly"
                control={<Radio />}
                label="reception"
              />
            </RadioGroup>
          </FormControl>
          <FormControl className="edit-form__input">
            <FormLabel id="lunch-label">Lunch BBQ option?</FormLabel>
            <RadioGroup
              aria-labelledby="lunch-label"
              defaultValue={formData.lunch}
              value={formData.lunch}
              name="radio-buttons-group-lunch"
              row
              id="lunch"
              onChange={handleRadioChangeLunch}>
              <FormControlLabel value="lamb" control={<Radio />} label="Lamb" />
              <FormControlLabel
                value="salmon"
                control={<Radio />}
                label="Salmon"
              />
              <FormControlLabel
                value="Veggie"
                control={<Radio />}
                label="Veggie"
              />
              <FormControlLabel
                value="Vegan"
                control={<Radio />}
                label="Vegan"
              />
              <FormControlLabel value="none" control={<Radio />} label="None" />
            </RadioGroup>
          </FormControl>
          <FormControl className="edit-form__input">
            <FormLabel id="hotdog-label">Hotdog option?</FormLabel>
            <RadioGroup
              aria-labelledby="hotdog-label"
              defaultValue={formData.hotdog}
              value={formData.hotdog}
              name="radio-buttons-group-hotdog"
              row
              id="hotdog"
              onChange={handleRadioChangeHotdog}>
              <FormControlLabel
                value="classic"
                control={<Radio />}
                label="Classic"
              />
              <FormControlLabel value="fish" control={<Radio />} label="Fish" />
              <FormControlLabel
                value="halloumi"
                control={<Radio />}
                label="Haloumi"
              />
              <FormControlLabel value="tofu" control={<Radio />} label="Tofu" />
              <FormControlLabel value="none" control={<Radio />} label="None" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="edit-form__flex-container">
          <TextField
            onChange={handleChange}
            value={formData.dietryRequirements}
            className="edit-form__input"
            id="dietryRequirements"
            label="Dietry Requirements"
            variant="standard"
            multiline
            type="text"
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
          {guest ? 'Update' : 'Add Guest'}
        </Button>
        {loading && <LoadingSpinner />}
        {showSuccessToast && <SuccessToast />}

        {error && (
          <p className="login__error">Something went wrong, please try again</p>
        )}
      </form>
    </>
  );
};

export default GuestForm;
