import Modal from '@mui/material/Modal';
import ModalContentContainer from '../ModalContentContainer';
import { SetStateAction } from 'react';
import GuestForm from './GuestForm';

const AddGuest = ({
  showAddGuestForm,
  setShowAddGuestForm,
}: {
  showAddGuestForm: boolean;
  setShowAddGuestForm: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Modal open={showAddGuestForm} onClose={() => setShowAddGuestForm(false)}>
      <ModalContentContainer>
        <GuestForm />
      </ModalContentContainer>
    </Modal>
  );
};
export default AddGuest;
