import {
  editPlaceAtom,
  myStore,
  nationPlacesListAtom,
  session,
} from "../../settings/store";
import { useAtom } from "jotai";
// import PopulationTag from "../tags/populationTag";
import { GiCapitol } from "react-icons/gi";
import { useLocation, useNavigate } from "react-router-dom";
import EyeButton from "../buttons/eyeButton";
import { getPlaceTypeLabel } from "../../utils/functions";
import PlaceTag from "../tags/placeTag";
import { useEffect, useState } from "react";
import TreeTag from "../tags/treeTag";
import { Place } from "../../types/typPlace";
import NationTag from "../tags/nationTag";
import Avatar from "../avatar";

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
  const emplacement = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
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
  }, []);

  return (
    <div
      className={`min-h-[100px] p-2 rounded flex flex-col flex-grow items-center justify-between gap-3 bg-complementary shadow-xl`}
    >
      <h3 className="w-full flex justify-between flex-wrap">
        <div className="text-xl flex items-center gap-2">
          <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center overflow-hidden">
            <Avatar url={place.image} isUser={false} />
          </div>
          <span className="text-lg text-info">
            {place.officialId === session.nation.data.roleplay.capital && (
              <GiCapitol />
            )}
          </span>
          <span>{place.name}</span>
        </div>
        <EyeButton click={handleClick} />
      </h3>
      <div className="max-w-[90%] flex flex-wrap items-center self-end justify-end gap-1">
        <PlaceTag label={getPlaceTypeLabel(place.type)} />
        {place.type != 2 && (
          <TreeTag label={childrenStats.children.toString()} />
        )}
        {/* <PopulationTag label={childrenStats.population.toString()} /> */}
        {emplacement.pathname != `/nation/${place.nation}` && (
          <NationTag label={place.nation} />
        )}
      </div>
    </div>
  );
}
