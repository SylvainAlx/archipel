// import { FaCoins } from "react-icons/fa6";
import { PLACE_TYPE } from "../../../settings/consts";
import Button from "./button";
import { Place, emptyPlace } from "../../../types/typPlace";
import { myStore, newPlaceAtom } from "../../../settings/store";
import { useTranslation } from "react-i18next";
import { MdLandscape } from "react-icons/md";
import { Nation } from "../../../types/typNation";
import { FaCoins } from "react-icons/fa";
import { errorMessage } from "../../../utils/toasts";
import { getValueFromParam } from "../../../services/paramService";

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
  const quota = Number(getValueFromParam("quotas", "places"));
  const cost = Number(getValueFromParam("costs", "place"));

  const handleClick = () => {
    if (
      (quota && nation.data.roleplay.treasury >= quota) ||
      nation.data.roleplay.places < quota
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
        isFree: nation.data.roleplay.places < quota,
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
          {cost && quota && nation.data.roleplay.places >= quota && (
            <span className="flex items-center gap-1 text-gold">
              <FaCoins />
              {cost}
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
