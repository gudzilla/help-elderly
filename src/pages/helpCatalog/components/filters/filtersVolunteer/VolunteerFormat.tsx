import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from '@mui/material';
import { useAppDispatch } from '@/lib/redux/hooks';
import { setVolunteerFormat } from '../../../state/filtersSlice';
import { useFiltersStateSelector } from '../../../state/selectors';

const isOnlineValues = {
  true: 'true',
  false: 'false',
} as const;

export const VolunteerFormat = () => {
  const {
    helperRequirements: { isOnline },
  } = useFiltersStateSelector();
  const dispatch = useAppDispatch();

  const handleFormatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    if (checked) {
      const value = name === 'true';
      dispatch(setVolunteerFormat(value));
    } else {
      dispatch(setVolunteerFormat(null));
    }
  };

  return (
    <FormControl component="fieldset" variant="standard">
      <FormLabel component="legend">Формат</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={isOnline === true}
              onChange={handleFormatChange}
              name={isOnlineValues.true}
            />
          }
          label="Онлайн"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isOnline === false}
              onChange={handleFormatChange}
              name={isOnlineValues.false}
            />
          }
          label="Офлайн"
        />
      </FormGroup>
    </FormControl>
  );
};
