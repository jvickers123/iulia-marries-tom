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

const GuestForm = ({ guest }: { guest?: Guests }) => {
  const [formData, setFormData] = useState<Guests>(emptyGuest);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateOrAddGuest({ edit: true, data: formData, setLoading, setError });
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
    console.log(formData);
  });

  return (
    <>
      <h2 className="guest-form">
        {guest ? `Edit ${guest.name}` : 'add new guest'}
      </h2>
      <form onSubmit={handleSubmit} className="guest-form">
        <div className="guest-form__flex-container">
          <TextField
            onChange={handleChange}
            className="guest-form__input"
            id="name"
            label="Name"
            variant="standard"
            type="text"
            value={formData.name}
            required
          />
          <TextField
            onChange={handleChange}
            className="guest-form__input"
            id="email"
            value={formData.email}
            label="Email"
            variant="standard"
            type="email"
          />
        </div>
        <div className="guest-form__flex-container">
          <FormControl className="guest-form__input">
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
          <FormControl className="guest-form__input">
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
        </div>
        <div className="guest-form__flex-container">
          <TextField
            onChange={handleChange}
            value={formData.accomodation}
            className="guest-form__input"
            id="accomodation"
            label="Accomodation"
            multiline
            variant="standard"
            type="text"
          />
          <TextField
            onChange={handleChange}
            value={formData.notes}
            className="guest-form__input"
            id="notes"
            label="Notes"
            variant="standard"
            multiline
            type="text"
          />
        </div>
        <Button
          className="guest-form__button"
          variant="contained"
          type="submit">
          {guest ? 'Update' : 'Add Guest'}
        </Button>
        {loading && <LoadingSpinner />}

        {error && (
          <p className="login__error">Something went wrong, please try again</p>
        )}
      </form>
    </>
  );
};

export default GuestForm;
