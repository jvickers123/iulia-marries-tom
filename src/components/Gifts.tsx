import Modal from '@mui/material/Modal';
import ModalContentContainer from './ModalContentContainer';
import { ModalVariant } from '@/types/guest-page-types';
import GiftForm from './GiftForm';

const Gifts = ({
  showGifts,
  closeModal,
}: {
  showGifts: boolean;
  closeModal: () => void;
}) => (
  <Modal open={showGifts} onClose={closeModal}>
    <ModalContentContainer variant={ModalVariant.INFO}>
      <h2 className="info__heading">Gifts</h2>

      <p className="info__para info__para--green">
        For those of you who are thinking about a wedding gift,
      </p>
      <p className="info__para info__para--purple">
        because we have lived together for some time, our house is already
        pretty kitted out
      </p>

      <p className="info__para info__para--dark-green">
        However, we are planning to go on a honeymoon and renovate our house in
        the future, so if your gift was to contribute to either of these, we
        would be very grateful
      </p>

      <p className="info__para info__para--black info__para--margin-top">
        Please contact us for bank details or provide an email below and we can
        send them over
      </p>

      <GiftForm />
    </ModalContentContainer>
  </Modal>
);

export default Gifts;
