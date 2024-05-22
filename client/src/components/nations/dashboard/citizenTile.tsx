import { useNavigate } from "react-router-dom";
import { User } from "../../../types/typUser";
import EyeButton from "../../buttons/eyeButton";
import IdTag from "../../tags/idTag";

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
      className={`p-2 rounded flex flex-col items-center gap-3 bg-complementary shadow-xl min-h-[150px]`}
    >
      <div className="w-full flex flex-col flex-grow items-center gap-2">
        <h3 className="w-full flex justify-between flex-wrap">
          <div className="text-xl flex items-center gap-2">
            <span>{citizen.name}</span>
          </div>
          <div className="flex gap-2 flex-wrap self-end justify-end">
            <EyeButton click={handleClick} />
          </div>
        </h3>
        <div className="max-w-[90%] flex flex-wrap items-center self-end justify-end gap-1">
          {citizen.officialId && <IdTag label={citizen.officialId} />}
        </div>
      </div>
    </div>
  );
}
