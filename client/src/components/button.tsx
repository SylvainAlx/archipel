import { useNavigate } from "react-router-dom"
import { ButtonProps } from "../utils/types";

export default function Button({ path, text }: ButtonProps) {
    const navigate = useNavigate();
  
    const handleClick = () => {
      if(path === "logout"){
        if (window.confirm(`Souhaitez-vous vous déconnecter ?`)) {
          localStorage.removeItem("jwt");
          window.location.reload();
        }
      } else {
        navigate(path);
      }
    };
  
    return (
      <button className="inline-block rounded-lg px-3 py-2 text-xs font-medium dark:bg-white dark:text-black" onClick={handleClick}>{text}</button>
    );
  }