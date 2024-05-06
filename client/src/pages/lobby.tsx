import { ChangeEvent, FormEvent, useState } from "react";
import Input from "../components/form/input";
import H1 from "../components/titles/h1";
import { MDP_LOBBY } from "../settings/consts";
import Button from "../components/buttons/button";
import { useAtom } from "jotai";
import { showApp } from "../settings/store";
import { useTranslation } from "react-i18next";

export default function Lobby() {
  const [, setShowApp] = useAtom(showApp);
  const { t } = useTranslation();
  const [password, setPassword] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password === MDP_LOBBY) {
      setShowApp(true);
      localStorage.setItem("lobbyToken", password);
    }
  };
  return (
    <main className="flex flex-col items-center justify-center gap-4 h-[70vh]">
      <div className="w-[100px]">
        <img src="/logo.png" className="cursor-pointer h-full"></img>
      </div>
      <H1 text={t("components.logo.title")} />
      <p className="max-w-[80%] text-center">
        Renseignez le mot de passe pour accéder à l'application
      </p>
      <form
        className="flex flex-col items-center justify-center gap-2"
        onSubmit={handleSubmit}
      >
        <Input
          type="password"
          placeholder="Mot de passe"
          name="password"
          required
          value={password}
          onChange={handleChange}
        />
        <Button type="submit" text="VALIDER" path="" />
      </form>
    </main>
  );
}
