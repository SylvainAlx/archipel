import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import H1 from "../components/titles/h1";
import Input from "../components/form/input";
import Button from "../components/button";
import Form from "../components/form/form";
import { login } from "../api/authentification/authAPI";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type == "text") {
      setName(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login({ name, password });
  };

  return (
    <>
      <H1 text="Accéder à sa nation" />
      <Form
        submit={handleSubmit}
        children={
          <>
            <Input
              required={true}
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="Nom de la nation"
              value={name}
            />
            <Input
              required={true}
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={password}
            />
            <div className="flex justify-center text-sm gap-2">
              <span
                className="underline cursor-pointer"
                onClick={() => navigate("/recovery")}
              >
                Mot de passe oublié ?
              </span>
            </div>
            <div className="flex justify-center text-sm gap-2">
              <span>Première visite ?</span>
              <span
                className="underline cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Créer une nation
              </span>
            </div>
            <Button path="" text="SE CONNECTER" type="submit" />
          </>
        }
      />
    </>
  );
}
