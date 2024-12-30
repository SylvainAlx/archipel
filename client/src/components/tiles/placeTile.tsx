import {
  editPlaceAtom,
  myStore,
  nationPlacesListAtom,
  sessionAtom,
} from "../../settings/store";
import { useAtom } from "jotai";
import { GiCapitol } from "react-icons/gi";
import { useLocation, useNavigate } from "react-router-dom";
import { getPlaceTypeLabel } from "../../utils/functions";
import PlaceTag from "../tags/placeTag";
import { useEffect, useState } from "react";
import { Place } from "../../types/typPlace";
import NationTag from "../tags/nationTag";
import Avatar from "../avatar";
import ReportPanel from "../reportPanel";
import { PLACE_TYPE } from "../../settings/consts";
import TreeTag from "../tags/treeTag";
import DateTag from "../tags/dateTag";

export interface PlaceTileProp {
  owner?: boolean;
  place: Place;
  update?: number;
}

export default function PlaceTile({ place, owner }: PlaceTileProp) {
  const [nationPlacesList] = useAtom(nationPlacesListAtom);
  const [childrenStats, setChildrenStats] = useState({
    population: 0,
    children: 0,
  });
  const [session] = useAtom(sessionAtom);
  const emplacement = useLocation();
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      myStore.set(editPlaceAtom, { place, owner });
      navigate(`/place/${place.officialId}`);
    }
    myStore.set(editPlaceAtom, { place, owner });
    navigate(`/place/${place.officialId}`);
  };

  useEffect(() => {
    const stats = { ...childrenStats };
    nationPlacesList.forEach((e) => {
      if (e.parentId === place.officialId) {
        stats.population += e.population;
        stats.children += 1;
      }
    });
    setChildrenStats(stats);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nationPlacesList, place.officialId]);

  return (
    <div
      onClick={handleClick}
      className={`min-h-[100px] p-2 rounded flex flex-col flex-grow items-center justify-between gap-3 bg-complementary hover:bg-complementary2 cursor-pointer shadow-xl`}
    >
      <div className="w-full flex justify-between flex-wrap">
        <div className="text-xl flex items-center gap-2">
          <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center overflow-hidden">
            <Avatar
              url={place.image}
              isUser={false}
              isCity={place.type === PLACE_TYPE.city.id}
            />
          </div>
          <span className="text-lg text-info">
            {place.officialId === session.nation.data.roleplay.capital && (
              <GiCapitol />
            )}
          </span>
          <h3>{place.name}</h3>
        </div>
        <div className="w-full flex gap-1 flex-wrap items-center justify-end">
          {session.user.citizenship.nationId != place.nation && (
            <ReportPanel content={place} center={false} />
          )}
        </div>
      </div>
      <div className="max-w-[90%] flex flex-wrap items-center self-end justify-end gap-1">
        <PlaceTag label={getPlaceTypeLabel(place.type)} />
        {/* <PopulationTag label={getTotalPopulation(place)} /> */}
        {emplacement.pathname != `/nation/${place.nation}` ? (
          <NationTag label={place.nation} />
        ) : (
          <TreeTag label={childrenStats.children} />
        )}
        {place.createdAt && <DateTag date={place.createdAt} />}
      </div>
    </div>
  );
}
