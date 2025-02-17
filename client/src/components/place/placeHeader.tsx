import { FaSortAmountDownAlt } from "react-icons/fa";
import CrossButton from "../buttons/crossButton";
import ParentButton from "../buttons/parentButton";
import EditButton from "../buttons/editButton";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { confirmBox, myStore, placeListAtomV2 } from "../../settings/store";
import { useAtom } from "jotai";
import { ConfirmBoxDefault } from "../../types/typAtom";
import ShareButton from "../buttons/shareButton";
import { PlaceModel } from "../../models/placeModel";
import { NationModel } from "../../models/nationModel";
import { PlaceListModel } from "../../models/lists/placeListModel";
import { PLACE_TYPE } from "../../settings/consts";

interface PlaceHeaderProps {
  place: PlaceModel;
  nation: NationModel;
  owner: boolean;
  updatePath: (path: string, value: string) => void;
}

export default function PlaceHeader({
  place,
  nation,
  owner,
  updatePath,
}: PlaceHeaderProps) {
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
      actionToDo: () => {
        place.baseDelete();
        const listToUpdate = placeList.removeByOfficialId(place.officialId);
        setPlaceList(new PlaceListModel(listToUpdate));
        navigate(`/nation/${place.nation}`);
        myStore.set(confirmBox, ConfirmBoxDefault);
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
        <p>{parentName}</p>
        {owner && (
          <EditButton
            editBox={{
              target: "place",
              original: placeList.getLabelIdPlaceList(
                [PLACE_TYPE.state.id, PLACE_TYPE.county.id],
                nation,
                place.officialId,
              ),
              new: place.parentId,
              path: "parentId",
              action: updatePath,
            }}
          />
        )}
      </div>
    </>
  );
}
