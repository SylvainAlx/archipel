import {
  confirmBox,
  editPlaceAtom,
  myStore,
  nationPlacesListAtom,
  session,
} from "../../../settings/store";
import { useAtom } from "jotai";
import PointTag from "../../tags/pointTag";
import PopulationTag from "../../tags/populationTag";
import { GiCapitol } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import EyeButton from "../../buttons/eyeButton";
import IdTag from "../../tags/idTag";
import { getPlaceTypeLabel } from "../../../utils/functions";
import PlaceTag from "../../tags/placeTag";
import CrossButton from "../../buttons/crossButton";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import TreeTag from "../../tags/treeTag";
import { Place } from "../../../types/typPlace";

export interface PlaceTileProp {
  owner?: boolean;
  place: Place;
  update?: number;
}

export default function PlaceTile({ place, owner }: PlaceTileProp) {
  const { t } = useTranslation();
  const [nationPlacesList] = useAtom(nationPlacesListAtom);
  const [childrenStats, setChildrenStats] = useState({
    points: 0,
    population: 0,
    children: 0,
  });

  const navigate = useNavigate();

  const handleDelete = () => {
    myStore.set(confirmBox, {
      action: "deletePlace",
      text: t("components.modals.confirmModal.deletePlace"),
      result: "",
      target: place,
    });
  };

  const handleClick = () => {
    myStore.set(editPlaceAtom, { place, owner });
    navigate(`/place/${place.officialId}`);
  };

  useEffect(() => {
    const stats = { ...childrenStats };
    nationPlacesList.forEach((e) => {
      if (e.parentId === place.officialId) {
        stats.points += e.points;
        stats.population += e.population;
        stats.children += 1;
      }
    });
    setChildrenStats(stats);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`p-2 rounded flex flex-col items-center gap-3 bg-complementary shadow-xl min-h-[150px]`}
    >
      <div className="w-full flex flex-col flex-grow items-center gap-2">
        <h3 className="w-full flex justify-between flex-wrap">
          <div className="text-xl flex items-center gap-2">
            <span className="text-lg text-info">
              {place.officialId === session.nation.data.roleplay.capital && (
                <GiCapitol />
              )}
            </span>
            <span>{place.name}</span>
          </div>
          <div className="flex gap-2 flex-wrap self-end justify-end">
            <EyeButton click={handleClick} />
            {owner && <CrossButton click={handleDelete} />}
          </div>
        </h3>
        <p className="w-full flex-grow">{place.description}</p>
        <div className="max-w-[90%] flex flex-wrap items-center self-end justify-end gap-1">
          {place.officialId && <IdTag label={place.officialId} />}
          <PlaceTag label={getPlaceTypeLabel(place.type)} />
          <PointTag label={(childrenStats.points + place.points).toString()} />
          {place.type != 2 && (
            <TreeTag label={childrenStats.children.toString()} />
          )}
          <PopulationTag label={childrenStats.population.toString()} />
        </div>
      </div>
    </div>
  );
}
