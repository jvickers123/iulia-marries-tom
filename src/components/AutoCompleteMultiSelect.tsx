import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { RSVPGuest } from '@/types/guest-page-types';
import { getPeopleInfoFromAPI } from '@/utilities/form-utils';
import Chip from '@mui/material/Chip';

const AutoCompleteMultiSelect = ({
  onChange,
  value,
  isRSVPForm = true,
  isBookingForm = false,
}: {
  onChange: (event: React.SyntheticEvent<Element>, value: RSVPGuest[]) => void;
  value: RSVPGuest[];
  isRSVPForm?: boolean;
  isBookingForm?: boolean;
}) => {
  const [guests, setGuests] = useState<RSVPGuest[]>([]);

  useEffect(() => {
    const getPeopleInfo = async () => {
      const peopleInfo = await getPeopleInfoFromAPI();

      if (!peopleInfo) return;
      setGuests(peopleInfo);
    };
    getPeopleInfo();
  }, []);

  return (
    <Autocomplete
      multiple
      onChange={onChange}
      id="people"
      value={value}
      options={guests}
      filterSelectedOptions
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
      getOptionLabel={guest => guest.name}
      renderOption={(props, guest) => (
        <li {...props} key={guest.id}>
          {guest.name}
        </li>
      )}
      renderTags={(tagValue, getTagProps) => {
        return tagValue.map((option, index) => (
          <Chip
            {...getTagProps({ index })}
            key={option.id}
            label={option.name}
          />
        ));
      }}
      renderInput={params => (
        <TextField
          {...params}
          label={
            isRSVPForm
              ? 'Who are you replying for?'
              : isBookingForm
              ? 'Who are you booking for?'
              : 'Guests'
          }
          className="booking-form__input"
          placeholder="Type to find your name"
        />
      )}
    />
  );
};

export default AutoCompleteMultiSelect;
