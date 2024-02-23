import Button from '@mui/material/Button';
import { TentData } from '@/types/guest-page-types';
import { Dispatch, SetStateAction } from 'react';

const SuccessBooking = ({
  booking,
  setSuccess,
  closeModal,
}: {
  booking: TentData;
  setSuccess: Dispatch<SetStateAction<boolean>>;
  closeModal: () => void;
}) => {
  const handleClick = () => {
    setSuccess(false);
    closeModal();
  };
  return (
    <div className="success-rsvp">
      <h2 className="success-rsvp__heading">
        Thank you for booking accomodation!
      </h2>

      <p className="success-rsvp__paragraph">
        You have booked a ${booking.type} tent for the following guests:
      </p>
      <ul className="success-rsvp__list">
        {booking.guests.map(guest => (
          <li key={guest.id} className="success-rsvp__list-item">
            <p>{guest.name}</p>
          </li>
        ))}
      </ul>

      <p className="success-rsvp__paragraph">Total cost: £{booking.price}</p>

      <p className="success-rsvp__paragraph success-rsvp__paragraph--black">
        You should have recieved an email with instructions on how to pay for
        it. Please check your spam folder as it will almost certainly be in
        there
      </p>

      <Button variant="contained" color="secondary" onClick={handleClick}>
        Close
      </Button>
    </div>
  );
};
export default SuccessBooking;
