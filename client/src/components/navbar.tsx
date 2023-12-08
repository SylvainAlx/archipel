import { useAtom } from "jotai";
import Button from "./button";
import { nationAtom } from "../utils/store";

export default function NavBar(){
    const [nation, setNation] = useAtom(nationAtom)
    return (
        <nav className="flex justify-center items-center gap-2">
            {nation.name === "" ? (
            <>
                <Button path="login" text="SE CONNECTER" /> 
                <Button path="register" text="CRÉER UNE NATION" />
            </>
            ):(    
                <Button path="logout" text="SE DÉCONNECTER" />
            )} 
        </nav>
    )
}