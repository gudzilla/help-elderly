import { useAppSelector } from '@/lib/redux/hooks';
import { FavoritesResponse } from '@/lib/api/api';

const favouritesSelector = (state: RootState) =>
  //todo:  надо ли добавить || null или что то подобное ?
  (state.helpEldersApi.queries['getFavourites(undefined)']?.data as FavoritesResponse) ??
  [];

export const useFavouritesSelector = () => useAppSelector(favouritesSelector);
