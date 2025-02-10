import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { helpEldersApi } from '../lib/api/api';
import filtersSlice from '../pages/helpCatalog/state/filtersSlice';
import { authenticationReducer } from './authenticationReducer';

export const store = configureStore({
  reducer: {
    auth: authenticationReducer,
    filters: filtersSlice,
    [helpEldersApi.reducerPath]: helpEldersApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(helpEldersApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
