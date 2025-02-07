import { ChangeEvent, FormEvent, useState } from "react";
import Input from "../components/form/input";
import { MDP_LOBBY } from "../settings/consts";
import Button from "../components/buttons/button";
import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import { lobbyAtom } from "../settings/store";
import Form from "../components/form/form";
import { errorMessage, successMessage } from "../utils/toasts";
import LangButton from "../components/buttons/langButton";
import RequiredStar from "../components/form/requiredStar";
import { createPageTitle } from "../utils/procedures";

export default function Lobby() {
  const { t } = useTranslation();
  const [password, setPassword] = useState("");
  const [, setAccess] = useAtom(lobbyAtom);

  createPageTitle("");

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
  return (
    <main className="flex flex-col items-center justify-start gap-4 h-[70vh]">
      <p className="max-w-[80%] text-center">{t("pages.lobby.description")}</p>
      <Form
        submit={handleSubmit}
        children={
          <>
            <Input
              type="password"
              placeholder={t("components.form.input.password")}
              name="password"
              required
              value={password}
              onChange={handleChange}
            />
            <RequiredStar />
            <Button
              type="submit"
              text={t("components.buttons.validate")}
              widthFull={true}
            />
            <LangButton />
          </>
        }
      />
    </main>
  );
}
