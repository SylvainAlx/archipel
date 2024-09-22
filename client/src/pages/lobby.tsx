import { ChangeEvent, FormEvent, useState } from "react";
import Input from "../components/form/input";
import { MDP_LOBBY } from "../settings/consts";
import Button from "../components/buttons/button";
import { useAtom } from "jotai";
// import { useTranslation } from "react-i18next";
import { lobbyAtom } from "../settings/store";
import Form from "../components/form/form";
import { errorMessage, successMessage } from "../utils/toasts";

export default function Lobby() {
  // const { t } = useTranslation();
  const [password, setPassword] = useState("");
  const [, setAccess] = useAtom(lobbyAtom);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password === MDP_LOBBY) {
      successMessage("accès autorisé");
      setAccess(true);
      localStorage.setItem("lobbyToken", password);
    } else {
      errorMessage("accès reffusé");
    }
  };
  return (
    <main className="flex flex-col items-center justify-start gap-4 h-[70vh]">
      <p className="max-w-[80%] text-center">
        Renseignez le mot de passe pour accéder à l'application
      </p>
      <Form
        submit={handleSubmit}
        children={
          <>
            <Input
              type="password"
              placeholder="Mot de passe"
              name="password"
              required
              value={password}
              onChange={handleChange}
            />
            <Button type="submit" text="VALIDER" widthFull={true} />
          </>
        }
      />
    </main>
  );
}
