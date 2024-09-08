import { toast } from 'react-toastify';

export const notifySuccessPopUp = (message: string, theme = 'light') => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme,
  });
};
