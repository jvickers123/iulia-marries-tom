import Modal from '@mui/material/Modal';
import ModalContentContainer from '../ModalContentContainer';
import { SetStateAction } from 'react';
import { Guests, Tent } from '@/types/admin-types';
import GuestForm from './GuestForm';
import AccomodationForm from './AccomodationForm';

const EditModal = ({
  editing,
  setEditing,
  guest,
  tent,
}: {
  editing: boolean;
  setEditing: React.Dispatch<SetStateAction<boolean>>;
  guest?: Guests;
  tent?: Tent;
}) => {
  return (
    <Modal open={editing} onClose={() => setEditing(false)}>
      <ModalContentContainer>
        {tent && <AccomodationForm tent={tent} />}
        {guest && <GuestForm guest={guest} />}
      </ModalContentContainer>
    </Modal>
  );
};
export default EditModal;
