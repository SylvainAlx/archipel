import { ChangeEvent, FormEvent, useState } from "react";
import { isStrongPassword } from "../../utils/functions";
import { ChangePasswordPayload } from "../../types/typUser";
import { UserModel } from "../../models/userModel";
import { changePasswordModalAtom, myStore } from "../../settings/store";

export function useChangePasswordModal() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isPasswordStrong, setIsPasswordStrong] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name == "OldPassword") {
      setOldPassword(e.target.value);
    } else if (e.target.name == "newPassword") {
      setIsPasswordStrong(isStrongPassword(e.target.value));
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

  return {
    oldPassword,
    newPassword,
    isPasswordStrong,
    passwordsMatch,
    confirmPassword,
    handleChange,
    handleSubmit,
  };
}
