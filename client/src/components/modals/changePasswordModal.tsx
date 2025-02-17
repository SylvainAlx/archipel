import { changePasswordModalAtom, myStore } from "../../settings/store";
import Button from "../buttons/button";
import { ChangeEvent, FormEvent, useState } from "react";
import Form from "../form/form";
import Input from "../form/input";
import { useTranslation } from "react-i18next";
import { ChangePasswordPayload } from "../../types/typUser";
import { UserModel } from "../../models/userModel";
import { useModal } from "../../hooks/useModal";

export function ChangePasswordModal() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const { t } = useTranslation();
  const modalRef = useModal(() => myStore.set(changePasswordModalAtom, false));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name == "OldPassword") {
      setOldPassword(e.target.value);
    } else if (e.target.name == "newPassword") {
      setNewPassword(e.target.value);
      setPasswordsMatch(confirmPassword === e.target.value);
    } else if (e.target.name == "confirmPassword") {
      setConfirmPassword(e.target.value);
      setPasswordsMatch(newPassword === e.target.value);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload: ChangePasswordPayload = { oldPassword, newPassword };
    const newUser = new UserModel();
    await newUser.changePassword(payload);
    myStore.set(changePasswordModalAtom, false);
  };

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
                  disabled={!passwordsMatch}
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
