import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useFiltersStateSelector } from '@/pages/helpCatalog/state/selectors';
import { useAppDispatch } from '@/lib/redux/hooks';
import { HelpRequestData } from '@/lib/api/types';
import { setRequesterType } from '../../state/filtersSlice';

type RequesterType = HelpRequestData['requesterType'];
type StrictRequesterTypeMap = { [K in RequesterType]: K };

const requesterTypeValues: StrictRequesterTypeMap = {
  person: 'person',
  organization: 'organization',
} as const;

export function FilterWhomWeHelp() {
  const { requesterType } = useFiltersStateSelector();
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (checked) {
      dispatch(setRequesterType(name as RequesterType));
    } else {
      dispatch(setRequesterType(null));
    }
  };

  return (
    <FormControl component="fieldset" variant="standard">
      <FormLabel component="legend">Кому мы помогаем</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={requesterType === requesterTypeValues.person}
              onChange={handleChange}
              name={requesterTypeValues.person}
            />
          }
          label="Пенсионерам"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={requesterType === requesterTypeValues.organization}
              onChange={handleChange}
              name={requesterTypeValues.organization}
            />
          }
          label="Дома престарелых"
        />
      </FormGroup>
    </FormControl>
  );
}
