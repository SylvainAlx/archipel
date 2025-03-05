import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserModel } from "../../models/userModel";

export function useRecovery() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [recovery, setRecovery] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (e.target.type == "text") {
      setName(e.target.value);
    } else if (e.target.type == "password") {
      setPassword(e.target.value);
      setPasswordsMatch(confirmPassword === e.target.value);
    } else {
      setRecovery(e.target.value);
    }
  };

  const handleConfirm = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setPasswordsMatch(password === e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newUser = new UserModel();
    const isOk = await newUser.recoveryUser({ name, recovery, password });
    if (isOk) navigate("/login");
  };

  return {
    name,
    password,
    recovery,
    confirmPassword,
    passwordsMatch,
    handleChange,
    handleConfirm,
    handleSubmit,
  };
}
