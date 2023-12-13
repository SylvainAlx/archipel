import { useNavigate } from "react-router-dom";
import NavBar from "../components/navbar";
import { SUBTITLE, TITLE } from "../utils/consts";
import { useState } from "react";

export default function Header() {
  const [showNav, setShowNav] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <header className="animate-in fade-in duration-1000 p-2 flex flex-col sm:flex-row justify-around flex-wrap items-center gap-6">
      <div className="flex gap-4 h-50">
        <img
          onClick={handleClick}
          src="/logo.png"
          className="cursor-pointer h-[50px]"
        ></img>
        <div>
          <h2 className="bold text-3xl">{TITLE}</h2>
          <h4 className="text-xs">{SUBTITLE}</h4>
        </div>
      </div>
      <div className="sm:hidden" onClick={()=>setShowNav(!showNav)}>[BURGER MENU]</div>
      <NavBar isOk={showNav} />
    </header>
  );
}
