import { ChangeEvent, FormEvent, useState } from "react";
import { myStore, sessionAtom } from "../../settings/store";

export function useLogin() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type == "text") {
      setName(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    const login = async () => {
      myStore
        .get(sessionAtom)
        .user.login({ name: name.trimEnd(), password: password.trimEnd() });
    };
    e.preventDefault();
    login();
  };

  return { name, password, handleChange, handleSubmit };
}
