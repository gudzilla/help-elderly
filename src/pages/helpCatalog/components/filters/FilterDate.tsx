import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { useAppDispatch } from '@/lib/redux/hooks';
import { setFilterDate } from '../../state/filtersSlice';
import { ru } from 'date-fns/locale';
import { FormControl, FormLabel, IconButton, InputAdornment } from '@mui/material';
import { ClearIcon } from '@mui/x-date-pickers';
import { useFiltersStateSelector } from '../../state/selectors';

export const FilterDate = () => {
  const dispatch = useAppDispatch();
  const { helpDate } = useFiltersStateSelector();
  const dateIsNotNull = helpDate !== null;

  const dateValue = dateIsNotNull ? new Date(helpDate) : null;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
      <FormControl>
        <FormLabel sx={{ marginBottom: '10px' }}>Помощь актуальна до:</FormLabel>
        <DatePicker
          value={dateValue}
          onChange={(newValue) => {
            if (newValue !== null) {
              const date = new Date(newValue);
              dispatch(setFilterDate(date.toISOString()));
            }
          }}
          slotProps={{
            textField: ({ inputProps, ...params }) => ({
              ...params,
              placeholder: 'Выберите дату',
              fullWidth: true,
              sx: {
                '& .MuiOutlinedInput-input': {
                  padding: '12px',
                  paddingRight: 0,
                },
              },
              InputProps: {
                ...params.InputProps,
                endAdornment: (
                  <>
                    {dateIsNotNull && (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            dispatch(setFilterDate(null));
                          }}
                        >
                          <ClearIcon />
                        </IconButton>
                      </InputAdornment>
                    )}
                    {params.InputProps?.endAdornment}
                  </>
                ),
              },
            }),
          }}
        />
      </FormControl>
    </LocalizationProvider>
  );
};
