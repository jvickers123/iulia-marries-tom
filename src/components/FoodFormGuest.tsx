import { Dispatch, SetStateAction, useState } from 'react';
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Select,
} from '@mui/material';
import { emptyFoodOption } from '@/utilities/food';
import {
  FoodOrder,
  HotdogOptions,
  LunchOptions,
} from '@/types/guest-page-types';
import { Guests } from '@/types/admin-types';

const FoodForm = ({
  guests,
  setFormData,
}: {
  guests: Guests[];
  setFormData: Dispatch<SetStateAction<FoodOrder[]>>;
}) => {
  const [foodOption, setFoodOption] = useState(emptyFoodOption);

  return (
    <div className="food-form__guest-row">
      <Autocomplete
        disablePortal
        id="guest"
        options={guests}
        className="food-form__guest-row-item"
        getOptionLabel={guest => guest.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        noOptionsText=""
        filterOptions={(options, state) => {
          if (state.inputValue.length <= 2) {
            return [];
          }

          const filtered = options.filter(option =>
            option.name.toLowerCase().includes(state.inputValue.toLowerCase())
          );
          return filtered;
        }}
        renderInput={params => (
          <TextField
            {...params}
            label={'Guest'}
            placeholder="Type to find your name"
          />
        )}
      />

      <div className="food-form__option-flex-container">
        <FormControl variant="standard" className="food-form__guest-row-item">
          <InputLabel id="lunch-label">Lunch</InputLabel>
          <Select
            labelId="lunch-label"
            id="lunch"
            value={foodOption.lunch}
            defaultValue="none"
            onChange={e =>
              setFoodOption(prev => ({
                ...prev,
                lunch: e.target.value as LunchOptions,
              }))
            }
            label="Lunch">
            <MenuItem value="none">
              <em>None</em>
            </MenuItem>
            <MenuItem value="lamb">Garlic and Rosemary Lamb</MenuItem>
            <MenuItem value="salmon">
              Seared Salmon with Coriander Yoghurt
            </MenuItem>
            <MenuItem value="veggie">
              Vegetable and Halloumi Kebab (Vegetarian)
            </MenuItem>
            <MenuItem value="vegan">
              Vegatable and Smooked Tofu Kebab (Vegan)
            </MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="standard" className="food-form__guest-row-item">
          <InputLabel id="hotdog-label">Evening Meal</InputLabel>
          <Select
            labelId="hotdog-label"
            id="hotdog"
            value={foodOption.hotdog}
            defaultValue="none"
            onChange={e =>
              setFoodOption(prev => ({
                ...prev,
                hotdog: e.target.value as HotdogOptions,
              }))
            }
            label="Lunch">
            <MenuItem value="none">
              <em>None</em>
            </MenuItem>
            <MenuItem value="classic">Classic Dog</MenuItem>
            <MenuItem value="fish">
              Fish Goujon Dog with Pea, Mint and Tartare Sauce
            </MenuItem>
            <MenuItem value="halloumi">
              Greek Dog with Chickpea and Halloumi (Vegetarian)
            </MenuItem>
            <MenuItem value="tofu">
              Greek Dog with Chickpea and Tofu (Vegan)
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <TextField
        className="food-form__guest-row-item"
        id="dietryRequirements"
        label="Dietry Requirements"
        variant="standard"
        multiline
        onChange={() => {}}
      />
    </div>
  );
};
export default FoodForm;
