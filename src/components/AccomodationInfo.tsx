import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import ModalContentContainer from './ModalContentContainer';
import { ModalVariant } from '@/types/guest-page-types';
import { tentCosts } from '@/utilities/accomodation';
import Image from 'next/image';

const AccomodationInfo = ({
  showMoreInfo,
  closeModal,
  openBookAccomodation,
}: {
  showMoreInfo: boolean;
  closeModal: () => void;
  openBookAccomodation: () => void;
}) => {
  const handleBookAccomodation = () => {
    closeModal();
    openBookAccomodation();
  };
  return (
    <Modal open={showMoreInfo} onClose={closeModal}>
      <ModalContentContainer variant={ModalVariant.INFO}>
        <h2 className="info__heading">Accomodation</h2>

        <p className="info__para info__para--green">
          You can book accomodation for the wedding here. There are 3 types of
          tents to choose from.
        </p>

        <p className="info__para info__para--purple info__para--large info__para--margin-top">
          Empty Tent
        </p>

        <Image
          src="/assets/empty-tent.webp"
          alt="empty bell tent"
          className="info__image"
          width={200}
          height={200}
        />

        <p className="info__para info__para--dark-green">
          Sleeps 1 - 6 people. All ready for you to move into. You will need to
          bring roll mats, bedding and sleeping bags etc.
        </p>

        <p className="info__para info__para--black">
          Cost: £{tentCosts.emptyTent.initialPrice} for 1 - 6 people.
        </p>

        <p className="info__para info__para--purple info__para--large info__para--margin-top">
          Party Tent
        </p>

        <Image
          src="/assets/party-tent.webp"
          alt="bell tent with airbed"
          className="info__image"
          width={200}
          height={200}
        />

        <p className="info__para info__para--dark-green">
          Sleeps 2 - 6 people. Includes airbeds and bedding. Perfect for
          parties.
        </p>

        <p className="info__para info__para--black">
          Cost: £{tentCosts.partyTent.initialPrice} for 2 people.
        </p>

        <p className="info__para info__para--black">
          Extra Bed: £{tentCosts.partyTent.pricePerExtra} per person.
        </p>

        <p className="info__para info__para--purple info__para--large info__para--margin-top">
          Luxury Tent
        </p>

        <Image
          src="/assets/luxury-tent.webp"
          alt="double bed inside tent"
          className="info__image"
          width={200}
          height={200}
        />

        <p className="info__para info__para--dark-green">
          Sleeps 2 - 4 people. Includes real beds and mattresses.
        </p>

        <p className="info__para info__para--black">
          Cost: £{tentCosts.luxuryTent.initialPrice} for 2 people.
        </p>

        <p className="info__para info__para--black">
          Extra Bed: £{tentCosts.luxuryTent.pricePerExtra} per person.
        </p>

        <p className="info__para info__para--green info__para--margin-top">
          Once you have chosen, you can book it here and you will recieve an
          email about how to pay for it.
        </p>

        <Button
          variant="contained"
          className="info__button"
          size="large"
          color="secondary"
          onClick={handleBookAccomodation}>
          Book Accomodation
        </Button>
      </ModalContentContainer>
    </Modal>
  );
};

export default AccomodationInfo;
