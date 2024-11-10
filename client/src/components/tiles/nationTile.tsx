import { Nation } from "../../types/typNation";
import PopulationTag from "../tags/populationTag";
import EyeButton from "../buttons/eyeButton";
import { useNavigate } from "react-router-dom";
import RegimeTag from "../tags/regimeTag";
import PlaceTag from "../tags/placeTag";
import Flag from "../flag";
import TagList from "../nation/tagList";
import TreasuryTag from "../tags/treasuryTag";

export default function NationTile(nation: Nation) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/nation/${nation.officialId}`);
  };

  return (
    <div className="bg-complementary flex flex-col items-center p-2 gap-3 rounded transition-all">
      <div className="w-full flex justify-between">
        <div className="flex items-center">
          <Flag nation={nation} />
          <h3 className="text-light text-xl pl-4 pr-6">{nation.name}</h3>
        </div>
        <EyeButton click={handleClick} />
      </div>
      <div className="max-w-[80%] flex gap-1 self-end flex-wrap justify-end">
        <TreasuryTag label={nation.data.roleplay.treasury} />
        <RegimeTag selectedNation={nation} />
        <PopulationTag label={nation.data.roleplay.citizens} />
        <PlaceTag label={nation.data.roleplay.places} />
        <div className="self-end">
          <TagList nation={nation} isTile={true} />
        </div>
      </div>
    </div>
  );
}
