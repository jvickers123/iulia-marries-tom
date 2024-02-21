import { RSVPGuest, ShowPanels, TentData } from '@/types/guest-page-types';
import {
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Checkbox,
  FormControlLabel,
  Radio,
  Button,
} from '@mui/material';
import {
  calculateCosts,
  getMaxNoPeopleForTent,
} from '@/utilities/accomodation';
import AutoCompleteMultiSelect from './AutoCompleteMultiSelect';
import { SyntheticEvent, useEffect, useState } from 'react';

const AccomodationForm = ({
  setAccomodationData,
  handleSubmit,
  accomodationData,
  openAccomodationInfo,
}: {
  setAccomodationData: React.Dispatch<React.SetStateAction<TentData>>;
  accomodationData: TentData;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  openAccomodationInfo: () => void;
}) => {
  const [totalCost, setTotalCost] = useState(0);
  const [sendEmailToFirstGuest, setSendEmailToFirstGuest] = useState(true);
  const [showNotesAboutExtraBeds, setShowNotesAboutExtraBeds] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setAccomodationData({ ...accomodationData, [id]: value });
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setAccomodationData({
      ...accomodationData,
      type: value as 'empty' | 'party' | 'luxury',
    });
  };

  const handleMultiSelectChange = (
    _event: React.SyntheticEvent<Element>,
    value: RSVPGuest[]
  ) => {
    setAccomodationData({ ...accomodationData, guests: value });
  };

  const handleSendEmailToRadioButton = (
    _event: SyntheticEvent<Element, Event>,
    value: string
  ) => {
    setSendEmailToFirstGuest(value === 'first-guest');
  };

  useEffect(() => {
    const totalCost = calculateCosts({
      accomodationType: accomodationData.type,
      noPeople: accomodationData.guests.length,
    });

    setTotalCost(totalCost);

    if (
      accomodationData.type === 'luxury' &&
      accomodationData.guests.length >= 4
    ) {
      setShowNotesAboutExtraBeds(true);
    } else {
      setShowNotesAboutExtraBeds(false);
    }
  }, [accomodationData.guests, accomodationData.type]);

  return (
    <>
      <h2 className="booking-form__title modal-heading">Book Accomodation</h2>

      <form className="booking-form" onSubmit={handleSubmit}>
        <FormControl className="booking-form__input">
          <FormLabel id="tent-type-label">
            Which type of tent would you like to book?
          </FormLabel>
          <RadioGroup
            aria-labelledby="tent-type-label"
            defaultValue="empty"
            name="radio-buttons-group"
            row
            id="tent-type"
            onChange={handleRadioChange}>
            <FormControlLabel value="empty" control={<Radio />} label="Empty" />
            <FormControlLabel value="party" control={<Radio />} label="Party" />
            <FormControlLabel
              value="luxury"
              control={<Radio />}
              label="Luxury"
            />
          </RadioGroup>
        </FormControl>

        <AutoCompleteMultiSelect
          onChange={handleMultiSelectChange}
          value={accomodationData.guests}
          isRSVPForm={false}
          isBookingForm={true}
        />

        {showNotesAboutExtraBeds && (
          <p className="booking-form__para">
            Please let us know whether the extra guests would like a double bed
            or two singles here
          </p>
        )}

        <TextField
          className="booking-form__input"
          id="notes"
          label="Notes"
          variant="standard"
          multiline
          onChange={handleChange}
        />

        <FormControl className="booking-form__input">
          <FormLabel id="email-to-send-to">
            Which email should we send the payment instructions to?
          </FormLabel>
          <RadioGroup
            aria-labelledby="email-to-send-to"
            defaultValue="first-guest"
            name="radio-buttons-group"
            row
            id="tent-type"
            onChange={handleSendEmailToRadioButton}>
            <FormControlLabel
              value="first-guest"
              control={<Radio />}
              label={`Send to first guest in list ${
                accomodationData.guests.length
                  ? `(${accomodationData.guests[0].name})`
                  : ''
              }`}
            />
            <FormControlLabel
              value="other"
              control={<Radio />}
              label="Other Email"
            />
          </RadioGroup>
        </FormControl>
        {!sendEmailToFirstGuest && (
          <TextField
            className="booking-form__input"
            id="email"
            label="Alternative email address"
            variant="standard"
            type="email"
            disabled={sendEmailToFirstGuest}
            required
            onChange={handleChange}
          />
        )}

        <p className="booking-form__para">
          Booking for {accomodationData.guests.length} people
        </p>
        <p className="booking-form__para">
          (Max {getMaxNoPeopleForTent(accomodationData.type)} people)
        </p>

        <p className="booking-form__para">Total Cost: £{totalCost}</p>

        {accomodationData.guests.length >
          getMaxNoPeopleForTent(accomodationData.type) && (
          <p className="booking-form__warning-text">
            Booking for too many people
          </p>
        )}

        <Button
          type="submit"
          variant="contained"
          disabled={
            accomodationData.guests.length >
            getMaxNoPeopleForTent(accomodationData.type)
          }
          className="booking-form__submit-btn"
          size="large">
          Send
        </Button>

        <Button
          variant="contained"
          onClick={openAccomodationInfo}
          className="info__button"
          color="secondary"
          size="large">
          Accomodation info
        </Button>
      </form>
    </>
  );
};

export default AccomodationForm;
