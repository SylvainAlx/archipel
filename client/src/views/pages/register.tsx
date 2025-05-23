import { Link, useNavigate } from "react-router-dom";
import H1 from "../../components/ui/titles/h1";
import Input from "../../components/form/input";
import Button from "../../components/ui/buttons/button";
import Form from "../../components/form/form";
import Select from "../../components/form/select";
import { CAPTCHA_PUBLIC_KEY } from "../../settings/consts";
import ReCAPTCHA from "react-google-recaptcha";
import { genderList, languageList } from "../../settings/lists";
import RequiredStar from "../../components/form/requiredStar";
import { createPageTitle } from "../../utils/procedures";
import { useRegister } from "../../hooks/pagesHooks/useRegister";

export default function Register() {
  const {
    name,
    password,
    confirmPassword,
    passwordsMatch,
    isPasswordStrong,
    godparentId,
    haveGodparent,
    setHaveGodparent,
    language,
    acceptCGU,
    setAcceptCGU,
    captchaOk,
    handleChange,
    handleLanguageChange,
    handleGenerChange,
    verifyToken,
    handleSubmit,
    t,
  } = useRegister();

  createPageTitle(t("pages.register.title"));

  const navigate = useNavigate();

  return (
    <>
      <H1 text={t("pages.register.title")} />
      <div className="flex justify-center text-sm gap-2">
        <span>{t("pages.register.ownAccount")}</span>
        <span
          className="underline cursor-pointer"
          onClick={() => navigate("/login")}
        >
          {t("pages.register.connect")}
        </span>
      </div>
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
          {!isPasswordStrong && password.length > 0 && (
            <p className="text-red-500 text-sm">
              {t("components.form.input.strongPassword")}
            </p>
          )}
          <Input
            required={true}
            onChange={handleChange}
            type="password"
            name="confirm"
            placeholder={t("pages.recovery.confirmPassword")}
            value={confirmPassword}
          />
          {!passwordsMatch && (
            <p className="text-red-500 text-sm">
              {t("components.form.input.confirmPassword")}
            </p>
          )}
          <Select
            title="Genre"
            options={genderList}
            onChange={handleGenerChange}
            required={true}
          />
          <Select
            title={t("components.form.select.language")}
            options={languageList}
            onChange={handleLanguageChange}
            value={language}
            required={true}
          />
          <div className="w-full flex justify-start items-center gap-2">
            <input
              type="checkbox"
              className="cursor-pointer"
              onClick={() => setHaveGodparent(!haveGodparent)}
            ></input>
            <p className="text-sm">
              {t("components.form.input.haveGodparent")}
            </p>
          </div>
          {haveGodparent && (
            <Input
              onChange={handleChange}
              type="text"
              name="godparent"
              placeholder={t("components.form.input.godparentId")}
              value={godparentId}
            />
          )}
          <div className="flex justify-start items-center gap-2">
            <input
              type="checkbox"
              className="cursor-pointer"
              onClick={() => setAcceptCGU(!acceptCGU)}
            ></input>
            <p className="text-sm">
              {t("pages.register.acceptTerms")}{" "}
              <Link to="/termsofservice" target="_blank">
                <b>{t("pages.register.termsOfService")}</b>
              </Link>
            </p>
          </div>
          <ReCAPTCHA sitekey={CAPTCHA_PUBLIC_KEY} onChange={verifyToken} />
          <RequiredStar />
          <Button
            text={t("components.buttons.register")}
            type="submit"
            disabled={
              !acceptCGU || !captchaOk || !passwordsMatch || !isPasswordStrong
            }
            widthFull={true}
          />
        </>
      </Form>
    </>
  );
}
