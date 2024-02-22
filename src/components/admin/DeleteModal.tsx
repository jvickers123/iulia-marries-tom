import Modal from '@mui/material/Modal';
import ModalContentContainer from '../ModalContentContainer';
import Button from '@mui/material/Button';
import { deleteGuest } from '@/utilities/api-utils';
import { useState } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import Success from './Success';

const DeleteModal = ({
  guestId,
  setShowDeleteModal,
  showDeleteModal,
  guestName,
  isAccomodation,
}: {
  guestId: string;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  showDeleteModal: boolean;
  guestName: string;
  isAccomodation: boolean;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    deleteGuest({
      guestId,
      setError,
      setLoading,
      setShowSuccessToast,
      isAccomodation,
    });
  };
  return (
    <Modal open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
      <ModalContentContainer>
        <form onSubmit={handleSubmit} className="delete-guest__form">
          <h2>Are you sure you want to delete {guestName}?</h2>

          <div className="delete-guest__form-button-container">
            <Button
              variant="contained"
              onClick={() => setShowDeleteModal(false)}
              className="delete-guest__button">
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              color="error"
              className="delete-guest__button">
              Delete
            </Button>
          </div>
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

export default DeleteModal;
