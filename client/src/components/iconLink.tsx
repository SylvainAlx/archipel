import { useNavigate } from "react-router-dom";
import { IoMdLogIn, IoMdAddCircleOutline, IoIosPie, IoMdSettings, IoMdLogOut } from "react-icons/io";
import { confirmBox } from "../utils/store";
import { useAtom } from "jotai";
import { ButtonProps } from "../types/typProp";

export default function IconLink({ path, text }: ButtonProps){

    const [, setConfirm] = useAtom(confirmBox);
    const navigate = useNavigate();

    const handleClick = () => {
          setConfirm({
            action:"logout", 
            text: "Souhaitez-vous vous déconnecter ?", 
            result: "" 
          });
    }
  
    return (
        <>
        {path === "login" && (
            <div className="flex flex-col gap-2 items-center text-5xl" onClick={() => navigate("/login")}>
                <IoMdLogIn />
                <h2 className="text-[10px]">{text}</h2>
            </div>
        )}
        {path === "register" && (
            <div className="flex flex-col gap-2 items-center text-5xl" onClick={() => navigate("/register")}>
                <IoMdAddCircleOutline   />
                <h2 className="text-[10px]">{text}</h2>
            </div>
        )}
        {path === "dashboard" && (
            <div className="flex flex-col gap-2 items-center text-5xl" onClick={() => navigate("/dashboard")}>
                <IoIosPie />
                <h2 className="text-[10px]">{text}</h2>
            </div>
        )}
        {path === "admin" && (
            <div className="flex flex-col gap-2 items-center text-5xl" onClick={() => navigate("/admin")}>
                <IoMdSettings />
                <h2 className="text-[10px]">{text}</h2>
            </div>
        )}
        {path === "logout" && (
            <div className="flex flex-col gap-2 items-center text-5xl" onClick={handleClick}>
                <IoMdLogOut />
                <h2 className="text-[10px]">{text}</h2>
            </div>
        )}
        </>
        
    )
}