import { Nation } from "../../types/typNation";
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

export default function NationTile(nation: Nation) {
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
      <div className="w-full flex justify-between">
        <div className="flex items-center">
          <Flag nation={nation} />
          <h3 className="text-light text-xl pl-4 pr-6">{nation.name}</h3>
        </div>
      </div>
      <div className="flex gap-1 flex-wrap items-center self-end">
        {session.user.citizenship.nationId != nation.officialId && (
          <ReportPanel content={nation} center={false} />
        )}
      </div>
      <div className="max-w-[80%] flex gap-1 self-end flex-wrap justify-end">
        {/* <TreasuryTag label={nation.data.roleplay.treasury} /> */}
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
