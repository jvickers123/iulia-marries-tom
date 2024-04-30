import Modal from '@mui/material/Modal';
import ModalContentContainer from './ModalContentContainer';
import { ModalVariant } from '@/types/guest-page-types';

const ContactUs = ({
  showContactUs,
  closeModal,
}: {
  showContactUs: boolean;
  closeModal: () => void;
}) => (
  <Modal open={showContactUs} onClose={closeModal}>
    <ModalContentContainer variant={ModalVariant.INFO}>
      <h2 className="info__heading">Contact</h2>

      <p className="info__para info__para--green info__para--large">
        If you have any questions, please contact us at:
      </p>
      <p className="info__para info__para--dark-green success-rsvp__paragraph--helvetica-font">
        {process.env.NEXT_PUBLIC_INFO_EMAIL}
      </p>
    </ModalContentContainer>
  </Modal>
);

export default ContactUs;
