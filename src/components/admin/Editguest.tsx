import Modal from '@mui/material/Modal';
import ModalContentContainer from '../ModalContentContainer';
import { SetStateAction } from 'react';
import { Guests } from '@/types/admin-types';
import GuestForm from './GuestForm';
import { ModalVariant } from '@/types/rsvp-types';

const EditGuest = ({
  editing,
  setEditing,
  guest,
}: {
  editing: boolean;
  setEditing: React.Dispatch<SetStateAction<boolean>>;
  guest: Guests;
}) => {
  return (
    <Modal open={editing} onClose={() => setEditing(false)}>
      <ModalContentContainer>
        <GuestForm guest={guest} />
      </ModalContentContainer>
    </Modal>
  );
};
export default EditGuest;
