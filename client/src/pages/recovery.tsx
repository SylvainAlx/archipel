import { ChangeEvent, FormEvent, useState } from "react";
import H1 from "../components/titles/h1";
import { RecoveryFetch } from "../utils/fetch";
import { useNavigate } from "react-router-dom";
import { infoModal, loadingSpinner } from "../utils/store";
import { useAtom } from "jotai";
import Input from "../components/form/input";

export default function Recovery(){
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [recovery, setRecovery] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [, setLoading] = useAtom(loadingSpinner);
    const [, setInfo] = useAtom(infoModal);

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
        setLoading({show: true, text:"Connexion au serveur"})
        const dataToSend = {
            name,
            recovery,
            newPassword: password
        }
        RecoveryFetch(dataToSend)
        .then((data) => {
            setLoading({show: false, text:"Connexion au serveur"})
            setInfo(data.message)
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
                <Input required={true} onChange={handleChange} type="text" placeholder="Nom de la nation" value={name} />
                <textarea 
                    required
                    onChange={handleChange}
                    className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm text-primary"
                    placeholder="Phrase de récupération"
                    value={recovery}/>
                <Input required={true} onChange={handleChange} type="password" placeholder="Nouveau mot de passe" value={password} />
                <Input required={true} onChange={(e)=> {
                        setConfirmPassword(e.target.value);
                        setPasswordsMatch(password === e.target.value)
                    }} type="password" placeholder="Confirmer le mot de passe" value={confirmPassword} />
                <button
                    disabled={!passwordsMatch}
                    type="submit"
                    className={`button ${!passwordsMatch && 'cursor-not-allowed'}`}
                >
                    CHANGER DE MOT DE PASSE
                </button>   
            </form>
        </>
        
    )
}