import { RSVPData, RSVPGuest } from '@/types/rsvp-types';
import { getPeopleInfoFromAPI } from '@/utilities/form-utils';
import {
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from '@mui/material';
import RsvpAutoCompleteMultiSelect from './RsvpAutoCompleteMultiSelect';

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
      <h2 className="rsvp-form__title modal-heading">Send RSVP</h2>
      <form className="rsvp-form" onSubmit={handleSubmit}>
        <TextField
          className="rsvp-form__input"
          id="email"
          label="Email"
          variant="standard"
          type="email"
          required
          onChange={handleChange}
        />

        <RsvpAutoCompleteMultiSelect
          onChange={handleMultiSelectChange}
          value={rsvpData.people}
        />

        <FormControl className="rsvp-form__input">
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
          className="rsvp-form__input"
          id="notes"
          label="Notes"
          variant="standard"
          multiline
          onChange={handleChange}
        />

        <Button
          type="submit"
          variant="contained"
          className="rsvp-form__submit-btn"
          size="large">
          Send
        </Button>
      </form>
    </>
  );
};

export default RsvpForm;
