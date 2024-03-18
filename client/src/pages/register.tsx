import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import H1 from "../components/titles/h1";
import Input from "../components/form/input";
import Button from "../components/button";
import Form from "../components/form/form";
import { register } from "../api/authentification/authAPI";
import { useTranslation } from "react-i18next";

export default function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [acceptCGU, setAcceptCGU] = useState(false);
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type == "text") {
      setName(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    register({ name, password });
  };
  return (
    <>
      <H1 text={t("pages.register.title")} />
      <Form
        submit={handleSubmit}
        children={
          <>
            <Input
              required={true}
              onChange={handleChange}
              type="text"
              name="name"
              placeholder={t("pages.register.placeholderName")}
              value={name}
            />
            <Input
              required={true}
              onChange={handleChange}
              type="password"
              name="password"
              placeholder={t("pages.register.placeholderPassword")}
              value={password}
            />
            <div className="flex justify-center text-sm gap-2">
              <span>{t("pages.register.ownNation")}</span>
              <span
                className="underline cursor-pointer"
                onClick={() => navigate("/login")}
              >
                {t("pages.register.connect")}
              </span>
            </div>
            <div className="flex justify-start items-center gap-2">
              <input
                type="checkbox"
                className="cursor-pointer"
                onClick={() => setAcceptCGU(!acceptCGU)}
              ></input>
              <p className="text-sm">
                {t("pages.register.acceptTerms")}{" "}
                <Link to="/termsofservice">
                  <b>{t("pages.register.termsOfService")}</b>
                </Link>
              </p>
            </div>

            <Button
              path=""
              text={t("components.buttons.register")}
              type="submit"
              disabled={!acceptCGU}
            />
          </>
        }
      />
    </>
  );
}
