import { FaCoins } from "react-icons/fa6";
import { NEW_PLACE_COST, placesTypeList } from "../../settings/consts";
import { newPlaceProps } from "../../types/typProp";
import Button from "./button";
import { Place, emptyPlace } from "../../types/typPlace";
import {
  myStore,
  newPlaceAtom,
  selectedNationAtom,
} from "../../settings/store";
import { useAtom } from "jotai";
import { addCredits } from "../../utils/functions";
import { useTranslation } from "react-i18next";

export default function NewPlaceButton({ parentId, owner }: newPlaceProps) {
  const [selectedNation] = useAtom(selectedNationAtom);
  const { t } = useTranslation();

  const handleClick = () => {
    const newPlace: Place = {
      officialId: emptyPlace.officialId,
      parentId,
      nation: selectedNation.officialId,
      points: emptyPlace.points,
      type: placesTypeList[0].id,
      slots: emptyPlace.slots,
      population: emptyPlace.population,
      name: emptyPlace.name,
      description: emptyPlace.description,
      image: emptyPlace.image,
      builds: emptyPlace.builds,
    };
    myStore.set(newPlaceAtom, newPlace);
  };

  return (
    <>
      {selectedNation.data.roleplay.credits >= NEW_PLACE_COST
        ? owner && (
            <Button
              text=""
              type="button"
              path=""
              click={handleClick}
              children={
                <div className="w-full flex justify-center items-center gap-2 flex-wrap">
                  <span>{t("components.buttons.newPlace")}</span>
                  <span className="flex gap-1 items-center">
                    <FaCoins />
                    {NEW_PLACE_COST}
                  </span>
                </div>
              }
            />
          )
        : owner && (
            <Button
              text="CRÉDITS INSUFFISANTS"
              type="button"
              path=""
              bgColor="bg-danger"
              click={addCredits}
              children={
                <div className="pl-2 flex gap-1 items-center">
                  <FaCoins />
                  {NEW_PLACE_COST}
                </div>
              }
            />
          )}
    </>
  );
}
