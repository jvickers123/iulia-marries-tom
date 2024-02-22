import Modal from '@mui/material/Modal';
import { initialAccomodationState } from '@/utilities/form-utils';
import { useState } from 'react';
import { bookAccomodation } from '@/utilities/api-utils';
import ModalContentContainer from './ModalContentContainer';
import LoadingSpinner from './LoadingSpinner';
import FailedAPICall from './FailedAPiCall';
import AccomodationForm from './AccomodationForm';
import SuccessBooking from './SuccessBooking';

const BookAccomodationModal = ({
  closeModal,
  showModal,
  openAccomodationInfo,
}: {
  closeModal: () => void;
  showModal: boolean;
  openAccomodationInfo: () => void;
}) => {
  const [accomodationData, setAccomodationData] = useState(
    initialAccomodationState
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    bookAccomodation({ accomodationData, setLoading, setSuccess, setError });
  };

  return (
    <Modal onClose={closeModal} open={showModal}>
      <ModalContentContainer>
        {loading && <LoadingSpinner />}
        {error && <FailedAPICall setError={setError} />}
        {success && (
          <SuccessBooking
            booking={accomodationData}
            setSuccess={setSuccess}
            closeModal={closeModal}
          />
        )}
        {!error && !loading && !success && (
          <AccomodationForm
            setAccomodationData={setAccomodationData}
            accomodationData={accomodationData}
            handleSubmit={handleSubmit}
            openAccomodationInfo={openAccomodationInfo}
          />
        )}
      </ModalContentContainer>
    </Modal>
  );
};

export default BookAccomodationModal;
