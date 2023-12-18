import Button from '@mui/material/Button';
import { SetStateAction } from 'react';

const EditButton = ({
  setEditing,
}: {
  setEditing: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Button
      variant="contained"
      className="admin-card__button"
      onClick={() => setEditing(true)}>
      Edit
    </Button>
  );
};

export default EditButton;
