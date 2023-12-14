import Modal from '@mui/material/Modal';
import { initialRSVPState } from '@/utilities/form-utils';
import { useState } from 'react';
import { sendRSVP } from '@/utilities/api-utils';
import ModalContentContainer from './ModalContentContainer';
import RsvpForm from './RSVPFormTemporaryNameChange';
import LoadingSpinner from './LoadingSpinner';
import FailedRSVP from './FailedRSVP';
import SuccessRSVP from './SuccessRSVP';

const RsvpModal = ({
  closeModal,
  showRSVP,
}: {
  closeModal: () => void;
  showRSVP: boolean;
}) => {
  const [rsvpData, setRSVPData] = useState(initialRSVPState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [attending, setAttending] = useState(false);
  const [maybe, setMaybe] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendRSVP({
      rsvpData,
      setLoading,
      setError,
      setSuccess,
      setAttending,
      setMaybe,
      setRSVPData,
    });
  };

  return (
    <Modal onClose={closeModal} open={showRSVP}>
      <ModalContentContainer>
        {loading && <LoadingSpinner />}
        {error && <FailedRSVP setError={setError} />}
        {success && (
          <SuccessRSVP
            closeModal={closeModal}
            attending={attending}
            maybe={maybe}
            setMaybe={setMaybe}
            setAttending={setAttending}
            setSuccess={setSuccess}
          />
        )}
        {!error && !loading && !success && (
          <RsvpForm
            setRSVPData={setRSVPData}
            rsvpData={rsvpData}
            handleSubmit={handleSubmit}
          />
        )}
      </ModalContentContainer>
    </Modal>
  );
};

export default RsvpModal;
