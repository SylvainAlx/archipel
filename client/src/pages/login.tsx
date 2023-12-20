import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginFetch } from "../utils/fetch";
import { useAtom } from "jotai";
import { infoModal, loadingSpinner, nationAtom } from "../utils/store";
import H1 from "../components/titles/h1";
import Input from "../components/form/input";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [, setInfo] = useAtom(infoModal);
  const [, setNation] = useAtom(nationAtom);
  const [, setLoading] = useAtom(loadingSpinner);
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
    setLoading({show: true, text:"Connexion au serveur"})
    loginFetch({ name, password })
      .then((data) => {
        setLoading({show: false, text:"Connexion au serveur"});
        if (data.nation) {
          localStorage.setItem("jwt", data.jwt);
          setNation({
            name: data.nation.name,
            role: data.nation.role,
            data: data.nation.data,
          });
          navigate("/dashboard");
        } else {
          setInfo(data.message);
        }
      })
      .catch((error) => setInfo(error.message));
  };

  return (
    <>
      <H1 text="Accéder à sa nation" />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 min-w-[300px] items-center"
      >
        <Input required={true} onChange={handleChange} type="text" placeholder="Nom de la nation" value={name} />
        <Input required={true} onChange={handleChange} type="password" placeholder="Mot de passe" value={password} />
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
        <button type="submit" className="button">
          SE CONNECTER
        </button>
      </form>
    </>
  );
}
