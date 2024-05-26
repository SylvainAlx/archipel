import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import H1 from "../components/titles/h1";
import Input from "../components/form/input";
import Button from "../components/buttons/button";
import Form from "../components/form/form";
import { useTranslation } from "react-i18next";
import { register } from "../api/user/userAPI";
import Select from "../components/form/select";
import { languageList } from "../settings/consts";
import { errorMessage } from "../utils/toasts";
import RequiredStar from "../components/form/requiredStar";

export default function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState("");
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

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value != "-1") {
      setLanguage(e.target.value);
    } else {
      setLanguage("");
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name != "" && password != "") {
      register({ name, password, language });
    } else {
      errorMessage(t("components.form.missingField"));
    }
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
            <Select
              title={t("components.form.select.language")}
              options={languageList}
              onChange={handleSelectChange}
            />
            <div className="flex justify-center text-sm gap-2">
              <span>{t("pages.register.ownAccount")}</span>
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
              text={t("components.buttons.register")}
              type="submit"
              disabled={!acceptCGU}
            />
            <RequiredStar />
          </>
        }
      />
    </>
  );
}
