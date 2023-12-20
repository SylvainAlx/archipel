import { useNavigate } from "react-router-dom";
import NavBar from "../components/navbar";

export default function Header() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <header className="animate-in fade-in duration-1000 py-2 px-4 mx-auto sm:m-0 sm:flex sm:justify-between flex-wrap items-center gap-6">
      <div onClick={handleClick} className="flex gap-2 h-[50px] xl:h-[80px] w-full sm:w-min items-center">
        <img
          src="/logo.png"
          className="cursor-pointer h-full"
        ></img>
        <h4 className="text-md lg:text-xl xl:text-2xl"><b>NA</b>TIONS<br /><b>VIR</b>TUELLES</h4>
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
