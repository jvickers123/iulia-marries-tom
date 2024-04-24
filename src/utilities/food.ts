import { FoodOptions, FoodOrder } from '../types/guest-page-types';

export const emptyFoodOption: FoodOptions = {
  lunch: 'none',
  hotdog: 'none',
  dietryRequirements: '',
};

export const emptyFoodOrder: FoodOrder = {
  ...emptyFoodOption,
  guestId: '',
  key: 1,
};
