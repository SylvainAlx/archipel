// import { FaCoins } from "react-icons/fa6";
import { placesTypeList } from "../../settings/consts";
import Button from "./button";
import { Place, emptyPlace } from "../../types/typPlace";
import { myStore, newPlaceAtom, sessionAtom } from "../../settings/store";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";

export interface newPlaceProps {
  parentId: string;
  owner: boolean;
}

export default function NewPlaceButton({ parentId, owner }: newPlaceProps) {
  const { t } = useTranslation();
  const [session] = useAtom(sessionAtom);

  const handleClick = () => {
    const newPlace: Place = {
      officialId: emptyPlace.officialId,
      parentId,
      nation: session.nation.officialId,
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
      {owner && (
        <Button
          text=""
          type="button"
          click={handleClick}
          children={
            <div className="w-full flex justify-center items-center gap-2 flex-wrap">
              <span>{t("components.buttons.newPlace")}</span>
              {/* <span className="flex gap-1 items-center">
                <FaCoins />
                {NEW_PLACE_COST}
              </span> */}
            </div>
          }
        />
      )}
    </>
  );
}
