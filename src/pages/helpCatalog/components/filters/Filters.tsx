import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material';
import { FilterWhomWeHelp } from './FilterWhomWeHelp';
import { FilterHowWeHelp } from './FilterHowWeHelp';
import { FiltersVolunteer } from './filtersVolunteer/FiltersVolunteer';
import { FilterDate } from './FilterDate';
import { useAppDispatch } from '@/lib/redux/hooks';
import { removeAllFilters } from '../../state/filtersSlice';

const filtersSectionStyle = {
  width: '320px',
  padding: '20px',
};

export const Filters = () => {
  const dispatch = useAppDispatch();

  const handleClearFiltersButton = () => {
    dispatch(removeAllFilters());
  };
  return (
    <Paper sx={{ alignSelf: 'flex-start' }}>
      <Stack spacing={'20px'} sx={filtersSectionStyle}>
        <Box>
          <Typography variant="h6">Фильтрация</Typography>
          <Divider />
        </Box>
        <FilterWhomWeHelp />
        <FilterHowWeHelp />
        <FiltersVolunteer />
        <FilterDate />
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={handleClearFiltersButton}
        >
          СБРОСИТЬ
        </Button>
      </Stack>
    </Paper>
  );
};
