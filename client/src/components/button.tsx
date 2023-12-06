import { useNavigate } from "react-router-dom"
import { ButtonProps } from "../utils/types";

export default function Button({ path, text }: ButtonProps) {
    const navigate = useNavigate();
  
    const handleClick = () => {
      navigate(path);
    };
  
    return (
      <button className="inline-block rounded-lg px-3 py-2 text-xs font-medium dark:bg-white dark:text-black" onClick={handleClick}>{text}</button>
    );
  }