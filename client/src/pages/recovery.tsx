import { ChangeEvent, FormEvent, useState } from "react";
import H1 from "../components/titles/h1";
import LoadingText from "../components/loadingText";
import { RecoveryFetch } from "../utils/fetch";
import { useNavigate } from "react-router-dom";

export default function Recovery(){
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [recovery, setRecovery] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()
    
    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.type == "text") {
          setName(e.target.value);
        } else if (e.target.type == "password") {
            setPassword(e.target.value);
        } else {
            setRecovery(e.target.value);
        }
      };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const dataToSend = {
            name,
            recovery,
            newPassword: password
        }
        RecoveryFetch(dataToSend)
        .then((data) => {
            setLoading(false)
            alert(data.message)
            if(data.message ==="nouveau mot de passe pris en compte"){
                navigate("/login")
            }  
        })
        .catch((error) => alert(error.message));
    };

    return (
        <>
            <H1 text="Réinitialisation du mot de passe"/>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 min-w-[300px] items-center">
                <input
                    required
                    onChange={handleChange}
                    type="text"
                    className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm"
                    placeholder="Nom de la nation"
                    value={name}
                />
                <textarea 
                    required
                    onChange={handleChange}
                    className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm"
                    placeholder="Phrase de récupération"
                    value={recovery}/>
                <input
                    required
                    onChange={handleChange}
                    type="password"
                    className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm"
                    placeholder="Nouveau mot de passe"
                    value={password}
                />
                <input
                    required
                    onChange={(e)=> {
                        setConfirmPassword(e.target.value);
                        setPasswordsMatch(password === e.target.value)
                    }}
                    type="password"
                    className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm"
                    placeholder="Confirmer le mot de passe"
                    value={confirmPassword}
                />
                {loading ? (<LoadingText label="CONNEXION AU SERVEUR" />):(
                <button
                    disabled={!passwordsMatch}
                    type="submit"
                    className={`inline-block rounded-lg px-3 py-2 text-xs font-medium ${!passwordsMatch && 'cursor-not-allowed'}`}
                >
                    CHANGER DE MOT DE PASSE
                </button> 
                )}      
            </form>
        </>
        
    )
}