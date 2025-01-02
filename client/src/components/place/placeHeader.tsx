import { FaSortAmountDownAlt } from "react-icons/fa";
import CrossButton from "../buttons/crossButton";
import ParentButton from "../buttons/parentButton";
import EditIcon from "../editIcon";
import { getPlaceListByType, getPlaceName } from "../../utils/functions";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Place } from "../../types/typPlace";
import { Nation } from "../../types/typNation";
import { confirmBox, nationPlacesListAtom } from "../../settings/store";
import { useAtom } from "jotai";
import { ConfirmBoxDefault } from "../../types/typAtom";
import ShareButton from "../buttons/shareButton";

interface PlaceHeaderProps {
  place: Place;
  nation: Nation;
  owner: boolean;
}

export default function PlaceHeader({
  place,
  nation,
  owner,
}: PlaceHeaderProps) {
  const [refresh, setRefresh] = useState(false);
  const [parentName, setParentName] = useState("");
  const [confirm, setConfirm] = useAtom(confirmBox);
  const [nationPlacesList] = useAtom(nationPlacesListAtom);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (nationPlacesList != undefined) {
      setParentName(
        getPlaceName(nationPlacesList, place.parentId, nation.name),
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nationPlacesList, place, nation]);

  useEffect(() => {
    if (confirm.action === "deletePlace" && confirm.result === "OK") {
      navigate(`/nation/${place.nation}`);
      setConfirm(ConfirmBoxDefault);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirm]);

  const handleClick = () => {
    if (place.nation === place.parentId) {
      navigate(`/nation/${place.nation}`);
    } else {
      nationPlacesList.forEach((loc) => {
        if (loc.officialId === place.parentId) {
          navigate(`/place/${loc.officialId}`);
          setRefresh(!refresh);
        }
      });
    }
  };

  const handleDelete = () => {
    setConfirm({
      action: "deletePlace",
      text: t("components.modals.confirmModal.deletePlace"),
      result: "",
      target: place,
    });
  };
  return (
    <>
      <div className="w-full flex items-center justify-center flex-wrap gap-1">
        <ParentButton click={handleClick} />
        {owner && <CrossButton click={handleDelete} />}
        <ShareButton label={place.name} />
      </div>
      <div className="flex items-center gap-2 text-complementary3">
        <FaSortAmountDownAlt />
        <p>{`${nation.name != parentName ? nation.name + " > " + parentName : nation.name}`}</p>
        {owner && (
          <EditIcon
            target="place"
            param={getPlaceListByType(nation, nationPlacesList, [0, 1])}
            path="parentId"
          />
        )}
      </div>
    </>
  );
}
