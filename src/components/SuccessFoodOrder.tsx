import Button from '@mui/material/Button';
import { FoodOrder } from '@/types/guest-page-types';
import { Dispatch, SetStateAction } from 'react';
import {
  emptyFoodOrder,
  hotdogOptionsMap,
  lunchOptionsMap,
} from '@/utilities/food';

const SuccessFoodOrder = ({
  orders,
  setSuccess,
  closeModal,
  setFormData,
}: {
  orders: FoodOrder[];
  setSuccess: Dispatch<SetStateAction<boolean>>;
  setFormData: Dispatch<SetStateAction<FoodOrder[]>>;
  closeModal: () => void;
}) => {
  const handleClick = () => {
    setSuccess(false);
    setFormData([emptyFoodOrder]);
    closeModal();
  };
  return (
    <div className="success-rsvp">
      <h2 className="success-rsvp__heading">Your order has been received</h2>

      <p className="success-rsvp__paragraph">You have ordered:</p>
      <ul className="success-rsvp__list">
        {orders.map(order => {
          const { hotdog, lunch, guestId, guestName, dietryRequirements } =
            order;
          return (
            <li key={guestId} className="success-rsvp__list-item">
              <p>
                {guestName}
                {lunch ? `: ${lunchOptionsMap[lunch]}` : ''}:{' '}
                {hotdogOptionsMap[hotdog]}
                {dietryRequirements ? `: ${dietryRequirements}` : ''}
              </p>
            </li>
          );
        })}
      </ul>

      <p className="success-rsvp__paragraph success-rsvp__paragraph--black">
        If you change your mind please just order again and we will take the
        final order
      </p>

      <Button variant="contained" color="secondary" onClick={handleClick}>
        Close
      </Button>
    </div>
  );
};
export default SuccessFoodOrder;
