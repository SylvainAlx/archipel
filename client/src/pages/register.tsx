import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import H1 from "../components/titles/h1";
import Input from "../components/form/input";
import Button from "../components/button";
import Form from "../components/form/form";
import { register } from "../api/authentification/authAPI";

export default function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [acceptCGU, setAcceptCGU] = useState(false);

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
    register({ name, password });
  };
  return (
    <>
      <H1 text="Nouvelle nation" />
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
              <span>Déjà une nation ?</span>
              <span
                className="underline cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Se connecter
              </span>
            </div>
            <div className="flex justify-start items-center gap-2">
              <input
                type="checkbox"
                className="cursor-pointer"
                onClick={() => setAcceptCGU(!acceptCGU)}
              ></input>
              <p className="text-sm">
                En cochant cette case vous acceptez les{" "}
                <Link to="/termsofservice">
                  <b>CGU</b>
                </Link>
              </p>
            </div>

            <Button
              path=""
              text="CRÉER SA NATION"
              type="submit"
              disabled={!acceptCGU}
            />
          </>
        }
      />
    </>
  );
}
