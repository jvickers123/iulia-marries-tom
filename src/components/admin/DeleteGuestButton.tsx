import { Button } from '@mui/material';
import { useState } from 'react';
import DeleteGuestModal from './DeleteGuestModal';

const DeleteGuestButton = ({ guestId }: { guestId: string }) => {
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
        <DeleteGuestModal
          guestId={guestId}
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
    </>
  );
};
export default DeleteGuestButton;
