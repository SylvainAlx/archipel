import { ChangeEvent, FormEvent, useState } from "react";
import H1 from "../components/titles/h1";
import { recoveryNation } from "../api/authentification/authAPI";
import Input from "../components/form/input";
import Button from "../components/button";
import Form from "../components/form/form";
import TextArea from "../components/form/textArea";

export default function Recovery() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [recovery, setRecovery] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (e.target.type == "text") {
      setName(e.target.value);
    } else if (e.target.type == "password") {
      setPassword(e.target.value);
    } else {
      setRecovery(e.target.value);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    recoveryNation({ name, password, recovery });
  };

  return (
    <>
      <H1 text="Réinitialisation du mot de passe" />
      <Form
        submit={handleSubmit}
        children={
          <>
            <Input
              required={true}
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="Nom de la nation"
              value={name}
            />
            <TextArea
              required={true}
              onChange={handleChange}
              name="recovery"
              maxLength={1000}
              placeholder="Phrase de récupération"
              value={recovery}
            />
            <Input
              required={true}
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Nouveau mot de passe"
              value={password}
            />
            <Input
              required={true}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setPasswordsMatch(password === e.target.value);
              }}
              type="password"
              name="confirm"
              placeholder="Confirmer le mot de passe"
              value={confirmPassword}
            />
            {/* <button
          disabled={!passwordsMatch}
          type="submit"
          className={`button ${!passwordsMatch && "cursor-not-allowed"}`}
        >
          CHANGER DE MOT DE PASSE
        </button> */}
            <div className={`${!passwordsMatch && "cursor-not-allowed"}`}>
              <Button
                path=""
                text="CHANGER DE MOT DE PASSE"
                type="submit"
                disabled={!passwordsMatch}
              />
            </div>
          </>
        }
      />
    </>
  );
}
