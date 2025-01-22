import { FaSortAmountDownAlt } from "react-icons/fa";
import CrossButton from "../buttons/crossButton";
import ParentButton from "../buttons/parentButton";
import EditIcon from "../editIcon";
import { getPlaceListByType, getPlaceName } from "../../utils/functions";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Nation } from "../../types/typNation";
import { confirmBox, nationPlaceListAtomV2 } from "../../settings/store";
import { useAtom } from "jotai";
import { ConfirmBoxDefault } from "../../types/typAtom";
import ShareButton from "../buttons/shareButton";
import { PlaceModel } from "../../models/placeModel";
import { PlaceListModel } from "../../models/lists/placeListModel";

interface PlaceHeaderProps {
  place: PlaceModel;
  nation: Nation;
  owner: boolean;
  updatePath: (path: string, value: string) => void;
}

export default function PlaceHeader({
  place,
  nation,
  owner,
  updatePath,
}: PlaceHeaderProps) {
  const [refresh, setRefresh] = useState(false);
  const [parentName, setParentName] = useState("");
  const [confirm, setConfirm] = useAtom(confirmBox);
  const [nationPlaceList, setNationPlaceList] = useAtom(nationPlaceListAtomV2);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (nationPlaceList != undefined) {
      setParentName(
        getPlaceName(nationPlaceList.getItems(), place.parentId, nation.name),
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nationPlaceList, place, nation]);

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
      nationPlaceList.getItems().forEach((loc) => {
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
      actionToDo: () => {
        place.baseDelete();
        const updatedList = nationPlaceList.removeByOfficialId(
          place.officialId,
        );
        setNationPlaceList(new PlaceListModel(updatedList));
        navigate(`/nation/${place.nation}`);
      },
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
        <p>{`${nation.name != parentName ? parentName : nation.name}`}</p>
        {owner && (
          <EditIcon
            target="place"
            param={getPlaceListByType(
              nation,
              nationPlaceList.getItems(),
              [0, 1],
            )}
            action={updatePath}
            path="parentId"
          />
        )}
      </div>
    </>
  );
}
