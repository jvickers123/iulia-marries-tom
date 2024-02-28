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
          We have three types of glamping tent for you to choose from.
        </p>

        <p className="info__para info__para--green">
          The tents are being delivered on the Friday so if you are invited to
          the full day, you are welcome to stay for two nights at no extra cost.
        </p>

        <p className="info__para info__para--green">
          There will be toilets and nice warm showers available on the site.
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
          Sleeps 1 - 6 people. You will need to bring roll mats, bedding and
          sleeping bags etc.
        </p>

        <p className="info__para info__para--black">
          £{tentCosts.emptyTent.initialPrice} for 1 person.
        </p>

        <p className="info__para info__para--black">
          £{tentCosts.emptyTent.pricePerExtra} per extra person.
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
          £{tentCosts.partyTent.initialPrice} for 2 people.
        </p>

        <p className="info__para info__para--black">
          £{tentCosts.partyTent.pricePerExtra} per extra person.
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
          £{tentCosts.luxuryTent.initialPrice} for 2 people.
        </p>

        <p className="info__para info__para--black">
          £{tentCosts.luxuryTent.pricePerExtra} per extra person.
        </p>

        <p className="info__para info__para--green info__para--margin-top">
          Once you have chosen your tent, please book here and you will receive
          an email with details of how to make a payment.
        </p>

        <p className="info__para info__para--green">
          Please make all bookings by 31/04/24
        </p>

        <p className="info__para info__para--green">
          If you have any questions please contact{' '}
          <span className="info__para--green success-rsvp__paragraph--helvetica-font">
            {process.env.NEXT_PUBLIC_INFO_EMAIL}
          </span>
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
