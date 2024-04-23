import { useEffect, useState } from 'react';
import FoodFormGuest from './FoodFormGuest';
import { emptyGuest, getPeopleInfoFromAPI } from '@/utilities/form-utils';
import { Guests } from '@/types/admin-types';
import { Button } from '@mui/material';
import { emptyFoodOrder } from '@/utilities/food';

const FoodForm = ({ openFoodInfo }: { openFoodInfo: () => void }) => {
  const [guests, setGuests] = useState<Guests[]>([]);
  const [formData, setFormData] = useState([emptyFoodOrder]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const addGuest = () => {
    setFormData(prev => [...prev, emptyFoodOrder]);
  };

  useEffect(() => {
    const getPeopleInfo = async () => {
      const peopleInfo = await getPeopleInfoFromAPI();

      if (!peopleInfo) return;
      setGuests(peopleInfo);
    };
    getPeopleInfo();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit} className="food-form">
        <h2 className="booking-form__title modal-heading">Order Food</h2>

        {formData.map(guest => (
          <FoodFormGuest
            key={guest.guestId}
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
