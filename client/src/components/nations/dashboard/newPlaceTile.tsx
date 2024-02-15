import { NewPlaceTileProps } from "../../../types/typProp";
import { addCredits, formatTime } from "../../../utils/functions";
import Button from "../../button";
import Tag from "../../tag";
import { FaCoins, FaTrophy, FaUserGroup } from "react-icons/fa6";
import { Place } from "../../../types/typNation";
import { MdTimer } from "react-icons/md";

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
  placeList,
  setPlaceList,
}: NewPlaceTileProps) {
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
    console.log(newPlace);

    setPlaceList([...placeList, newPlace]);
  };

  return (
    <div
      className={`w-full p-4 rounded flex flex-col items-center gap-3 shadow-xl`}
    >
      <div className="w-full flex justify-between items-center">
        <h3 className="text-xl">{title}</h3>
        <div className="max-w-[200px] flex items-center gap-2 flex-wrap justify-end">
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
      </div>
      <em>{description}</em>
      {!canBuy && <p className="text-xl text-danger">CREDITS INSUFFISANTS</p>}
      {canBuy ? (
        <Button text="CRÉER" type="button" path="" click={handleClick} />
      ) : (
        <Button
          text="ACHETER DES CRÉDITS"
          type="button"
          path=""
          click={addCredits}
        />
      )}
    </div>
  );
}
