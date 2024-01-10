import { useNavigate } from "react-router-dom";

export default function Logo(){
    const navigate = useNavigate();
    const handleClick = () => {
      navigate("/");
    };
    return (
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
    )
}