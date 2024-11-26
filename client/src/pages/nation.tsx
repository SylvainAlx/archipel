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
import ReportButton from "../components/buttons/reportButton";
import { IoWarning } from "react-icons/io5";

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

  return (
    <>
      <H1 text={t("pages.nation.title")} />
      {nation != undefined && (
        <>
          {!nation.reported ? (
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
              <section className="pt-10 flex flex-col items-center gap-4">
                {owner ? (
                  <CrossButton
                    text={t("components.buttons.deleteNation")}
                    click={handleDelete}
                  />
                ) : (
                  <div className="flex items-center justify-center">
                    <ReportButton contentOfficialId={nation.officialId} />
                  </div>
                )}
              </section>
            </>
          ) : (
            <div className="animate-pulse text-danger text-xl flex items-center justify-center gap-2">
              <IoWarning />
              <strong className="text-danger">
                {t("pages.nation.reported")}
              </strong>
            </div>
          )}
        </>
      )}
    </>
  );
}
