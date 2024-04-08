import { PlaceTileProp } from "../../../types/typProp";
import {
  confirmBox,
  editPlaceAtom,
  myStore,
  nationPlacesListAtom,
  selectedNationAtom,
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
import Tag from "../../tags/tag";
import { ImTree } from "react-icons/im";

export default function PlaceTile({ place, owner }: PlaceTileProp) {
  const [selectedNation] = useAtom(selectedNationAtom);
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
      text: "Confirmez-vous la suppression du lieu ?",
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
  }, []);

  return (
    <div
      className={`p-2 rounded flex flex-col items-center gap-3 bg-complementary2 shadow-xl`}
    >
      <div className="w-full flex flex-col items-center gap-2">
        <h3 className="w-full flex justify-between">
          <div className="text-xl flex items-center gap-2">
            <span className="text-lg text-info">
              {place.officialId === selectedNation.data.roleplay.capital && (
                <GiCapitol />
              )}
            </span>
            <span>{place.name}</span>
          </div>
          <div className="flex gap-2 flex-wrap self-end justify-end">
            <EyeButton text="voir" click={handleClick} />
            {owner && <CrossButton text="supprimer" click={handleDelete} />}
          </div>
        </h3>
        <p className="w-full">{place.description}</p>
        <div className="max-w-[90%] flex flex-wrap items-center self-end justify-end gap-1">
          {place.officialId && <IdTag label={place.officialId} />}
          <PlaceTag label={getPlaceTypeLabel(place.type)} />
          <PointTag label={(childrenStats.points + place.points).toString()} />
          {place.type != 2 && (
            <Tag
              text={childrenStats.children.toString()}
              bgColor="bg-info"
              children={<ImTree />}
            />
          )}
          <PopulationTag label={childrenStats.population.toString()} />
        </div>
      </div>
    </div>
  );
}
