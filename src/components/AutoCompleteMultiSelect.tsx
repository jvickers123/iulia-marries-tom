import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { RSVPGuest } from '@/types/rsvp-types';
import { getPeopleInfoFromAPI } from '@/utilities/form-utils';

const AutoCompleteMultiSelect = ({
  onChange,
  value,
  isRSVPForm = true,
}: {
  onChange: (event: React.SyntheticEvent<Element>, value: RSVPGuest[]) => void;
  value: RSVPGuest[];
  isRSVPForm?: boolean;
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
      getOptionLabel={guest => guest.name}
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
      getOptionKey={guest => guest.id}
      renderInput={params => (
        <TextField
          {...params}
          label={isRSVPForm ? 'Who are you replying for?' : 'Guests'}
          className="rsvp-form__input"
          placeholder="Type to find your name"
        />
      )}
    />
  );
};

export default AutoCompleteMultiSelect;
