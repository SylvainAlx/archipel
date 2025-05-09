import { useAtom } from "jotai";
import { confirmBox, myStore, placeListAtomV2 } from "../../../settings/store";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { PlaceListModel } from "../../../models/lists/placeListModel";
import { ConfirmBoxDefault } from "../../../types/typAtom";
import { PlaceModel } from "../../../models/placeModel";
import { NationModel } from "../../../models/nationModel";

export default function usePlaceHeader(place: PlaceModel, nation: NationModel) {
  const [parentName, setParentName] = useState("");
  const [placeList, setPlaceList] = useAtom(placeListAtomV2);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (place.parentId != "") {
      setParentName(placeList.findPlaceName(place.parentId, nation.name));
    }
  }, [placeList, place, nation]);

  const handleClick = () => {
    if (place.nation === place.parentId) {
      navigate(`/nation/${place.nation}`);
    } else {
      navigate(`/place/${place.parentId}`);
    }
  };

  const handleDelete = () => {
    myStore.set(confirmBox, {
      text: t("components.modals.confirmModal.deletePlace"),
      actionToDo: async () => {
        await place.baseDelete();
        const listToUpdate = placeList.removeByOfficialId(place.officialId);
        setPlaceList(new PlaceListModel(listToUpdate));
        navigate(`/nation/${place.nation}`);
        myStore.set(confirmBox, ConfirmBoxDefault);
      },
    });
  };

  return {
    placeList,
    parentName,
    handleClick,
    handleDelete,
  };
}
