import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginFetch } from "../utils/fetch";
import LoadingText from "../components/loadingText";
import { useAtom } from "jotai";
import { infoModal, nationAtom } from "../utils/store";
import H1 from "../components/titles/h1";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setInfo] = useAtom(infoModal);
  const [, setNation] = useAtom(nationAtom);
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
    setLoading(true);
    loginFetch({ name, password })
      .then((data) => {
        setLoading(false);
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
        <input
          required
          onChange={handleChange}
          type="text"
          className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm"
          placeholder="Nom de la nation"
          value={name}
        />
        <input
          required
          onChange={handleChange}
          type="password"
          className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm"
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
        {loading ? (
          <LoadingText label="CONNEXION AU SERVEUR" />
        ) : (
          <button type="submit" className="button">
            SE CONNECTER
          </button>
        )}
      </form>
    </>
  );
}
