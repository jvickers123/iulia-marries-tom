import Modal from '@mui/material/Modal';
import ModalContentContainer from './ModalContentContainer';
import { ModalVariant } from '@/types/rsvp-types';

const Info = ({
  showMoreInfo,
  closeModal,
}: {
  showMoreInfo: boolean;
  closeModal: () => void;
}) => (
  <Modal open={showMoreInfo} onClose={closeModal}>
    <ModalContentContainer variant={ModalVariant.INFO}>
      <h2 className="info__heading">Iulia and Tom</h2>

      <p className="info__para info__para--green">
        warmly and formally invite you to celebrate their marriage
      </p>
      <p className="info__para info__para--purple">
        on Saturday 27th July 2024
      </p>

      <p className="info__para info__para--dark-green">
        at Holwell Farmhouse, Holwell Farm, Exerter, EX16 9AD. Reception and
        partying until late, accommodation available.
      </p>

      <p className="info__para info__para--black">
        More info will be available here soon...
      </p>
    </ModalContentContainer>
  </Modal>
);

export default Info;
