import { ChangeEvent, FormEvent, useState } from "react";
import H1 from "../components/titles/h1";
import { RecoveryFetch } from "../utils/fetch";
import { useNavigate } from "react-router-dom";
import { infoModal, loadingSpinner, myStore } from "../settings/store";
import { useAtom } from "jotai";
import Input from "../components/form/input";
import Button from "../components/button";
import Form from "../components/form/form";
import TextArea from "../components/form/textArea";
import { SERVEUR_LOADING_STRING } from "../settings/consts";

export default function Recovery() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [recovery, setRecovery] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [, setInfo] = useAtom(infoModal);

  const navigate = useNavigate();

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
    myStore.set(loadingSpinner, { show: true, text: SERVEUR_LOADING_STRING });
    const dataToSend = {
      name,
      recovery,
      newPassword: password,
    };
    RecoveryFetch(dataToSend)
      .then((data) => {
        myStore.set(loadingSpinner, { show: false, text: "" });
        setInfo(data.message);
        if (data.message === "nouveau mot de passe pris en compte") {
          navigate("/login");
        }
      })
      .catch((error) => {
        myStore.set(loadingSpinner, { show: false, text: "" });
        alert(error.message);
      });
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
