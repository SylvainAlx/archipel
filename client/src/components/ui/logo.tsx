import { useNavigate } from "react-router-dom";

export default function Logo() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <button
      name="logo"
      onClick={handleClick}
      className="animate-fadeIn h-[50px] w-[50px]"
    >
      <img
        src="/logo.webp"
        className="cursor-pointer h-full hover:animate-pulse"
        alt="Archipel logo"
      ></img>
    </button>
  );
}
