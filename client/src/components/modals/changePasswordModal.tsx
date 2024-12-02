import { changePasswordModalAtom, myStore } from "../../settings/store";
import Button from "../buttons/button";
import { ChangeEvent, FormEvent, useState } from "react";
import Form from "../form/form";
import Input from "../form/input";
import { useTranslation } from "react-i18next";
import { changePassword } from "../../api/user/userAPI";
import { ChangePasswordPayload } from "../../types/typUser";

export function ChangePasswordModal() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const { t } = useTranslation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const payload: ChangePasswordPayload = { oldPassword, newPassword };
    changePassword(payload);
    myStore.set(changePasswordModalAtom, false);
  };

  return (
    <>
      <h2 className="text-2xl text-center p-4">
        {t("components.modals.changePasswordModal.title")}
      </h2>
      <Form
        submit={handleSubmit}
        children={
          <>
            <Input
              required={true}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setOldPassword(e.target.value)
              }
              type="password"
              name="OldPassword"
              placeholder={t(
                "components.modals.changePasswordModal.oldPassword",
              )}
              value={oldPassword}
            />
            <Input
              required={true}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewPassword(e.target.value)
              }
              type="password"
              name="newPassword"
              placeholder={t(
                "components.modals.changePasswordModal.newPassword",
              )}
              value={newPassword}
            />
            <Input
              required={true}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setPasswordsMatch(newPassword === e.target.value);
              }}
              type="password"
              name="confirmPassword"
              placeholder={t(
                "components.modals.changePasswordModal.confirmPassword",
              )}
              value={confirmPassword}
            />
            <div className="w-full flex flex-col gap-4 justify-center my-4">
              <div className={`${!passwordsMatch && "cursor-not-allowed"}`}>
                <Button
                  text={t("components.buttons.validate")}
                  type="submit"
                  disabled={!passwordsMatch}
                  widthFull={true}
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
    </>
  );
}
