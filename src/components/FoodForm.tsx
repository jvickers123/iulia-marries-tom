import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import FoodFormGuest from './FoodFormGuest';
import { getPeopleInfoFromAPI } from '@/utilities/form-utils';
import { Guests } from '@/types/admin-types';
import { Button } from '@mui/material';
import { emptyFoodOrder } from '@/utilities/food';
import { FoodOrder } from '@/types/guest-page-types';

const FoodForm = ({
  openFoodInfo,
  formData,
  setFormData,
  handleSubmit,
}: {
  openFoodInfo: () => void;
  formData: FoodOrder[];
  setFormData: Dispatch<SetStateAction<FoodOrder[]>>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) => {
  const [guests, setGuests] = useState<Guests[]>([]);
  const [currentOrderKey, setCurrentOrderKey] = useState(1);
  const orderFoodButtonIsDisabled =
    formData.length === 0 || formData.some(order => !order.guestId);

  const addGuest = () => {
    setCurrentOrderKey(prev => prev + 1);
  };

  useEffect(() => {
    const getPeopleInfo = async () => {
      const peopleInfo = await getPeopleInfoFromAPI();

      if (!peopleInfo) return;
      setGuests(peopleInfo);
    };
    getPeopleInfo();
  }, []);

  useEffect(() => {
    if (currentOrderKey === 1) return;

    setFormData(prev => [...prev, { ...emptyFoodOrder, key: currentOrderKey }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentOrderKey]);

  return (
    <>
      <form onSubmit={handleSubmit} className="food-form">
        <h2 className="booking-form__title modal-heading">Order Food</h2>

        {formData.map((order, index) => (
          <FoodFormGuest
            orderData={formData[index]}
            key={order.key}
            orderIndex={index}
            guests={guests}
            setFormData={setFormData}
          />
        ))}

        <Button
          className="booking-form__submit-btn"
          onClick={addGuest}
          size="large">
          Add guest
        </Button>

        <Button
          variant="contained"
          className="booking-form__submit-btn"
          size="large"
          disabled={orderFoodButtonIsDisabled}
          type="submit">
          Order food
        </Button>
      </form>
      <Button
        variant="contained"
        onClick={openFoodInfo}
        className="info__button"
        color="secondary"
        size="large">
        Food info
      </Button>
    </>
  );
};

export default FoodForm;
