import { useNavigate } from "react-router-dom";
import NavBar from "../components/navbar";
import { SUBTITLE, TITLE } from "../utils/consts";

export default function Header() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <header className="p-2 flex justify-around flex-wrap items-center gap-6">
      <div onClick={handleClick} className="flex gap-4 h-50">
        <img src="/logo.png" className="h-[50px]"></img>
        <div>
          <h2 className="bold text-3xl cursor-pointer">{TITLE}</h2>
          <h4 className="text-xs">{SUBTITLE}</h4>
        </div>
      </div>
      <NavBar />
    </header>
  );
}
