import { RSVPData, RSVPGuest } from '@/types/guest-page-types';
import {
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from '@mui/material';
import AutoCompleteMultiSelect from './AutoCompleteMultiSelect';

const RsvpForm = ({
  setRSVPData,
  handleSubmit,
  rsvpData,
}: {
  setRSVPData: React.Dispatch<React.SetStateAction<RSVPData>>;
  rsvpData: RSVPData;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setRSVPData({ ...rsvpData, [id]: value });
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setRSVPData({ ...rsvpData, attending: value as 'yes' | 'no' | 'maybe' });
  };

  const handleMultiSelectChange = (
    _event: React.SyntheticEvent<Element>,
    value: RSVPGuest[]
  ) => {
    setRSVPData({ ...rsvpData, people: value });
  };

  return (
    <>
      <h2 className="booking-form__title modal-heading">Send RSVP</h2>
      <form className="booking-form" onSubmit={handleSubmit}>
        <TextField
          className="booking-form__input"
          id="email"
          label="Email"
          variant="standard"
          type="email"
          required
          onChange={handleChange}
        />

        <AutoCompleteMultiSelect
          onChange={handleMultiSelectChange}
          value={rsvpData.people}
        />

        <FormControl className="booking-form__input">
          <FormLabel id="attending-label">Will you be attending?</FormLabel>
          <RadioGroup
            aria-labelledby="attending-label"
            defaultValue="yes"
            name="radio-buttons-group"
            row
            id="attending"
            onChange={handleRadioChange}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
            <FormControlLabel value="maybe" control={<Radio />} label="Maybe" />
          </RadioGroup>
        </FormControl>

        <TextField
          className="booking-form__input"
          id="notes"
          label="Notes"
          variant="standard"
          multiline
          onChange={handleChange}
        />

        <Button
          type="submit"
          variant="contained"
          className="booking-form__submit-btn"
          size="large">
          Send
        </Button>
      </form>
    </>
  );
};

export default RsvpForm;
