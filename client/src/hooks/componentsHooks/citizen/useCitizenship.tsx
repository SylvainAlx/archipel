import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  confirmBox,
  infoModalAtom,
  myStore,
  newNationAtom,
  sessionAtom,
} from "../../../settings/store";
import { useLoadNationPlaces } from "../../useLoadNationPlaces";
import { PlaceListModel } from "../../../models/lists/placeListModel";
import { useEffect, useState } from "react";
import { PIONEER_DATE } from "../../../settings/consts";
import { UserModel } from "../../../models/userModel";
import { NationModel } from "../../../models/nationModel";
import { emptyNewNationPayload } from "../../../types/typNation";
import IDCard from "../../../components/ui/idCard";

export default function useCitizenship(
  citizen: UserModel,
  // eslint-disable-next-line no-undef
  setCitizen: React.Dispatch<React.SetStateAction<UserModel>>,
  nation: NationModel,
  owner: boolean,
) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [session] = useAtom(sessionAtom);
  const nationPlaceList = useLoadNationPlaces(nation);
  const [cities, setCities] = useState(new PlaceListModel());
  const [enableLeaving, setEnableLeaving] = useState(false);

  const pioneerDate = new Date(PIONEER_DATE);

  const citizenCreationDate = new Date(citizen.createdAt);

  useEffect(() => {
    if (owner && !session.user.citizenship.nationOwner) {
      setEnableLeaving(true);
    } else {
      setEnableLeaving(false);
    }
  }, [citizen, owner, session.user]);

  useEffect(() => {
    setCities(nationPlaceList.getCities());
  }, [nationPlaceList]);

  const leaveNation = () => {
    const payload = {
      officialId: citizen.officialId,
      nationId: citizen.citizenship.nationId,
      status: -1,
    };
    myStore.set(confirmBox, {
      text:
        session.user.citizenship.status > 0
          ? t("components.modals.confirmModal.leaveNation")
          : t("components.modals.confirmModal.cancelCitizenship"),
      actionToDo: async () => {
        const updatedUser = await citizen.changeStatus(payload);
        updatedUser.updateSessionAtom(updatedUser);
        setCitizen(updatedUser);
      },
    });
  };

  const handleClick = (dest: string) => {
    if (dest === "nation") {
      navigate(`/nation/${nation.officialId}`);
    } else if (dest === "new") {
      myStore.set(newNationAtom, {
        ...emptyNewNationPayload,
        owner: citizen.officialId,
      });
    } else if (dest === "join") {
      navigate(`/explore/2`);
    }
  };

  const showIDCard = () => {
    myStore.set(infoModalAtom, {
      subtitle: t("components.idCard.name"),
      children: <IDCard user={citizen} nation={nation} />,
    });
  };

  return {
    citizenCreationDate,
    enableLeaving,
    handleClick,
    leaveNation,
    showIDCard,
    pioneerDate,
    session,
    t,
    cities,
  };
}
