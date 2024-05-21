import { Button } from '@mui/material';
import { useState } from 'react';
import DeleteModal from './DeleteModal';

const DeleteButton = ({
  itemId,
  guestName,
  isAccomodation = false,
  isNotice = false,
}: {
  itemId: string;
  guestName: string;
  isAccomodation?: boolean;
  isNotice?: boolean;
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
          itemId={itemId}
          guestName={guestName}
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          isAccomodation={isAccomodation}
          isNotice={isNotice}
        />
      )}
    </>
  );
};
export default DeleteButton;
