import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { initialRSVPState } from '@/utilities/form-utils';
import { useState } from 'react';
import { RSVPData } from '@/types/rsvp-types';
import { sendRSVP } from '@/utilities/api-utils';
import ModalContentContainer from './ModalContentContainer';

const RSVPForm = ({
  closeModal,
  showRSVP,
}: {
  closeModal: () => void;
  showRSVP: boolean;
}) => {
  const [rsvpData, setRSVPData] = useState<RSVPData>(initialRSVPState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setRSVPData({ ...rsvpData, [id]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendRSVP(rsvpData);
  };

  return (
    <Modal onClose={closeModal} open={showRSVP}>
      <ModalContentContainer>
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

          <TextField
            className="rsvp-form__input"
            id="people"
            label="Who are you replying for?"
            variant="standard"
            multiline
            required
            onChange={handleChange}
          />

          <FormControl className="rsvp-form__input">
            <FormLabel id="attending-label">Will you be attending?</FormLabel>
            <RadioGroup
              aria-labelledby="attending-label"
              defaultValue="yes"
              name="radio-buttons-group"
              row
              id="attending"
              onChange={handleChange}>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
              <FormControlLabel
                value="maybe"
                control={<Radio />}
                label="Maybe"
              />
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
      </ModalContentContainer>
    </Modal>
  );
};

export default RSVPForm;
