import { useAtom } from "jotai";
import Button from "./button";
import { nationAtom } from "../utils/store";
import { BooleanProps } from "../utils/types";

export default function NavBar({isOk}: BooleanProps){
    const [nation, ] = useAtom(nationAtom)

        return (
            <nav className={`${!isOk && "hidden"} animate-in slide-in-from-top flex flex-col sm:flex-row justify-center flex-wrap items-center gap-2`}>
            {nation.name === "" || nation.name === undefined ? (
            <>
                <Button path="login" text="SE CONNECTER" /> 
                <Button path="register" text="S'ENREGISTRER" />
            </>
            ):(  
            <>
                <Button path="dashboard" text={nation.name} />
                {nation.role === "admin" && (
                  <Button path="admin" text="ADMINISTRATION" />  
                )}
                <Button path="logout" text="SE DÉCONNECTER" />
            </>    
            )} 
        </nav>
    )

    
    
}
    