import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { notification } from '@/lib/notifications';
import { logOutFx } from '@/store/authenticationReducer';

type ServerError = {
  status: number;
  data: { message: string };
};

type ErrorHandlerArgs = {
  err: unknown;
  dispatch: AppDispatch;
  toastOn500?: boolean;
};

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

export function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    typeof (error as any).message === 'string'
  );
}

const isServerError = (
  err: FetchBaseQueryError
): err is { status: number; data: unknown } => {
  return !('error' in err);
};

export const errorHandler = ({ err, dispatch, toastOn500 = false }: ErrorHandlerArgs) => {
  if (isFetchBaseQueryError(err)) {
    if (isServerError(err)) {
      console.error(err);
      if (err.status === 403) {
        notification('Токен истек. Перезайдите в ваш профиль.', 'error');
        dispatch(logOutFx());
      } else if (err.status === 500 && toastOn500) {
        notification('Запланированная ошибка сервера. Попробуйте снова', 'error');
      } else {
        // todo: для других ошибок сервера нужны
        // конкретные ответы в зависимости от эндпойнта
        notification(
          `Ошибка Cервера ${err.status}: ${(err as ServerError).data.message || err.data}`,
          'error'
        );
      }
    } else {
      switch (err.status) {
        // Сюда попадет запланированная ошибка сервера с кодом 500.
        // Если бэк отдал не json данные а text/plane
        case 'PARSING_ERROR':
          console.error('PARSING_ERROR: ', err);
          if (err.originalStatus === 500 && toastOn500) {
            notification('Запланированная ошибка сервера. Попробуйте снова', 'error');
          }
          break;
        default:
          console.error(err.error);
          notification(`Ошибка ${err.status}: ${err.error}`, 'error');
      }
    }
  } else if (isErrorWithMessage(err)) {
    console.error('Error with message:', err);
    notification(err.message, 'error');
  } else {
    console.error('Неизвестная ошибка: ', err);
  }
};
