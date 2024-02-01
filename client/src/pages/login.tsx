import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginFetch } from "../utils/fetch";
import { useAtom } from "jotai";
import {
  infoModal,
  loadingSpinner,
  nationAtom,
  nationsListAtom,
} from "../settings/store";
import H1 from "../components/titles/h1";
import Input from "../components/form/input";
import Button from "../components/button";
import { EmptyNation } from "../types/typNation";
import Form from "../components/form/form";
import { SERVEUR_LOADING_STRING } from "../settings/consts";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [, setInfo] = useAtom(infoModal);
  const [, setNation] = useAtom(nationAtom);
  const [, setLoading] = useAtom(loadingSpinner);
  const [, setNationsList] = useAtom(nationsListAtom);
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
    setLoading({ show: true, text: SERVEUR_LOADING_STRING });
    loginFetch({ name, password })
      .then((data) => {
        setLoading({ show: false, text: SERVEUR_LOADING_STRING });
        if (data.nation) {
          localStorage.setItem("jwt", data.jwt);
          setNationsList([EmptyNation]);
          setNation({
            _id: data.nation._id,
            name: data.nation.name,
            role: data.nation.role,
            data: data.nation.data,
            createdAt: data.nation.createdAt,
          });
          navigate("/dashboard");
        } else {
          setLoading({ show: false, text: SERVEUR_LOADING_STRING });
          setInfo(data.message);
        }
      })
      .catch((error) => {
        setLoading({ show: false, text: SERVEUR_LOADING_STRING });
        setInfo(error.message);
      });
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
