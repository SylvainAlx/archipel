import { IoMdCloseCircle } from "react-icons/io";
import { placesTypeList } from "../../../settings/consts";
import { PlaceTileProp } from "../../../types/typProp";
import Countdown from "../../countdown";
import Tag from "../../tag";
import {
  FaArrowUpRightDots,
  FaCity,
  FaMountainCity,
  FaShieldHalved,
  FaTrophy,
  FaUserGroup,
} from "react-icons/fa6";
import Button from "../../button";
import {
  confirmBox,
  myStore,
  selectedNationAtom,
} from "../../../settings/store";
import { useAtom } from "jotai";

export default function PlaceTile({ place, update }: PlaceTileProp) {
  const [selectedNation] = useAtom(selectedNationAtom);

  const handleDelete = () => {
    myStore.set(confirmBox, {
      action: "deletePlace",
      text: "Confirmez-vous la suppression de la ville ?",
      result: "",
      target: place,
    });
  };

  return (
    <div
      className={`p-4 rounded flex flex-col items-center gap-3 bg-complementary2 shadow-xl`}
    >
      <div className="w-full flex flex-col items-center gap-2">
        <h3 className="text-xl flex items-center gap-2">
          <span className="text-lg text-info">
            {place._id === selectedNation.data.roleplay.capital && (
              <FaShieldHalved />
            )}
          </span>
          <span>{place.name}</span>
        </h3>
        <div className="w-full relative">
          <div
            className={`w-full h-[140px] bg-complementary flex flex-col items-center justify-center overflow-hidden rounded`}
          >
            {place.image != "" ? (
              <img
                src={place.image}
                alt={`flag of ${place.name}`}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="text-[3.1rem]">
                <FaMountainCity />
              </div>
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
          <Tag
            text={place.points.toString()}
            bgColor="bg-info"
            children={<FaTrophy />}
          />
          <Tag
            text={place.population.toString()}
            bgColor="bg-info"
            children={<FaUserGroup />}
          />
          <Tag
            text={place.builds.toString() + " / " + place.slots.toString()}
            bgColor="bg-info"
            children={<FaCity />}
          />
        </div>
        <div className="w-full flex items-center gap-2 justify-center">
          {new Date(place.buildDate) > new Date() && (
            <Countdown targetDate={place.buildDate} />
          )}
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
        </div>
      </div>
      <em>{place.description}</em>
      {update != -1 &&
        update != undefined &&
        new Date(place.buildDate) < new Date() && (
          <Button
            text={`Faire évoluer au niveau ${place.level + 1} pour ${placesTypeList[update].cost} crédits`}
            path=""
            bgColor="bg-success"
          />
        )}
    </div>
  );
}
