import Modal from '@mui/material/Modal';
import ModalContentContainer from '../ModalContentContainer';
import { SetStateAction } from 'react';
import { Guests } from '@/types/admin-types';
import GuestForm from './GuestForm';
import { ModalVariant } from '@/types/rsvp-types';

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
