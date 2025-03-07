import H1 from "../../components/ui/titles/h1";
import Input from "../../components/form/input";
import Button from "../../components/ui/buttons/button";
import Form from "../../components/form/form";
import TextArea from "../../components/form/textArea";
import { useTranslation } from "react-i18next";
import RequiredStar from "../../components/form/requiredStar";
import { createPageTitle } from "../../utils/procedures";
import { useRecovery } from "../../hooks/pagesHooks/useRecovery";

export default function Recovery() {
  const { t } = useTranslation();
  const {
    name,
    password,
    recovery,
    confirmPassword,
    passwordsMatch,
    isPasswordStrong,
    handleChange,
    handleConfirm,
    handleSubmit,
  } = useRecovery();

  createPageTitle(t("pages.recovery.title"));

  return (
    <>
      <H1 text={t("pages.recovery.title")} />
      <Form submit={handleSubmit}>
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
          {!isPasswordStrong && password.length > 0 && (
            <p className="text-red-500 text-sm">
              {t("components.form.input.strongPassword")}
            </p>
          )}
          <Input
            required={true}
            onChange={handleConfirm}
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
          <RequiredStar />
          <div className={`${!passwordsMatch && "cursor-not-allowed"} w-full`}>
            <Button
              text={t("pages.recovery.changePassword")}
              type="submit"
              disabled={!passwordsMatch || !confirmPassword}
              widthFull={true}
            />
          </div>
        </>
      </Form>
    </>
  );
}
