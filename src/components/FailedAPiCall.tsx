import { Button } from '@mui/material';
import { SetStateAction } from 'react';

const FailedAPICall = ({
  setError,
}: {
  setError: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="failed-api-call">
      <h3 className="failed-api-call__heading">
        Oops something went wrong, please try again later.
      </h3>
      <Button
        variant="contained"
        color="secondary"
        className="failed-api-call__button"
        onClick={() => setError(false)}>
        Go back
      </Button>
    </div>
  );
};

export default FailedAPICall;
