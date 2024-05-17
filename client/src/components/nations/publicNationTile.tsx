import { Nation } from "../../types/typNation";
import { GiBlackFlag } from "react-icons/gi";
import IdTag from "../tags/idTag";
import PointTag from "../tags/pointTag";
import PopulationTag from "../tags/populationTag";
import EyeButton from "../buttons/eyeButton";
import { useNavigate } from "react-router-dom";
import RegimeTag from "../tags/regimeTag";
import PlaceTag from "../tags/placeTag";
import RoleTag from "../tags/roleTag";

export default function PublicNationTile(nation: Nation) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/nation/${nation.officialId}`);
  };
  return (
    <div className="bg-complementary flex flex-col items-center p-2 gap-4 rounded transition-all">
      <div className="w-full flex justify-between">
        <div className="w-full flex items-center">
          <div className="w-[50px] h-[50px] bg-complementary rounded-full flex items-center justify-center overflow-hidden">
            {nation.data.url.flag != "" ? (
              <img
                src={nation.data.url.flag}
                alt={`flag of ${nation.name}`}
                className="w-full h-full"
              />
            ) : (
              <div className="text-[3.1rem]">
                <GiBlackFlag />
              </div>
            )}
          </div>
          <h2 className="text-light text-xl pl-4 pr-6">{nation.name}</h2>
        </div>
        <EyeButton click={handleClick} />
      </div>
      <div className="max-w-[80%] flex gap-1 self-end flex-wrap justify-end">
        <IdTag label={nation.officialId} />
        {nation.role === "admin" && <RoleTag label="admin" />}
        <RegimeTag selectedNation={nation} />
        <PointTag label={nation.data.roleplay.points} />
        <PlaceTag label={nation.data.roleplay.places} />
        <PopulationTag label={nation.data.roleplay.citizens} />
      </div>
    </div>
  );
}
