import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerFetch } from "../utils/fetch";
import { useAtom } from "jotai";
import {
  infoModal,
  loadingSpinner,
  nationAtom,
  recoveryKey,
} from "../settings/store";
import H1 from "../components/titles/h1";
import Input from "../components/form/input";
import Button from "../components/button";

export default function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [, setLoading] = useAtom(loadingSpinner);
  const [, setNation] = useAtom(nationAtom);
  const [, setRecovery] = useAtom(recoveryKey);
  const [, setInfo] = useAtom(infoModal);

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
    setLoading({ show: true, text: "Connexion au serveur" });
    registerFetch({ name, password })
      .then((data) => {
        setLoading({ show: false, text: "Connexion au serveur" });
        if (data.nation) {
          localStorage.setItem("jwt", data.jwt);
          setNation({
            _id: data.nation._id,
            name: data.nation.name,
            role: data.nation.role,
            data: data.nation.data,
            createdAt: data.nation.createdAt,
          });
          setRecovery(data.recovery);
          navigate("/");
        } else {
          setInfo("création impossible : " + data.message);
        }
      })
      .catch((error) => setInfo(error.message));
  };
  return (
    <>
      <H1 text="Nouvelle nation" />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 min-w-[300px] items-center"
      >
        <Input
          required={true}
          onChange={handleChange}
          type="text"
          placeholder="Nom de la nation"
          value={name}
        />
        <Input
          required={true}
          onChange={handleChange}
          type="password"
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
        <Button path="" text="CRÉER SA NATION" type="submit" />
      </form>
    </>
  );
}
