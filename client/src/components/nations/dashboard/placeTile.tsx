import { IoMdCloseCircle } from "react-icons/io";
import { PlaceTileProp } from "../../../types/typProp";
import Tag from "../../tag";
import { FaArrowUpRightDots } from "react-icons/fa6";
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

export default function PlaceTile({ place, update, owner }: PlaceTileProp) {
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
    myStore.set(editPlaceAtom, { place, update, owner });
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
          <div className="flex gap-2 pr-6">
            {owner && (
              <Tag
                text=""
                bgColor="bg-danger"
                click={handleDelete}
                children={
                  <div className="text-xl hover:animate-ping">
                    <IoMdCloseCircle />
                  </div>
                }
              />
            )}
          </div>
        </h3>
        <p className="w-full">{place.description}</p>
        <div className="w-full flex justify-between gap-2">
          <div className="w-full flex flex-wrap items-center justify-end gap-1">
            <EyeButton click={handleClick} />
            {place.officialId && <IdTag label={place.officialId} />}
            <Tag
              text={"niveau " + place.level.toString()}
              bgColor="bg-info"
              children={<FaArrowUpRightDots />}
            />
            <PointTag label={place.points.toString()} />
            <PopulationTag label={place.population.toString()} />
          </div>
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
