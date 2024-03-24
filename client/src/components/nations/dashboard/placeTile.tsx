import { IoMdCloseCircle } from "react-icons/io";
// import { placesTypeList } from "../../../settings/consts";
import { PlaceTileProp } from "../../../types/typProp";

import Tag from "../../tag";
import {
  FaArrowUpRightDots,
  // FaCoins,
} from "react-icons/fa6";
import Button from "../../button";
import {
  confirmBox,
  editPlaceAtom,
  myStore,
  selectedNationAtom,
} from "../../../settings/store";
import { useAtom } from "jotai";
import IdTag from "../../tags/idTag";
import PointTag from "../../tags/pointTag";
import PopulationTag from "../../tags/populationTag";
import { GiCapitol } from "react-icons/gi";

export default function PlaceTile({ place, update, owner }: PlaceTileProp) {
  const [selectedNation] = useAtom(selectedNationAtom);

  const handleDelete = () => {
    myStore.set(confirmBox, {
      action: "deletePlace",
      text: "Confirmez-vous la suppression de la ville ?",
      result: "",
      target: place,
    });
  };

  const handleClick = () => {
    myStore.set(editPlaceAtom, { place, update });
  };

  return (
    <div
      className={`p-4 rounded flex flex-col items-center gap-3 bg-complementary2 shadow-xl`}
    >
      <div className="w-full flex flex-col items-center gap-2">
        <h3 className="w-full flex justify-center">
          <div className="text-xl flex items-center gap-2">
            <span className="text-lg text-info">
              {place._id === selectedNation.data.roleplay.capital && (
                <GiCapitol />
              )}
            </span>
            <span>{place.name}</span>
          </div>
          {owner && (
            <Tag
              text=""
              bgColor="bg-danger"
              click={handleDelete}
              children={
                <div className="text-xl">
                  <IoMdCloseCircle />
                </div>
              }
            />
          )}
        </h3>
        {place._id && <IdTag label={place._id} />}
        <div className="w-full relative flex justify-center">
          <div
            className={`bg-complementary flex flex-col items-center justify-center overflow-hidden rounded`}
          >
            {place.image != "" ? (
              <img
                src={place.image}
                alt={`image of ${place.name}`}
                className="object-cover w-full h-full"
              />
            ) : (
              <img
                src="/place/default.webp"
                alt={`default image of city`}
                className="object-cover w-full h-full"
              />
            )}
          </div>
          {/* {owner && <EditIcon param={place.image} path="data.url.flag" />} */}
        </div>
        <div className="w-full flex flex-wrap items-center gap-2 justify-center">
          <Tag
            text={"niveau " + place.level.toString()}
            bgColor="bg-info"
            children={<FaArrowUpRightDots />}
          />
          <PointTag label={place.points.toString()} />
          <PopulationTag label={place.population.toString()} />
        </div>
      </div>
      <em>{place.description}</em>
      {owner && (
        <Button text="ACCÉDER A LA VILLE" path="" click={handleClick} />
      )}
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
