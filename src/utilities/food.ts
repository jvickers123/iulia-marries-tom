import { FoodOptions, FoodOrder } from '../types/guest-page-types';

export const emptyFoodOption: FoodOptions = {
  lunch: 'none',
  hotdog: 'none',
  dietryRequirements: '',
};

export const emptyFoodOrder: FoodOrder = {
  ...emptyFoodOption,
  guestId: '',
  guestName: '',
  key: 1,
};

export const lunchOptionsMap = {
  lamb: 'Garlic and Rosemary Lamb',
  salmon: 'Seared Salmon with Coriander Yoghurt',
  veggie: 'Vegetable and Halloumi Kebab (Vegetarian)',
  vegan: 'Vegatable and Smoked Tofu Kebab (Vegan)',
  none: 'None',
};

export const hotdogOptionsMap = {
  classic: 'Classic Dog',
  fish: 'Fish Goujon Dog with Pea, Mint and Tartare Sauce',
  halloumi: 'Greek Dog with Chickpea and Halloumi (Vegetarian)',
  tofu: 'Greek Dog with Chickpea and Tofu (Vegan)',
  none: 'None',
};
