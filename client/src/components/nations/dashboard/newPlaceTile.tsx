import { NewPlaceTileProps } from "../../../types/typProp";
import { addCredits } from "../../../utils/functions";
import Button from "../../button";
import Tag from "../../tag";
import { FaCoins, FaTrophy, FaUserGroup } from "react-icons/fa6";

export default function NewPlaceTile({
  title,
  cost,
  benefit,
  capacity,
  description,
  canBuy,
}: NewPlaceTileProps) {
  return (
    <div
      className={`w-full p-4 ${canBuy ? "bg-complementary2" : "bg-black_alpha"} rounded flex flex-col items-center gap-3 shadow-xl`}
    >
      <div className="w-full flex justify-between items-center">
        <h3 className="text-xl">{title}</h3>
        <div className="flex items-center gap-2">
          <Tag
            text={"+ " + benefit.toString()}
            bgColor="bg-success"
            children={<FaTrophy />}
          />
          <Tag
            text={"+ " + capacity.toString()}
            bgColor="bg-success"
            children={<FaUserGroup />}
          />
          <Tag
            text={"- " + cost.toString()}
            bgColor="bg-danger"
            children={<FaCoins />}
          />
        </div>
      </div>
      {/* <div className="w-full h-[200px]">
        <img
          src={image}
          className="w-full h-full object-cover text-center saturate-50"
          alt={`image de ${title}`}
        ></img>
      </div> */}
      <em>{description}</em>
      {canBuy ? (
        <Button text="CRÉER" type="button" path="" />
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
