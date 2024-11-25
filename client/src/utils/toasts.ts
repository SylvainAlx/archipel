import { toast } from "react-toastify";

export const successMessage = (message: string) =>
  toast.success(message, {
    autoClose: 2000,
  });
export const errorMessage = (message: string) =>
  toast.error(message, {
    autoClose: 2500,
  });
