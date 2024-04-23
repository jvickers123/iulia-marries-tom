import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import ModalContentContainer from './ModalContentContainer';
import { ModalVariant } from '@/types/guest-page-types';
import FoodForm from './FoodForm';

const FoodInfo = ({
  showFoodInfo,
  closeModal,
  openOrderFood,
}: {
  showFoodInfo: boolean;
  closeModal: () => void;
  openOrderFood: () => void;
}) => {
  const handleOrderFood = () => {
    closeModal();
    openOrderFood();
  };

  return (
    <Modal open={showFoodInfo} onClose={closeModal}>
      <ModalContentContainer variant={ModalVariant.INFO}>
        <h2 className="info__heading">Food</h2>

        <p className="info__para info__para--green info__para--large">Lunch</p>

        <p className="info__para info__para--dark-green">
          After the ceremony, we will be having a BBQ
        </p>

        <p className="info__para info__para--dark-green">
          If you are coming for the full day, please select from the following
          options:
        </p>

        <p className="info__para info__para--purple info__para--margin-top">
          Garlic and Rosemary Lamb
        </p>

        <p className="info__para info__para--purple">
          Seared Salmon with Coriander Yoghurt
        </p>

        <p className="info__para info__para--purple">
          Vegetable and Halloumi Kebab (Vegetarian)
        </p>

        <p className="info__para info__para--purple">
          Vegatable and Smooked Tofu Kebab (Vegan)
        </p>

        <p className="info__para info__para--black info__para--margin-top">
          There will be a selection of sides and salads too.
        </p>

        <p className="info__para info__para--green info__para--large info__para--margin-top">
          Evening Food
        </p>

        <p className="info__para info__para--dark-green">
          If you would like a posh hotdog in the evening please select one of
          the options below:
        </p>

        <p className="info__para info__para--purple info__para--margin-top">
          Classic Dog
        </p>

        <p className="info__para info__para--purple">
          Fish Goujon Dog with Pea, Mint and Tartare Sauce
        </p>

        <p className="info__para info__para--purple">
          Greek Dog with Chickpea and Halloumi (Vegetarian)
        </p>

        <p className="info__para info__para--purple">
          Greek Dog with Chickpea and Tofu (Vegan)
        </p>

        <p className="info__para info__para--black info__para--margin-top">
          All served with coleslaw and salad
        </p>

        <p className="info__para info__para--green info__para--margin-top">
          Order below and let us know if you have any dietry requirements.
        </p>
        <p className="info__para info__para--green">
          If you change your mind, just order again and we will take the latest
          order.
        </p>

        <Button
          variant="contained"
          className="info__button"
          size="large"
          color="secondary"
          onClick={handleOrderFood}>
          Order Food
        </Button>
      </ModalContentContainer>
    </Modal>
  );
};

export default FoodInfo;
