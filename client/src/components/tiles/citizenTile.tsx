import { useNavigate } from "react-router-dom";
import { User } from "../../types/typUser";
import EyeButton from "../buttons/eyeButton";
import IdTag from "../tags/idTag";
import RoleTag from "../tags/roleTag";
import Avatar from "../avatar";
import CitizenTag from "../tags/citizenTag";
import {
  citizenFetchAtom,
  myStore,
  nationFetchedAtom,
} from "../../settings/store";
import { EmptyNation } from "../../types/typNation";

export interface CitizenTileProps {
  citizen: User;
}

export default function CitizenTile({ citizen }: CitizenTileProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    myStore.set(citizenFetchAtom, citizen);
    myStore.set(nationFetchedAtom, EmptyNation);
    navigate(`/citizen/${citizen.officialId}`);
  };

  return (
    <div
      className={`p-2 rounded flex flex-col items-center gap-3 bg-complementary shadow-xl`}
    >
      <div className="w-full flex justify-between">
        <div className="w-full flex items-center">
          <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center overflow-hidden">
            <Avatar url={citizen.avatar} />
          </div>
          <h3 className="text-light text-xl pl-4 pr-6">{citizen.name}</h3>
        </div>
        <EyeButton click={handleClick} />
      </div>

      <div className="max-w-[90%] flex flex-wrap items-center self-end justify-end gap-1">
        {citizen.citizenship.status === 0 && (
          <CitizenTag label="Citoyenneté en attente" citizen={citizen} />
        )}
        {citizen.officialId && <IdTag label={citizen.officialId} />}
        {citizen.role === "admin" && <RoleTag label="admin" />}
      </div>
    </div>
  );
}
