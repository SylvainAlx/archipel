import { changePasswordModalAtom, myStore } from "../../settings/store";
import Button from "../../components/buttons/button";
import Form from "../../components/form/form";
import Input from "../../components/form/input";
import { useModal } from "../../hooks/useModal";
import { useTranslation } from "react-i18next";
import { useChangePasswordModal } from "../../hooks/modalsHooks/useChangePasswordModal";

export function ChangePasswordModal() {
  const { t } = useTranslation();
  const modalRef = useModal(() => myStore.set(changePasswordModalAtom, false));
  const {
    oldPassword,
    newPassword,
    isPasswordStrong,
    passwordsMatch,
    confirmPassword,
    handleChange,
    handleSubmit,
  } = useChangePasswordModal();

  return (
    <div className="flex flex-col items-center" ref={modalRef} tabIndex={-1}>
      <h2 className="text-2xl text-center p-4">
        {t("components.modals.changePasswordModal.title")}
      </h2>
      <Form
        submit={handleSubmit}
        children={
          <>
            <Input
              required={true}
              onChange={handleChange}
              type="password"
              name="OldPassword"
              placeholder={t(
                "components.modals.changePasswordModal.oldPassword",
              )}
              value={oldPassword}
            />
            <Input
              required={true}
              onChange={handleChange}
              type="password"
              name="newPassword"
              placeholder={t(
                "components.modals.changePasswordModal.newPassword",
              )}
              value={newPassword}
            />
            {!isPasswordStrong && newPassword.length > 0 && (
              <p className="text-red-500 text-sm">
                {t("components.form.input.strongPassword")}
              </p>
            )}
            <Input
              required={true}
              onChange={handleChange}
              type="password"
              name="confirmPassword"
              placeholder={t(
                "components.modals.changePasswordModal.confirmPassword",
              )}
              value={confirmPassword}
            />
            <div className="flex gap-4 justify-center my-4">
              <div className={`${!passwordsMatch && "cursor-not-allowed"}`}>
                <Button
                  text={t("components.buttons.validate")}
                  type="submit"
                  disabled={!passwordsMatch || !isPasswordStrong}
                />
              </div>
              <Button
                text={t("components.buttons.cancel")}
                click={() => myStore.set(changePasswordModalAtom, false)}
              />
            </div>
          </>
        }
      />
    </div>
  );
}
