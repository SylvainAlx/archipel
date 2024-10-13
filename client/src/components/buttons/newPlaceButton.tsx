// import { FaCoins } from "react-icons/fa6";
import { placesTypeList } from "../../settings/consts";
import Button from "./button";
import { Place, emptyPlace } from "../../types/typPlace";
import { myStore, newPlaceAtom, sessionAtom } from "../../settings/store";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { MdLandscape } from "react-icons/md";

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
      type: placesTypeList[0].id,
      population: emptyPlace.population,
      name: emptyPlace.name,
      description: emptyPlace.description,
      image: emptyPlace.image,
    };

    myStore.set(newPlaceAtom, newPlace);
  };

  return (
    <>
      {owner && (
        <Button
          text={t("components.buttons.newPlace")}
          type="button"
          click={handleClick}
          children={<MdLandscape />}
        />
      )}
    </>
  );
}
