import Modal from '@mui/material/Modal';
import ModalContentContainer from './ModalContentContainer';
import { ModalVariant } from '@/types/guest-page-types';

const Info = ({
  showTimings,
  closeModal,
}: {
  showTimings: boolean;
  closeModal: () => void;
}) => (
  <Modal open={showTimings} onClose={closeModal}>
    <ModalContentContainer variant={ModalVariant.INFO}>
      <h2 className="info__heading">Timings</h2>

      <p className="info__para info__para--green">11:30 - Day guests arrive</p>
      <p className="info__para info__para--green">12:30 - Ceremony </p>
      <p className="info__para info__para--green">13:00 - Drinks reception</p>
      <p className="info__para info__para--green">14:30 - Wedding breakfast</p>
      <br />
      <p className="info__para info__para--dark-green">
        17:30 - Evening guests arrive
      </p>
      <p className="info__para info__para--dark-green">19:30 - Evening food</p>
      <p className="info__para info__para--dark-green">00:00 - The End</p>
    </ModalContentContainer>
  </Modal>
);

export default Info;
