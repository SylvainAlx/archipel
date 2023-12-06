import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginFetch } from "../utils/fetch";
import LoadingText from "../components/loadingText";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
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
        setLoading(false)
        if (data.nation) {
          //mettre à jour le state global
          localStorage.setItem("jwt", data.jwt);
          console.log(data.nation);

          navigate("/");
        } else {
          alert(data.message)
          console.log(data.message);
        }
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <>
      <h3 className="text-2xl">Se connecter à sa nation</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 min-w-[300px] items-center">
          <input
            onChange={handleChange}
            type="text"
            className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm"
            placeholder="Nom de la nation"
            value={name}
          />
          <input
            onChange={handleChange}
            type="password"
            className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm"
            placeholder="Mot de passe"
            value={password}
          />
          <div className="flex justify-center text-sm gap-2">
            <span>Pas de compte ?</span>
            <a className="underline" href="/register">Créer une nation</a>
          </div> 
          {loading ? (<LoadingText label="CONNEXION AU SERVEUR" />):(
            <button
              type="submit"
              className="inline-block rounded-lg px-3 py-2 text-xs font-medium"
            >
              SE CONNECTER
            </button> 
          )}     
      </form>
    </>
  );
}
