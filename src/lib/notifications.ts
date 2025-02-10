import { toast, Slide } from 'react-toastify';

export const notification = (
  message: string,
  type: 'info' | 'success' | 'warning' | 'error' = 'info'
) => {
  return toast[type](message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Slide,
  });
};
