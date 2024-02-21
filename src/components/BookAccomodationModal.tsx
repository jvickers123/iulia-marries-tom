import Modal from '@mui/material/Modal';
import { initialAccomodationState } from '@/utilities/form-utils';
import { Dispatch, SetStateAction, useState } from 'react';
import { sendRSVP } from '@/utilities/api-utils';
import ModalContentContainer from './ModalContentContainer';
import LoadingSpinner from './LoadingSpinner';
import FailedAPICall from './FailedAPiCall';
import SuccessRSVP from './SuccessRSVP';
import { RSVPGuest, ShowPanels } from '@/types/guest-page-types';
import AccomodationForm from './AccomodationForm';

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
  const [recievedPeople, setRecievedPeople] = useState<RSVPGuest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [attending, setAttending] = useState(false);
  const [maybe, setMaybe] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Modal onClose={closeModal} open={showModal}>
      <ModalContentContainer>
        {loading && <LoadingSpinner />}
        {error && <FailedAPICall setError={setError} />}
        {success && (
          <SuccessRSVP
            closeModal={closeModal}
            attending={attending}
            maybe={maybe}
            setMaybe={setMaybe}
            setAttending={setAttending}
            setSuccess={setSuccess}
            guests={recievedPeople}
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
