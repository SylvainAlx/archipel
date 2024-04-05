import { ChangeEvent, FormEvent, useState } from "react";
import H1 from "../components/titles/h1";
import { recoveryNation } from "../api/authentification/authAPI";
import Input from "../components/form/input";
import Button from "../components/buttons/button";
import Form from "../components/form/form";
import TextArea from "../components/form/textArea";
import { useTranslation } from "react-i18next";

export default function Recovery() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [recovery, setRecovery] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const { t } = useTranslation();

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
      <H1 text={t("pages.recovery.title")} />
      <Form
        submit={handleSubmit}
        children={
          <>
            <Input
              required={true}
              onChange={handleChange}
              type="text"
              name="name"
              placeholder={t("pages.recovery.placeholderName")}
              value={name}
            />
            <TextArea
              required={true}
              onChange={handleChange}
              name="recovery"
              maxLength={1000}
              placeholder={t("pages.recovery.recoveryKey")}
              value={recovery}
            />
            <Input
              required={true}
              onChange={handleChange}
              type="password"
              name="password"
              placeholder={t("pages.recovery.newPassword")}
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
              placeholder={t("pages.recovery.confirmPassword")}
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
                text={t("pages.recovery.changePassword")}
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
