import { PlaceTileProp } from "../../../types/typProp";
import {
  confirmBox,
  editPlaceAtom,
  myStore,
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

export default function PlaceTile({ place, owner }: PlaceTileProp) {
  const [selectedNation] = useAtom(selectedNationAtom);
  const navigate = useNavigate();

  const handleDelete = () => {
    myStore.set(confirmBox, {
      action: "deletePlace",
      text: "Confirmez-vous la suppression de la ville ?",
      result: "",
      target: place,
    });
  };

  const handleClick = () => {
    myStore.set(editPlaceAtom, { place, owner });
    navigate(`/place/${place.officialId}`);
  };

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
          <PointTag label={place.points.toString()} />
          <PopulationTag label={place.population.toString()} />
        </div>
      </div>

      {/* {owner && update != -1 && update != undefined && (
        <Button
          text=""
          path=""
          children={
            <div className="w-full flex items-center justify-evenly flex-wrap gap-2 text-sm">
              <span className="flex gap-1 items-center">
                Niveau {place.level + 1} <FaArrowUpRightDots />
              </span>
              <span className="flex gap-1 items-center">
                <FaCoins />
                {placesTypeList[update].cost}
              </span>
            </div>
          }
        />
      )} */}
    </div>
  );
}
