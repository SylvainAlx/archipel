import { useNavigate } from "react-router-dom";

export default function Logo() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div onClick={handleClick} className="animate-fadeIn h-[50px] w-[50px]">
      <img
        src="/logoV2.webp"
        className="cursor-pointer h-full hover:animate-pulse"
      ></img>
    </div>
  );
}
