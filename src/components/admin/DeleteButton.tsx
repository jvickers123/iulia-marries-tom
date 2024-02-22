import { Button } from '@mui/material';
import { useState } from 'react';
import DeleteModal from './DeleteModal';

const DeleteButton = ({
  guestId,
  guestName,
  isAccomodation = false,
}: {
  guestId: string;
  guestName: string;
  isAccomodation?: boolean;
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        className="admin-card__button"
        color="error"
        onClick={() => setShowDeleteModal(true)}>
        Delete
      </Button>
      {showDeleteModal && (
        <DeleteModal
          guestId={guestId}
          guestName={guestName}
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          isAccomodation={isAccomodation}
        />
      )}
    </>
  );
};
export default DeleteButton;
