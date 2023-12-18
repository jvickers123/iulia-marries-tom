import { Button } from '@mui/material';
import { SetStateAction } from 'react';

const AddGuestButton = ({
  setShowAddGuestForm,
}: {
  setShowAddGuestForm: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div>
      <Button
        variant="contained"
        className="add-guest__button"
        onClick={() => setShowAddGuestForm(true)}>
        Add Guest
      </Button>
    </div>
  );
};

export default AddGuestButton;
