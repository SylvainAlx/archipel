import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerFetch } from "../utils/fetch";
import LoadingText from "../components/loadingText";
import { useAtom } from 'jotai';
import { nationAtom } from "../utils/store";
import H1 from "../components/titles/h1";

export default function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
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
    registerFetch({ name, password })
      .then((data) => {
        setLoading(false)
        if (data.nation) {
          localStorage.setItem("jwt", data.jwt);
          setNation({
            name: data.nation.name,
            data: data.nation.data
          });
          alert("Merci de conserver précieusement votre phrase de récupération. ELLE NE VOUS SERA PLUS COMMUNIQUÉE PAR LA SUITE ! ");
          alert(data.recovery);
          navigate("/");
        } else {
          console.log(data);
        }
      })
      .catch((error) => alert(error.message));
  };
  return (
    <>
      <H1 text="Nouvelle nation" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 min-w-[300px] items-center">
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
            <span>Déjà une nation ?</span>
            <span className="underline cursor-pointer" onClick={()=>navigate("/login")}>Se connecter</span>
          </div>
          {loading ? (<LoadingText label="CONNEXION AU SERVEUR" />):(
          <button
            type="submit"
            className="inline-block rounded-lg px-3 py-2 text-xs font-medium"
          >
            CRÉER SA NATION
          </button> 
          )}      
      </form>
    </>
  );
}
