// import { FaCoins } from "react-icons/fa6";
import { COSTS, PLACE_TYPE, QUOTAS } from "../../settings/consts";
import Button from "./button";
import { Place, emptyPlace } from "../../types/typPlace";
import { myStore, newPlaceAtom } from "../../settings/store";
import { useTranslation } from "react-i18next";
import { MdLandscape } from "react-icons/md";
import { Nation } from "../../types/typNation";
import { FaCoins } from "react-icons/fa";
import { errorMessage } from "../../utils/toasts";

export interface newPlaceProps {
  nation: Nation;
  parentId: string;
  owner: boolean;
}

export default function NewPlaceButton({
  nation,
  parentId,
  owner,
}: newPlaceProps) {
  const { t } = useTranslation();

  const handleClick = () => {
    if (
      nation.data.roleplay.treasury >= COSTS.PLACE ||
      nation.data.roleplay.places < QUOTAS.PLACES
    ) {
      const newPlace: Place = {
        officialId: emptyPlace.officialId,
        parentId,
        nation: nation.officialId,
        type: PLACE_TYPE.state.id,
        population: emptyPlace.population,
        name: emptyPlace.name,
        description: emptyPlace.description,
        image: emptyPlace.image,
        reported: emptyPlace.reported,
        banished: emptyPlace.banished,
        createdAt: new Date(),
        isFree: nation.data.roleplay.places < QUOTAS.PLACES,
      };

      myStore.set(newPlaceAtom, newPlace);
    } else {
      errorMessage(t("toasts.errors.notEnoughCredits"));
    }
  };

  return (
    <>
      {owner && (
        <div className="flex items-center gap-4">
          {nation.data.roleplay.places >= QUOTAS.PLACES && (
            <span className="flex items-center gap-1 text-gold">
              <FaCoins />
              {COSTS.PLACE}
            </span>
          )}
          <Button
            text={t("components.buttons.newPlace")}
            type="button"
            click={handleClick}
            children={<MdLandscape />}
          />
        </div>
      )}
    </>
  );
}
