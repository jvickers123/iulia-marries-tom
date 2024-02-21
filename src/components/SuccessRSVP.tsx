import { RSVPGuest } from '@/types/guest-page-types';
import { Button } from '@mui/material';
import { SetStateAction } from 'react';

const SuccessRSVP = ({
  attending,
  maybe,
  closeModal,
  setSuccess,
  setAttending,
  setMaybe,
  guests,
}: {
  attending: boolean;
  maybe: boolean;
  closeModal: () => void;
  setSuccess: React.Dispatch<SetStateAction<boolean>>;
  setAttending: React.Dispatch<SetStateAction<boolean>>;
  setMaybe: React.Dispatch<SetStateAction<boolean>>;
  guests: RSVPGuest[];
}) => {
  const handleClick = () => {
    setSuccess(false);
    setAttending(false);
    setMaybe(false);
    closeModal();
  };
  return (
    <div className="success-rsvp">
      <h2 className="success-rsvp__heading">Thank you for replying!</h2>

      <ul className="success-rsvp__list">
        {guests.map(guest => (
          <li key={guest.id} className="success-rsvp__list-item">
            <p>{guest.name}</p>
            <p>
              You have been invited to{' '}
              {guest.fullDay ? 'the whole day' : 'the evening celebrations'}
            </p>
          </li>
        ))}
      </ul>

      {attending && (
        <p className="success-rsvp__paragraph">
          We can&apos;t wait to see you there
        </p>
      )}
      {maybe && (
        <p className="success-rsvp__paragraph">Hope to see you there</p>
      )}

      <Button variant="contained" color="secondary" onClick={handleClick}>
        Close
      </Button>
    </div>
  );
};

export default SuccessRSVP;
