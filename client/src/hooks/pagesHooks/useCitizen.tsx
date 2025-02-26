import { useAtom } from "jotai";
import { useParams } from "react-router-dom";
import { NationModel } from "../../models/nationModel";
import { useEffect, useState } from "react";
import { UserModel } from "../../models/userModel";
import { confirmBox, myStore, sessionAtom } from "../../settings/store";
import { useTranslation } from "react-i18next";

export function useCitizen() {
  const param = useParams();

  const [citizen, setCitizen] = useState<UserModel>(new UserModel());
  const [nation, setNation] = useState<NationModel>(new NationModel());
  const [owner, setOwner] = useState<boolean>(false);
  const { t } = useTranslation();
  const [session] = useAtom(sessionAtom);

  useEffect(() => {
    const loadCitizen = async (officialId: string) => {
      const user: UserModel = new UserModel();
      const loadedUser = await user.loadUser(officialId);
      setCitizen(loadedUser);
    };
    if (param.id) {
      loadCitizen(param.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param.id]);

  useEffect(() => {
    setOwner(session.user.officialId === citizen.officialId);
    const loadNation = async (officialId: string) => {
      const loadedNation = await nation.loadNation(officialId);
      setNation(loadedNation);
    };
    if (
      citizen.citizenship.nationId != "" &&
      nation.officialId != citizen.citizenship.nationId
    ) {
      loadNation(citizen.citizenship.nationId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [citizen]);

  const updatePath = (
    path: string,
    value: string,
    needConfirm: boolean = true,
  ) => {
    const updatedUser = citizen.updateOne(path, value);

    const baseUpdate = async () => {
      const citizenInBase = await updatedUser.updatedObject.baseUpdate();
      if (citizenInBase) {
        setCitizen(citizenInBase);
      }
    };
    if (updatedUser.isSuccess) {
      if (needConfirm) {
        myStore.set(confirmBox, {
          text: t("components.modals.confirmModal.updateUser"),
          actionToDo: baseUpdate,
        });
      } else {
        baseUpdate();
      }
    }
  };

  return {
    citizen,
    nation,
    owner,
    setCitizen,
    updatePath,
  };
}
