import Modal from '@mui/material/Modal';
import ModalContentContainer from '../ModalContentContainer';
import Button from '@mui/material/Button';
import { deleteGuest } from '@/utilities/api-utils';
import { useState } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import Success from './Success';

const DeleteGuestModal = ({
  guestId,
  setShowDeleteModal,
  showDeleteModal,
}: {
  guestId: string;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  showDeleteModal: boolean;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    deleteGuest({ guestId, setError, setLoading, setShowSuccessToast });
  };
  return (
    <Modal open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
      <ModalContentContainer>
        <form onSubmit={handleSubmit} className="delete-guest__form">
          <h2>Are you sure you want to delete this guest?</h2>

          <Button variant="contained" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>

          <Button type="submit" variant="contained" color="error">
            Delete
          </Button>
          {loading && <LoadingSpinner />}
          {error && (
            <p className="error">
              Something went wrong. Please try again later
            </p>
          )}
          {showSuccessToast && <Success />}
        </form>
      </ModalContentContainer>
    </Modal>
  );
};

export default DeleteGuestModal;
