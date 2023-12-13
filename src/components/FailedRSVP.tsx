import { Button } from '@mui/material';
import { SetStateAction } from 'react';

const FailedRSVP = ({
  setError,
}: {
  setError: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="failed-rsvp">
      <h3 className="failed-rsvp__heading">
        Oops something went wrong, please try again later.
      </h3>
      <Button
        variant="contained"
        color="secondary"
        className="failed-rsvp__button"
        onClick={() => setError(false)}>
        Go back
      </Button>
    </div>
  );
};

export default FailedRSVP;
