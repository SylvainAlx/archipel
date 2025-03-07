import { useAtom } from "jotai";
import { ChangeEvent, FormEvent, useState } from "react";
import { lobbyAtom } from "../../settings/store";
import { MDP_LOBBY } from "../../settings/consts";
import { errorMessage, successMessage } from "../../utils/toasts";
import { useTranslation } from "react-i18next";

export function useLobby() {
  const { t } = useTranslation();
  const [password, setPassword] = useState("");
  const [, setAccess] = useAtom(lobbyAtom);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password === MDP_LOBBY) {
      successMessage(t("pages.lobby.allowed"));
      setAccess(true);
      localStorage.setItem("lobbyToken", password);
    } else {
      errorMessage(t("pages.lobby.denied"));
    }
    setPassword("");
  };

  return { t, password, handleChange, handleSubmit };
}
