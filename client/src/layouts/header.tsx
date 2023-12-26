import { useNavigate } from "react-router-dom";
import HeaderNav from "../components/headerNav";

export default function Header() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <header className="animate-in fade-in duration-1000 py-4 px-4 mx-auto md:m-0 sm:flex md:justify-between flex-wrap items-center gap-6">
      <div
        onClick={handleClick}
        className="flex gap-2 h-[50px] w-full md:w-min items-center"
      >
        <img src="/logo.png" className="cursor-pointer h-full"></img>
        <h4 className="text-md lg:text-xl xl:text-2xl">
          <b>NA</b>TIONS
          <br />
          <b>VIR</b>TUELLES
        </h4>
      </div>
      <HeaderNav />
    </header>
  );
}
