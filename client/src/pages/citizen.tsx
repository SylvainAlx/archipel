import { useAtom } from "jotai";
import H1 from "../components/titles/h1";
import { confirmBox, myStore, sessionAtom } from "../settings/store";
import { useParams } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import EditIcon from "../components/editIcon";
import ReportPanel from "../components/reportPanel";
import { NationModel } from "../models/nationModel";
import { UserModel } from "../models/userModel";
import { useTranslation } from "react-i18next";
import { createPageTitle } from "../utils/procedures";
import IdSkeleton from "../components/loading/skeletons/idSkeleton";
import TileSkeleton from "../components/loading/skeletons/tileSkeleton";
import ParamSkeleton from "../components/loading/skeletons/paramSkeleton";

export default function Citizen() {
  const param = useParams();
  const { t } = useTranslation();

  const [citizen, setCitizen] = useState<UserModel>(new UserModel());
  const [nation, setNation] = useState<NationModel>(new NationModel());
  const [owner, setOwner] = useState<boolean>(false);

  const [session] = useAtom(sessionAtom);

  const Personal = lazy(() => import("../components/citizen/personal"));
  const Citizenship = lazy(() => import("../components/citizen/citizenship"));
  const Settings = lazy(() => import("../components/citizen/settings"));
  const CitizenCom = lazy(() => import("../components/citizen/citizensCom"));

  createPageTitle(citizen.name);

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

  return (
    <>
      <div className="flex items-center gap-1">
        <H1 text={citizen.name} />
        {owner && (
          <EditIcon
            target="citizen"
            param={citizen.name}
            path="name"
            action={updatePath}
          />
        )}
      </div>
      <section className="w-full flex flex-wrap gap-8 items-start justify-between">
        {(!citizen.reported || owner) && (
          <>
            <Suspense fallback={<IdSkeleton />}>
              <Personal
                citizen={citizen}
                owner={owner}
                updatePath={updatePath}
              />
            </Suspense>
            <Suspense fallback={<ParamSkeleton />}>
              <Citizenship
                citizen={citizen}
                setCitizen={setCitizen}
                nation={nation}
                owner={owner}
                updatePath={updatePath}
              />
            </Suspense>
          </>
        )}
        {owner ? (
          <Suspense fallback={<ParamSkeleton />}>
            <Settings citizen={citizen} />
          </Suspense>
        ) : (
          <div className="w-full flex justify-center">
            <ReportPanel content={citizen} />
          </div>
        )}
        {owner && (
          <Suspense fallback={<TileSkeleton />}>
            <CitizenCom citizen={citizen} />
          </Suspense>
        )}
      </section>
    </>
  );
}
