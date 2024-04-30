import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { orderFood } from '@/utilities/api-utils';
import ModalContentContainer from './ModalContentContainer';
import LoadingSpinner from './LoadingSpinner';
import FailedAPICall from './FailedAPiCall';
import FoodForm from './FoodForm';
import { emptyFoodOrder } from '@/utilities/food';
import SuccessFoodOrder from './SuccessFoodOrder';

const BookAccomodationModal = ({
  closeModal,
  showModal,
  openFoodInfo,
}: {
  closeModal: () => void;
  showModal: boolean;
  openFoodInfo: () => void;
}) => {
  const [formData, setFormData] = useState([emptyFoodOrder]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    orderFood({
      formData,
      setLoading,
      setError,
      setSuccess,
    });
  };

  return (
    <Modal onClose={closeModal} open={showModal}>
      <ModalContentContainer>
        {loading && <LoadingSpinner />}
        {error && <FailedAPICall setError={setError} />}
        {success && (
          <SuccessFoodOrder
            orders={formData}
            setSuccess={setSuccess}
            closeModal={closeModal}
            setFormData={setFormData}
          />
        )}
        {!error && !loading && !success && (
          <FoodForm
            openFoodInfo={openFoodInfo}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            formData={formData}
          />
        )}
      </ModalContentContainer>
    </Modal>
  );
};

export default BookAccomodationModal;
