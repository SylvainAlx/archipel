import { toast } from "react-toastify";

const duration: number = 1500;

export const successMessage = (message: string) =>
  toast.success(message, {
    autoClose: duration,
  });
export const errorMessage = (message: string) =>
  toast.error(message, {
    autoClose: duration,
  });
