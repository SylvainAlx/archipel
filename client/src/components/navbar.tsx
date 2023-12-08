import { useAtom } from "jotai";
import Button from "./button";
import { nationAtom } from "../utils/store";

export default function NavBar(){
    const [nation, ] = useAtom(nationAtom)
    return (
        <nav className="flex justify-center flex-wrap items-center gap-2">
            {nation.name === "" ? (
            <>
                <Button path="login" text="SE CONNECTER" /> 
                <Button path="register" text="S'ENREGISTRER" />
            </>
            ):(  
            <>
                <Button path="dashboard" text={nation.name} />
                <Button path="logout" text="SE DÉCONNECTER" />
            </>    
            )} 
        </nav>
    )
}