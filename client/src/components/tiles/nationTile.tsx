import PopulationTag from "../tags/populationTag";
import { useNavigate } from "react-router-dom";
import RegimeTag from "../tags/regimeTag";
import PlaceTag from "../tags/placeTag";
import Flag from "../flag";
import TagList from "../nation/tagList";
import ReportPanel from "../reportPanel";
import { sessionAtom } from "../../settings/store";
import { useAtom } from "jotai";
import DateTag from "../tags/dateTag";
import { NationModel } from "../../models/nationModel";
import TreasuryTag from "../tags/treasuryTag";
import VerifiedTag from "../tags/verifiedTag";

interface NationTileProps {
  nation: NationModel;
}

export default function NationTile({ nation }: NationTileProps) {
  const navigate = useNavigate();
  const [session] = useAtom(sessionAtom);

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
          className="flex items-center gap-2 text-light text-xl pl-4 pr-6 cursor-pointer"
        >
          {nation.name}
          {nation.data.roleplay.officialOwner === nation.owner && (
            <VerifiedTag />
          )}
        </h3>
      </div>
      <div className="flex gap-1 flex-wrap items-center self-end">
        {session.user.citizenship.nationId != nation.officialId && (
          <ReportPanel content={nation} center={false} />
        )}
      </div>
      <div className="max-w-[80%] flex gap-1 self-end flex-wrap justify-end">
        <TreasuryTag label={nation.data.roleplay.treasury} />
        <RegimeTag selectedNation={nation} />
        <PopulationTag label={nation.data.roleplay.citizens} />
        <PlaceTag label={nation.data.roleplay.places} />
        <DateTag date={nation.createdAt} />
        <div className="self-end">
          <TagList nation={nation} isTile={true} />
        </div>
      </div>
    </div>
  );
}
