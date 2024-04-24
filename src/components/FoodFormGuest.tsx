import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useState,
} from 'react';
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Select,
  Paper,
  SelectChangeEvent,
  FormHelperText,
  Button,
} from '@mui/material';
import {
  FoodOrder,
  HotdogOptions,
  LunchOptions,
} from '@/types/guest-page-types';
import { Guests } from '@/types/admin-types';

const FoodForm = ({
  guests,
  setFormData,
  orderData,
  orderIndex,
}: {
  guests: Guests[];
  setFormData: Dispatch<SetStateAction<FoodOrder[]>>;
  orderData: FoodOrder;
  orderIndex: number;
}) => {
  const handleChange = (
    event:
      | SelectChangeEvent<string>
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => {
      const clone = JSON.parse(JSON.stringify(prev));

      clone[orderIndex] = {
        ...clone[orderIndex],
        [event.target.name]: event.target.value as LunchOptions | HotdogOptions,
      };

      return clone;
    });
  };

  const handleAutocompleteChange = (
    _event: SyntheticEvent<Element, Event>,
    value: Guests | null
  ) => {
    setFormData(prev => {
      const clone = JSON.parse(JSON.stringify(prev));

      clone[orderIndex] = {
        ...clone[orderIndex],
        guestId: value?.id,
        fullDay: value?.fullDay,
      };

      return clone;
    });
  };

  const removeOrder = () => {
    setFormData(prev => {
      const clone = JSON.parse(JSON.stringify(prev)) as FoodOrder[];

      return clone.filter(order => order.key !== orderData.key);
    });
  };

  return (
    <Paper elevation={3} className="food-form__guest-row">
      <Autocomplete
        disablePortal
        id="guest"
        options={guests}
        className="food-form__guest-row-item"
        onChange={handleAutocompleteChange}
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
            name="lunch"
            value={orderData.lunch}
            defaultValue="none"
            disabled={orderData.fullDay === false}
            onChange={handleChange}
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
          <FormHelperText>Full day guests only</FormHelperText>
        </FormControl>

        <FormControl variant="standard" className="food-form__guest-row-item">
          <InputLabel id="hotdog-label">Evening Meal</InputLabel>
          <Select
            labelId="hotdog-label"
            id="hotdog"
            name="hotdog"
            value={orderData.hotdog}
            defaultValue="none"
            onChange={handleChange}
            label="Evening Meal">
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
        value={orderData.dietryRequirements}
        name="dietryRequirements"
        multiline
        onChange={handleChange}
      />

      <Button color="error" onClick={removeOrder}>
        Remove
      </Button>
    </Paper>
  );
};
export default FoodForm;
