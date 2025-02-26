import { ChangeEvent, FormEvent, useState } from "react";
import i18n from "../../i18n/i18n";
import { UserModel } from "../../models/userModel";
import { errorMessage } from "../../utils/toasts";
import { useTranslation } from "react-i18next";

export function useRegister() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [language, setLanguage] = useState(i18n.language);
  const [gender, setGender] = useState(0);
  const [acceptCGU, setAcceptCGU] = useState(false);
  const [captchaOk, setCaptchaOk] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
      setPasswordsMatch(confirmPassword === e.target.value);
    } else if (e.target.name == "confirm") {
      setConfirmPassword(e.target.value);
      setPasswordsMatch(password === e.target.value);
    }
  };

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value != "-1") {
      setLanguage(e.target.value);
    } else {
      setLanguage("");
    }
  };

  const handleGenerChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setGender(Number(e.target.value));
  };

  const verifyToken = async (e: string | null) => {
    const newUser = new UserModel();
    const response = await newUser.verifyCaptcha(e);
    setCaptchaOk(response);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (name != "" && password != "") {
      const newUser = new UserModel();
      await newUser.baseInsert({
        name: name.trimEnd(),
        password: password.trimEnd(),
        gender,
        language,
      });
    } else {
      errorMessage(t("components.form.missingField"));
    }
  };

  return {
    name,
    password,
    confirmPassword,
    passwordsMatch,
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
  };
}
