import { Button } from '@mui/material';
import { SetStateAction } from 'react';

const SuccessRSVP = ({
  attending,
  maybe,
  closeModal,
  setSuccess,
  setAttending,
  setMaybe,
}: {
  attending: boolean;
  maybe: boolean;
  closeModal: () => void;
  setSuccess: React.Dispatch<SetStateAction<boolean>>;
  setAttending: React.Dispatch<SetStateAction<boolean>>;
  setMaybe: React.Dispatch<SetStateAction<boolean>>;
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

      {attending && (
        <p className="success-rsvp__paragraph">
          We can&apos;t wait to see you there
        </p>
      )}
      {maybe && (
        <p className="success-rsvp__paragraph">Hope to see you there!</p>
      )}
      <p className="success-rsvp__paragraph">Have a lovely Christmas</p>

      <Button variant="contained" color="secondary" onClick={handleClick}>
        Close
      </Button>
    </div>
  );
};

export default SuccessRSVP;
