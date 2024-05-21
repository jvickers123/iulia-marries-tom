import Modal from '@mui/material/Modal';
import ModalContentContainer from '../ModalContentContainer';
import { SetStateAction } from 'react';
import NoticeForm from './NoticeForm';

const AddNotice = ({
  showAddNoticeForm,
  setShowAddNoticeForm,
}: {
  showAddNoticeForm: boolean;
  setShowAddNoticeForm: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Modal open={showAddNoticeForm} onClose={() => setShowAddNoticeForm(false)}>
      <ModalContentContainer>
        <NoticeForm />
      </ModalContentContainer>
    </Modal>
  );
};
export default AddNotice;
