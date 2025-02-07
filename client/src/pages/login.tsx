import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import H1 from "../components/titles/h1";
import Input from "../components/form/input";
import Button from "../components/buttons/button";
import Form from "../components/form/form";
import { useTranslation } from "react-i18next";
import RequiredStar from "../components/form/requiredStar";
import { myStore, sessionAtom } from "../settings/store";
import { createPageTitle } from "../utils/procedures";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  createPageTitle(t("pages.login.title"));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type == "text") {
      setName(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    const login = async () => {
      myStore
        .get(sessionAtom)
        .user.login({ name: name.trimEnd(), password: password.trimEnd() });
    };
    e.preventDefault();
    login();
  };

  return (
    <>
      <H1 text={t("pages.login.title")} />
      <Form
        submit={handleSubmit}
        children={
          <>
            <Input
              required={true}
              onChange={handleChange}
              type="text"
              name="name"
              placeholder={t("components.form.input.name")}
              value={name}
            />
            <Input
              required={true}
              onChange={handleChange}
              type="password"
              name="password"
              placeholder={t("components.form.input.password")}
              value={password}
            />
            <div className="flex justify-center text-sm gap-2">
              <span
                className="underline cursor-pointer"
                onClick={() => navigate("/recovery")}
              >
                {t("pages.login.forgottenPassword")}
              </span>
            </div>
            <div className="flex justify-center text-sm gap-2 flex-wrap">
              <span>{t("pages.login.firstVisit")} </span>
              <span
                className="underline cursor-pointer"
                onClick={() => navigate("/register")}
              >
                {t("pages.login.newUser")}
              </span>
            </div>
            <RequiredStar />
            <Button
              text={t("components.buttons.login")}
              type="submit"
              widthFull={true}
            />
          </>
        }
      />
    </>
  );
}
