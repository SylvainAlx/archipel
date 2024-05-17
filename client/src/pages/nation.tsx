import H1 from "../components/titles/h1";
import NationIdentity from "../components/nations/dashboard/nationIdentity";
import {
  confirmBox,
  myStore,
  nationFetchedAtom,
  sessionAtom,
} from "../settings/store";
import { useAtom } from "jotai";
import Places from "../components/nations/dashboard/places";
import { useTranslation } from "react-i18next";
import Score from "../components/nations/dashboard/score";
import Diplomacy from "../components/nations/dashboard/diplomacy";
import Links from "../components/nations/dashboard/links";
import { useEffect, useState } from "react";
import Button from "../components/buttons/button";
import { useNavigate, useParams } from "react-router-dom";
import { getNation } from "../api/nation/nationAPI";
import Citizens from "../components/nations/dashboard/citizens";

export default function Nation() {
  const [nation] = useAtom(nationFetchedAtom);
  const [session] = useAtom(sessionAtom);
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
    }
  }, [session.user, nation, param.id]);

  useEffect(() => {
    if (
      nation != undefined &&
      nation.officialId != param.id &&
      param.id != undefined
    ) {
      getNation(param.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param.id, owner]);

  const handleDelete = () => {
    myStore.set(confirmBox, {
      action: "deleteSelfNation",
      text: t("components.modals.confirmModal.deleteNation"),
      result: "",
    });
    navigate(`/citizen/${session.user.officialId}`);
  };

  return (
    <>
      <H1 text={nation.name} />
      {nation != undefined ? (
        <>
          <section className="w-full flex flex-wrap gap-8 items-start justify-between">
            <Score selectedNation={nation} owner={owner} />
            <Links selectedNation={nation} owner={owner} />
            <NationIdentity selectedNation={nation} owner={owner} />
            <Places selectedNation={nation} owner={owner} />
            <Diplomacy />
            <Citizens />
          </section>
          <section className="pt-10 flex flex-col items-center gap-4">
            {owner && (
              <Button
                text={t("components.buttons.deleteNation")}
                bgColor="bg-danger"
                click={handleDelete}
              />
            )}
          </section>
        </>
      ) : (
        <div>Aucune nation à afficher</div>
      )}
    </>
  );
}
