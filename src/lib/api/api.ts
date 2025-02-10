import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HelpRequestData, UserData } from './types';
import { notification } from '../notifications';
import { errorHandler } from './errorHandler';
import { NavigateFunction } from 'react-router-dom';
import { logInFx } from '@/store/authenticationReducer';

type PARSING_ERROR = {
  /**
   * * `"PARSING_ERROR"`:
   *   An error happened during parsing.
   *   Most likely a non-JSON-response was returned with the default `responseHandler` "JSON",
   *   or an error occurred while executing a custom `responseHandler`.
   **/
  status: 'PARSING_ERROR';
  originalStatus: number;
  data: string;
  error: string;
};

type AuthData = {
  loginFormData: {
    login: string;
    password: string;
  };
  navigate: NavigateFunction;
};

type AuthResponse = {
  auth: boolean;
  token: string;
};

export type FavoritesResponse = HelpRequestData['id'][];

type OnQueryStartError = {
  error: unknown;
  isUnhandledError?: boolean;
  meta?: {
    request?: Record<string, any>;
    response?: Record<string, any>;
  };
};

function isOnQueryStartError(error: unknown): error is OnQueryStartError {
  return typeof error === 'object' && error != null && 'error' in error;
}

type HelpRequestId = HelpRequestData['id'];

export type HelpCatalogResponse = HelpRequestData[];

export const helpEldersApi = createApi({
  reducerPath: 'helpEldersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    authenticate: builder.mutation<AuthResponse, AuthData>({
      query: ({ loginFormData }) => ({
        url: '/auth',
        method: 'POST',
        body: loginFormData,
      }),
      async onQueryStarted({ navigate }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.auth) {
            dispatch(logInFx(data.token));
            navigate('/help-catalog', { replace: true });
          }
        } catch (error: unknown) {
          if (isOnQueryStartError(error)) {
            errorHandler({ err: error.error, dispatch, toastOn500: true });
          }
        }
      },
    }),
    getRequests: builder.query<HelpRequestData[], void>({
      query: () => '/request',
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error: unknown) {
          if (isOnQueryStartError(error)) {
            errorHandler({ err: error.error, dispatch });
          }
        }
      },
    }),
    getRequestById: builder.query<HelpRequestData, HelpRequestId>({
      // todo: тост на 500 ошибку НЕ нужен
      query: (requestId) => `/request/${requestId}`,
    }),
    getUser: builder.query<UserData, void>({
      // todo: ошибка 500 показать ТОСТ
      query: () => `/user`,
    }),
    contribution: builder.mutation<string, string>({
      query: (requestId) => ({
        url: `/request/${requestId}/contribution`,
        method: 'POST',
        body: { requestId },
        responseHandler: (response) => response.text(),
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          notification('Успех! Спасибо за помощь', 'success');
        } catch (error: unknown) {
          if (isOnQueryStartError(error)) {
            errorHandler({ err: error.error, dispatch, toastOn500: true });
          }
        }
      },
    }),
    getFavourites: builder.query<FavoritesResponse, void>({
      // todo: ошибка 500 показать ТОСТ
      query: () => `/user/favourites`,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          // console.log('getFavourites PENDING');
          await queryFulfilled;
          // console.log('getFavourites FULFILLED');
          // notification('Список избранного загружен', 'success');
        } catch (error: unknown) {
          console.error(error);
          // console.log('getFavourites ERROR');
          // notification('Не удалось загрузить избранное.', 'error');
          console.log('Не удалось загрузить избранное.');
          if (isOnQueryStartError(error)) {
            // console.log(error);
            if ((error.error as PARSING_ERROR).originalStatus === 500) {
              // notification('Делаем повторный запрос для Избранного', 'info');

              console.log('Делаем повторный запрос для Избранного');
              dispatch(
                helpEldersApi.endpoints.getFavourites.initiate(undefined, {
                  forceRefetch: true,
                })
              );
            }
            // errorHandler({ err: error.error, dispatch, toastOn500: true });
          }
        }
      },
    }),

    addToFavourites: builder.mutation<void, string>({
      query: (requestId) => ({
        url: `/user/favourites/`,
        method: 'POST',
        body: { requestId },
        responseHandler: (response) => response.text(),
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          // console.log('addToFavourites PENDING');
          await queryFulfilled;
          // console.log('addToFavourites FULFILLED');
          notification('Добавлено в избранное', 'success');
          dispatch(
            helpEldersApi.endpoints.getFavourites.initiate(undefined, {
              forceRefetch: true,
            })
          );
        } catch (error: unknown) {
          // console.log('addToFavourites ERROR');
          notification('Ошибка добавления в избранное.', 'error');
          if (isOnQueryStartError(error)) {
            // todo: тут есть в теории ошибка 400. Надо наверное ТОСТ тоже
            // errorHandler({ err: error.error, dispatch, toastOn500: true });
          }
        }
      },
    }),
    deleteFromFavourites: builder.mutation<void, string>({
      query: (requestId) => ({
        url: `/user/favourites/${requestId}`,
        method: 'DELETE',
        // body: { requestId },
        body: '123',
        responseHandler: (response) => response.text(),
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          // console.log('deleteFromFavourites PENDING');
          await queryFulfilled;
          // console.log('deleteFromFavourites FULFILLED');
          notification('Удалено из избранного.', 'warning');
          dispatch(
            helpEldersApi.endpoints.getFavourites.initiate(undefined, {
              forceRefetch: true,
            })
          );
        } catch (error: unknown) {
          // console.log('deleteFromFavourites ERROR');
          notification('Ошибка удаления из избранного.', 'error');
          if (isOnQueryStartError(error)) {
            // todo: тут есть в теории ошибка 400. Надо наверное ТОСТ тоже
            // errorHandler({ err: error.error, dispatch, toastOn500: true });
          }
        }
      },
    }),
  }),
});

export const {
  useAuthenticateMutation,
  useGetRequestsQuery,
  useGetRequestByIdQuery,
  useGetFavouritesQuery,
  useContributionMutation,
  useGetUserQuery,
  useAddToFavouritesMutation,
  useDeleteFromFavouritesMutation,
} = helpEldersApi;
