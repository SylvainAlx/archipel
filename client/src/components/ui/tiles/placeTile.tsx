import { placeListAtomV2, sessionAtom } from "../../../settings/store";
import { useAtom } from "jotai";
import { GiCapitol } from "react-icons/gi";
import { useLocation, useNavigate } from "react-router-dom";
import PlaceTag from "../tags/placeTag";
import { useEffect, useState } from "react";
import NationTag from "../tags/nationTag";
import Avatar from "../avatar";
import ReportPanel from "../reportPanel";
import { PLACE_TYPE } from "../../../settings/consts";
import TreeTag from "../tags/treeTag";
import DateTag from "../tags/dateTag";
import { NationModel } from "../../../models/nationModel";
import { PlaceModel } from "../../../models/placeModel";
import PopulationTag from "../tags/populationTag";

export interface PlaceTileProp {
  owner?: boolean;
  place: PlaceModel;
  nation: NationModel;
  update?: number;
}

export default function PlaceTile({ place, nation }: PlaceTileProp) {
  const [placeList] = useAtom(placeListAtomV2);
  const [childrenStats, setChildrenStats] = useState({
    population: 0,
    children: 0,
  });
  const [session] = useAtom(sessionAtom);
  const emplacement = useLocation();
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      navigate(`/place/${place.officialId}`);
    }
  };

  useEffect(() => {
    const stats = {
      population: 0,
      children: 0,
    };
    placeList.getItems().forEach((e) => {
      if (e.parentId === place.officialId) {
        stats.population += e.population;
        stats.children += 1;
      }
    });
    setChildrenStats(stats);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeList, place.officialId]);

  return (
    <div
      onClick={handleClick}
      className={`min-h-[100px] p-2 rounded flex flex-col flex-grow items-center justify-between gap-3 bg-complementary hover:bg-complementary2 cursor-pointer shadow-xl`}
    >
      <div className="self-start text-xl flex items-center gap-2 cursor-default">
        <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center overflow-hidden">
          <Avatar
            url={place.image}
            isUser={false}
            isCity={place.type === PLACE_TYPE.city.id}
          />
        </div>
        <span className="text-lg text-info">
          {place.officialId === nation.data.roleplay.capital && <GiCapitol />}
        </span>
        <h3
          onClick={handleClick}
          className="flex items-center gap-2 text-light text-xl cursor-pointer"
        >
          {place.name}
        </h3>
      </div>
      <div className="flex gap-1 flex-wrap items-center self-end">
        {session.user.citizenship.nationId != place.nation && (
          <ReportPanel content={place} center={false} />
        )}
      </div>
      <div className="max-w-[90%] flex flex-wrap items-center self-end justify-end gap-1">
        <PlaceTag label={place.getPlaceTypeLabel()} />
        {place.type === PLACE_TYPE.city.id && (
          <PopulationTag label={place.population} />
        )}
        {emplacement.pathname === `/explore/4` ? (
          <NationTag label={place.nation} />
        ) : (
          place.type != PLACE_TYPE.city.id && (
            <TreeTag label={childrenStats.children} />
          )
        )}
        {place.createdAt && <DateTag date={place.createdAt} />}
      </div>
    </div>
  );
}
