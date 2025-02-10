import { InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch } from '@/lib/redux/hooks';
import { setSearchQuery } from './state/filtersSlice';
import { debounce } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useFiltersStateSelector } from './state/selectors';

export const HelpCatalogSearch = () => {
  const dispatch = useAppDispatch();
  const { searchQuery } = useFiltersStateSelector();
  const [searchInput, setSearchInput] = useState(searchQuery);

  const debouncedChangeHandler = useMemo(
    () =>
      debounce((inputValue: string) => {
        dispatch(setSearchQuery(inputValue));
      }, 500),
    []
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchInput(value);
    debouncedChangeHandler(value);
  };

  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  return (
    <Paper>
      <Stack direction="column" padding="20px 36px 40px 36px" spacing={'10px'}>
        <Typography variant="h6">Поиск</Typography>
        <TextField
          value={searchInput}
          id="standard-search"
          type="search"
          variant="standard"
          placeholder="Введите название задачи или организации"
          onChange={handleInputChange}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      </Stack>
    </Paper>
  );
};
