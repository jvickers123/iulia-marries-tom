import Modal from '@mui/material/Modal';
import ModalContentContainer from './ModalContentContainer';
import { ModalVariant } from '@/types/guest-page-types';

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

      <p className="info__para info__para--green info__para--large">
        warmly and formally invite you to celebrate their marriage
      </p>
      <p className="info__para info__para--purple">
        on Saturday 27th July 2024
      </p>

      <p className="info__para info__para--dark-green">
        at Holwell Farmhouse, Holwell Farm, Exeter, EX16 9AD with partying until
        late and accommodation available.
      </p>

      <p className="info__para info__para--black info__para--margin-top">
        You can RSVP, book accomodation, and order food from the side menu. More
        details will be posted on this site as they become available.
      </p>
    </ModalContentContainer>
  </Modal>
);

export default Info;
