import { useNavigate } from "react-router-dom";
import NavBar from "../components/navbar";
import { SUBTITLE, TITLE } from "../utils/consts";

export default function Header() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <header className="animate-in fade-in duration-1000 p-2 mx-auto sm:m-0 sm:flex sm:justify-around flex-wrap items-center gap-6">
      <div onClick={handleClick} className="flex gap-2 h-50 w-full sm:w-min items-center">
        <img
          src="/logo.png"
          className="cursor-pointer h-[50px]"
        ></img>
        <h4 className="text-md"><b>NA</b>TIONS<br /><b>VIR</b>TUELLES</h4>
      </div>
        {/* <div
          className={`${
            showNav && "rotate-[90deg]"
          } sm:hidden text-5xl transition-all duration-100`}
          onClick={() => setShowNav(!showNav)}
        >
          <IoMenu />
        </div> */}
      <NavBar />
    </header>
  );
}
