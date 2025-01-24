import H1 from "../components/titles/h1";
import NationIdentity from "../components/nation/nationIdentity";
import {
  confirmBox,
  myStore,
  nationListAtomV2,
  sessionAtom,
} from "../settings/store";
import { useAtom } from "jotai";
import Places from "../components/nation/places";
import { useTranslation } from "react-i18next";
import Diplomacy from "../components/nation/diplomacy";
import Links from "../components/nation/links";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Citizens from "../components/nation/citizens";
import { errorMessage } from "../utils/toasts";
import CrossButton from "../components/buttons/crossButton";
import FreeTiles from "../components/nation/freeTiles";
import NationMap from "../components/nation/nationMap";
import { ConfirmBoxDefault } from "../types/typAtom";
import NationComs from "../components/nation/nationComs";
import ReportPanel from "../components/reportPanel";
import EditIcon from "../components/editIcon";
import { getDocumentTitle } from "../utils/functions";
import { NationModel } from "../models/nationModel";
import { NationListModel } from "../models/lists/nationListModel";

export default function Nation() {
  const [nation, setNation] = useState<NationModel>(new NationModel());
  const [nationList, setNationList] = useAtom(nationListAtomV2);
  const [session] = useAtom(sessionAtom);
  const [confirm, setConfirm] = useAtom(confirmBox);
  const [owner, setOwner] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const param = useParams();

  useEffect(() => {
    if (
      session.user.citizenship.nationOwner &&
      session.user.citizenship.nationId === param.id
    ) {
      setOwner(true);
    } else {
      setOwner(false);
    }

    document.title = getDocumentTitle(nation.name);
    return () => {
      document.title = getDocumentTitle("");
    };
  }, [session.user, nation, param.id]);

  useEffect(() => {
    const loadNation = async (officialId: string) => {
      if (session.nation.officialId === officialId) {
        setNation(session.nation);
      } else {
        const loadedNation = await nation.loadNation(officialId);
        setNation(loadedNation);
      }
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
  }, [param.id, owner]);

  useEffect(() => {
    if (confirm.action === "deleteSelfNation" && confirm.result === "OK") {
      navigate(`/citizen/${session.user.officialId}`);
      setConfirm(ConfirmBoxDefault);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirm]);

  const handleDelete = () => {
    myStore.set(confirmBox, {
      action: "deleteSelfNation",
      text: t("components.modals.confirmModal.deleteNation"),
      result: "",
      actionToDo: () => {
        nation.baseDelete();
        const updatedList = nationList.removeByOfficialId(nation.officialId);
        setNationList(new NationListModel(updatedList));
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
          action: "updateNation",
          text: t("components.modals.confirmModal.updateNation"),
          result: "",
          target: "",
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
                    <NationIdentity
                      selectedNation={nation}
                      owner={owner}
                      updatePath={updatePath}
                    />
                    <NationMap
                      selectedNation={nation}
                      owner={owner}
                      updatePath={updatePath}
                    />
                    <FreeTiles selectedNation={nation} owner={owner} />
                    <Diplomacy selectedNation={nation} owner={owner} />
                    <Citizens selectedNation={nation} owner={owner} />
                    <Places selectedNation={nation} owner={owner} />
                    <NationComs selectedNation={nation} owner={owner} />
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
