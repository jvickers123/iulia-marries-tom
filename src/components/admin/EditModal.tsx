import Modal from '@mui/material/Modal';
import ModalContentContainer from '../ModalContentContainer';
import { SetStateAction } from 'react';
import { Guests, Notice, Tent } from '@/types/admin-types';
import GuestForm from './GuestForm';
import AccomodationForm from './AccomodationForm';
import NoticeForm from './NoticeForm';

const EditModal = ({
  editing,
  setEditing,
  guest,
  tent,
  notice,
}: {
  editing: boolean;
  setEditing: React.Dispatch<SetStateAction<boolean>>;
  guest?: Guests;
  tent?: Tent;
  notice?: Notice;
}) => {
  return (
    <Modal open={editing} onClose={() => setEditing(false)}>
      <ModalContentContainer>
        {tent && <AccomodationForm tent={tent} />}
        {guest && <GuestForm guest={guest} />}
        {notice && <NoticeForm notice={notice} />}
      </ModalContentContainer>
    </Modal>
  );
};
export default EditModal;
