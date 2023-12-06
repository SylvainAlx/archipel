import { useNavigate } from "react-router-dom";
import NavBar from "../components/navbar";

export default function Header() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/")
  }
  return (
    <header className="p-2 flex justify-around items-center gap-6">
      <div onClick={handleClick} className="bold text-3xl cursor-pointer">Archipel</div>
      <NavBar/>
    </header>
  );
}
