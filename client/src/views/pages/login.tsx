import { useNavigate } from "react-router-dom";
import H1 from "../../components/ui/titles/h1";
import Input from "../../components/form/input";
import Button from "../../components/ui/buttons/button";
import Form from "../../components/form/form";
import { useTranslation } from "react-i18next";
import RequiredStar from "../../components/form/requiredStar";
import { createPageTitle } from "../../utils/procedures";
import { useLogin } from "../../hooks/pagesHooks/useLogin";

export default function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { name, password, handleChange, handleSubmit } = useLogin();

  createPageTitle(t("pages.login.title"));

  return (
    <>
      <H1 text={t("pages.login.title")} />
      <Form submit={handleSubmit}>
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
      </Form>
    </>
  );
}
