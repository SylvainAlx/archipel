import { NewPlaceTileProps } from "../../../types/typProp";
import { addCredits, formatTime } from "../../../utils/functions";
import Button from "../../button";
import Tag from "../../tag";
import { FaCoins, FaTrophy, FaUserGroup } from "react-icons/fa6";
import { Place } from "../../../types/typNation";
import { MdTimer } from "react-icons/md";
import { newPlaceAtom } from "../../../settings/store";
import { useAtom } from "jotai";

export default function NewPlaceTile({
  title,
  nationId,
  type,
  cost,
  waitTime,
  benefit,
  population,
  description,
  image,
  canBuy,
}: NewPlaceTileProps) {
  const [, setNewPlace] = useAtom(newPlaceAtom);
  const handleClick = () => {
    let date = new Date();
    let newPlace: Place = {
      nationId,
      buildDate: new Date(date.getTime() + waitTime * 60000),
      type,
      cost,
      points: benefit,
      population,
      name: title,
      description,
      image,
    };
    setNewPlace(newPlace);
  };

  return (
    <div
      className={`w-full p-4 rounded flex flex-col items-center gap-3 bg-complementary2 shadow-xl`}
    >
      <h3 className="w-full text-xl">{title}</h3>
      <div className="w-full flex items-center gap-2 flex-wrap">
        <Tag
          text={"+ " + benefit.toString()}
          bgColor="bg-success"
          children={<FaTrophy />}
        />
        <Tag
          text={"+ " + population.toString()}
          bgColor="bg-success"
          children={<FaUserGroup />}
        />
        <Tag
          text={"- " + cost.toString()}
          bgColor="bg-danger"
          children={<FaCoins />}
        />
        <Tag
          text={formatTime(waitTime)}
          bgColor="bg-wait"
          children={<MdTimer />}
        />
      </div>

      <em>{description}</em>
      {canBuy ? (
        <Button text="CRÉER" type="button" path="" click={handleClick} />
      ) : (
        <Button
          text="CRÉDITS INSUFFISANTS"
          type="button"
          path=""
          bgColor="bg-danger"
          click={addCredits}
        />
      )}
    </div>
  );
}
