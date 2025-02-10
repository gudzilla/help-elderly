import { useAppSelector } from '@/lib/redux/hooks';

const filtersStateSelector = (state: RootState) => state.filters;

export const useFiltersStateSelector = () => useAppSelector(filtersStateSelector);
