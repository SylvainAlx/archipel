import { useNavigate } from "react-router-dom";
import { User } from "../../types/typUser";
import EyeButton from "../buttons/eyeButton";
import IdTag from "../tags/idTag";
import RoleTag from "../tags/roleTag";
import Avatar from "../avatar";

export interface CitizenTileProps {
  citizen: User;
}

export default function CitizenTile({ citizen }: CitizenTileProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/citizen/${citizen.officialId}`);
  };

  return (
    <div
      className={`p-2 rounded flex flex-col items-center gap-3 bg-complementary shadow-xl`}
    >
      <div className="w-full flex justify-between">
        <div className="w-full flex items-center">
          <div className="w-[50px] h-[50px] bg-complementary rounded-full flex items-center justify-center overflow-hidden">
            <Avatar url={citizen.avatar} />
          </div>
          <h3 className="text-light text-xl pl-4 pr-6">{citizen.name}</h3>
        </div>
        <EyeButton click={handleClick} />
      </div>

      <div className="max-w-[90%] flex flex-wrap items-center self-end justify-end gap-1">
        {citizen.officialId && <IdTag label={citizen.officialId} />}
        {citizen.role === "admin" && <RoleTag label="admin" />}
      </div>
    </div>
  );
}
