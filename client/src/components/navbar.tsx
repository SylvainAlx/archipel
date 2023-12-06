import Button from "./button";

export default function NavBar(){
    return (
        <nav className="flex justify-center items-center gap-2">
            <Button path="login" text="SE CONNECTER" /> 
            <Button path="register" text="CRÉER UNE NATION" /> 
        </nav>
    )
}