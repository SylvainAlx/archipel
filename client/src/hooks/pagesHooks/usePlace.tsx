import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { confirmBox, myStore, sessionAtom } from "../../settings/store";
import { useTranslation } from "react-i18next";
import { NationModel } from "../../models/nationModel";
import { PlaceModel } from "../../models/placeModel";

export function usePlace() {
  const param = useParams();
  const [session] = useAtom(sessionAtom);
  const [owner, setOwner] = useState(false);
  const { t } = useTranslation();

  const [nation, setNation] = useState<NationModel>(new NationModel());
  const [place, setPlace] = useState<PlaceModel>(new PlaceModel());

  useEffect(() => {
    const loadPlace = async () => {
      if (param.id) {
        const updatedPlace = await place.loadPlace(param.id);
        if (updatedPlace) setPlace(updatedPlace);
      }
    };
    loadPlace();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param.id]);

  useEffect(() => {
    const loadNation = async (officialId: string) => {
      const loadedNation = await nation.loadNation(officialId);
      setNation(loadedNation);
    };
    if (
      place.nation === session.user.citizenship.nationId &&
      session.user.citizenship.nationOwner
    ) {
      setOwner(true);
    }
    if (nation.officialId === "" && place.nation != "") {
      loadNation(place.nation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [place]);

  const updatePath = (
    path: string,
    value: string,
    needConfirm: boolean = true,
  ) => {
    const updatedPlace = place.updateOne(path, value);

    const baseUpdate = async () => {
      const placeInBase = await updatedPlace.updatedObject.baseUpdate();
      setPlace(placeInBase);
    };
    if (updatedPlace.isSuccess) {
      if (needConfirm) {
        myStore.set(confirmBox, {
          text: t("components.modals.confirmModal.updatePlace"),
          actionToDo: baseUpdate,
        });
      } else {
        baseUpdate();
      }
    }
  };

  return { place, nation, owner, updatePath };
}
