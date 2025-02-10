import { Stack, Typography } from '@mui/material';
import { Filters } from './components/filters/Filters';
import { Results } from './components/results/Results';
import { HelpCatalogSearch } from './HelpCatalogSearch';
import { useGetFavouritesQuery } from '@/lib/api/api';

const mainContentStyle = {
  flex: 1,
};

export const HelpCatalogPage = () => {
  // ---------------- GET FAVORITES LIST ---------------
  const { data: favoritesList } = useGetFavouritesQuery();
  if (favoritesList) {
    // console.log('favoritesList = ', favoritesList);
  }
  return (
    <Stack padding="30px 40px" direction="column" spacing={2}>
      <Typography component="h1" variant="h4">
        Запросы о помощи
      </Typography>
      <Stack direction="row" spacing={'20px'}>
        <Filters />
        <Stack direction="column" spacing={'20px'} sx={mainContentStyle}>
          <HelpCatalogSearch />
          <Results />
        </Stack>
      </Stack>
    </Stack>
  );
};
