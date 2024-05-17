import { toast } from "react-toastify";
import i18n from "../i18n/i18n";


export const addCategory = () => toast.success(i18n.t("toasts.add"));
export const newElement = () => toast.success(i18n.t("toasts.new"));

export const signInOk = () => toast.success(i18n.t("toasts.signIn"));
export const signUpOK = () => toast.success(i18n.t("toasts.signUp"));
export const logoutOk = () => toast.success(i18n.t("toasts.logout"));
export const saveOk = () => toast.success(i18n.t("toasts.save"));
export const deleteOk = () => toast.success(i18n.t("toasts.delete"));

export const errorMessage = (message: string) => toast.error(message);