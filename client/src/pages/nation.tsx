import H1 from "../components/titles/h1";
import NationIdentity from "../components/nation/nationIdentity";
import {
  confirmBox,
  myStore,
  nationFetchedAtom,
  sessionAtom,
} from "../settings/store";
import { useAtom } from "jotai";
import Places from "../components/nation/places";
import { useTranslation } from "react-i18next";
import Diplomacy from "../components/nation/diplomacy";
import Links from "../components/nation/links";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNation } from "../api/nation/nationAPI";
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

export default function Nation() {
  const [nation] = useAtom(nationFetchedAtom);
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
    if (nation === null) {
      navigate(`/`);
      errorMessage(t("toasts.errors.404"));
    }
    if (
      nation != undefined &&
      nation.officialId != param.id &&
      param.id != undefined
    ) {
      getNation(param.id);
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
    });
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
                    <NationIdentity selectedNation={nation} owner={owner} />
                    <NationMap selectedNation={nation} owner={owner} />
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
