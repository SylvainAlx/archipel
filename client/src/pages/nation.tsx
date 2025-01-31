import H1 from "../components/titles/h1";
import {
  confirmBox,
  myStore,
  nationListAtomV2,
  sessionAtom,
} from "../settings/store";
import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import Links from "../components/nation/links";
import { lazy, Suspense, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { errorMessage } from "../utils/toasts";
import CrossButton from "../components/buttons/crossButton";
import ReportPanel from "../components/reportPanel";
import EditIcon from "../components/editIcon";
import { NationModel } from "../models/nationModel";
import { NationListModel } from "../models/lists/nationListModel";
import Spinner from "../components/loading/spinner";
import { createPageTitle } from "../utils/procedures";

export default function Nation() {
  const [nation, setNation] = useState<NationModel>(new NationModel());
  const [nationList, setNationList] = useAtom(nationListAtomV2);
  const [session] = useAtom(sessionAtom);
  const [owner, setOwner] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const param = useParams();

  createPageTitle(nation.name);

  const NationIdentity = lazy(
    () => import("../components/nation/nationIdentity"),
  );
  const NationMap = lazy(() => import("../components/nation/nationMap"));
  const FreeTiles = lazy(() => import("../components/nation/freeTiles"));
  const Diplomacy = lazy(() => import("../components/nation/diplomacy"));
  const Citizens = lazy(() => import("../components/nation/citizens"));
  const Places = lazy(() => import("../components/nation/places"));
  const NationComs = lazy(() => import("../components/nation/nationComs"));

  useEffect(() => {
    if (
      session.user.citizenship.nationOwner &&
      session.user.citizenship.nationId === param.id
    ) {
      setOwner(true);
    } else {
      setOwner(false);
    }
  }, [session.user, nation, param.id]);

  useEffect(() => {
    const loadNation = async (officialId: string) => {
      const loadedNation = await nation.loadNation(officialId);
      setNation(loadedNation);
    };
    if (nation === null) {
      navigate(`/`);
      errorMessage(t("toasts.errors.404"));
    }
    if (
      nation != undefined &&
      nation.officialId != param.id &&
      param.id != undefined
    ) {
      loadNation(param.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param.id]);

  const handleDelete = () => {
    myStore.set(confirmBox, {
      action: "deleteSelfNation",
      text: t("components.modals.confirmModal.deleteNation"),
      result: "",
      actionToDo: () => {
        nation.baseDelete();
        const updatedList = nationList.removeByOfficialId(nation.officialId);
        setNationList(new NationListModel(updatedList));
        navigate(`/citizen/${session.user.officialId}`);
      },
    });
  };

  const updatePath = (
    path: string,
    value: string,
    needConfirm: boolean = true,
  ) => {
    const updatedNation = nation.updateOne(path, value);

    const baseUpdate = async () => {
      const nationInBase = await updatedNation.updatedObject.baseUpdate();
      setNation(nationInBase);
    };
    if (updatedNation.isSuccess) {
      if (needConfirm) {
        myStore.set(confirmBox, {
          action: "",
          text: t("components.modals.confirmModal.updateNation"),
          result: "",
          actionToDo: baseUpdate,
        });
      } else {
        baseUpdate();
      }
    }
  };

  return nation.officialId === param.id ? (
    <>
      <div className="w-full relative flex items-center justify-center gap-2">
        <H1 text={nation.name} />
        {owner && (
          <EditIcon
            target="nation"
            param={nation.name}
            path="name"
            canBeEmpty={false}
          />
        )}
      </div>
      {nation != undefined && (
        <>
          {!nation.reported && (
            <>
              <section className="w-full flex flex-wrap gap-8 items-start justify-between">
                <div className="w-full flex flex-col gap-3 items-center justify-center">
                  <Links selectedNation={nation} owner={owner} />
                </div>
                {nation.officialId === param.id && (
                  <>
                    <Suspense fallback={<Spinner />}>
                      <NationIdentity
                        selectedNation={nation}
                        owner={owner}
                        updatePath={updatePath}
                      />
                    </Suspense>
                    <Suspense fallback={<Spinner />}>
                      <NationMap
                        selectedNation={nation}
                        owner={owner}
                        updatePath={updatePath}
                      />
                    </Suspense>
                    <Suspense fallback={<Spinner />}>
                      <FreeTiles selectedNation={nation} owner={owner} />
                    </Suspense>
                    <Suspense fallback={<Spinner />}>
                      <Diplomacy selectedNation={nation} owner={owner} />
                    </Suspense>
                    <Suspense fallback={<Spinner />}>
                      <Citizens selectedNation={nation} owner={owner} />
                    </Suspense>
                    <Suspense fallback={<Spinner />}>
                      <Places selectedNation={nation} owner={owner} />
                    </Suspense>
                    <Suspense fallback={<Spinner />}>
                      <NationComs selectedNation={nation} owner={owner} />
                    </Suspense>
                  </>
                )}
              </section>
            </>
          )}
          <section className="pt-10 flex flex-col items-center gap-4">
            {owner ? (
              <CrossButton
                text={t("components.buttons.deleteNation")}
                click={handleDelete}
              />
            ) : (
              session.user.officialId != "" && <ReportPanel content={nation} />
            )}
          </section>
        </>
      )}
    </>
  ) : (
    <em className="text-center">{t("pages.nation.noNation")}</em>
  );
}
