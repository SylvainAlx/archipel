import PopulationTag from "../tags/populationTag";
import { useNavigate } from "react-router-dom";
import RegimeTag from "../tags/regimeTag";
import PlaceTag from "../tags/placeTag";
import Flag from "../flag";
import TagList from "../../nation/tagList";
import DateTag from "../tags/dateTag";
import { NationModel } from "../../../models/nationModel";
import TreasuryTag from "../tags/treasuryTag";
import VerifiedTag from "../tags/verifiedTag";
import NationPointsTag from "../tags/nationPointsTag";

interface NationTileProps {
  nation: NationModel;
}

export default function NationTile({ nation }: NationTileProps) {
  const navigate = useNavigate();

  // eslint-disable-next-line no-undef
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      navigate(`/nation/${nation.officialId}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-complementary hover:bg-complementary2 flex flex-col items-center p-2 gap-3 rounded transition-all cursor-pointer"
    >
      <div className="self-start flex items-center cursor-default">
        <Flag nation={nation} />
        <h3
          onClick={handleClick}
          className="flex items-center gap-1 text-light text-xl pl-4 pr-6 cursor-pointer"
        >
          {nation.name}
          {nation.data.roleplay.officialOwner === nation.owner && (
            <VerifiedTag />
          )}
        </h3>
      </div>
      <div className="max-w-[90%] flex gap-1 self-end flex-wrap justify-end">
        <NationPointsTag label={nation.getNationPoints()} />
        <TreasuryTag label={nation.data.roleplay.treasury} />
        <RegimeTag selectedNation={nation} />
        <PopulationTag label={nation.data.roleplay.citizens} />
        <PlaceTag label={nation.data.roleplay.places} />
        <DateTag date={nation.createdAt} />
        <TagList nation={nation} isTile={true} />
      </div>
    </div>
  );
}
