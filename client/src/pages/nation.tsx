import H1 from "../components/titles/h1";
import NationIdentity from "../components/nations/dashboard/nationIdentity";
import { confirmBox, myStore, sessionAtom } from "../settings/store";
import { useAtom } from "jotai";
import Places from "../components/nations/dashboard/places";
import { useTranslation } from "react-i18next";
import Score from "../components/nations/dashboard/score";
import Diplomacy from "../components/nations/dashboard/diplomacy";
import Links from "../components/nations/dashboard/links";
import { useEffect, useState } from "react";
import Button from "../components/buttons/button";
import TileContainer from "../components/tileContainer";
import { useNavigate, useParams } from "react-router-dom";
import { getNation } from "../api/nation/nationAPI";
import { EmptyNation } from "../types/typNation";

export default function Nation() {
  const [nation, setNation] = useState(EmptyNation);
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
    if (nation.officialId != param.id && param.id != undefined) {
      setNation(getNation(param.id));
    }
  }, [param.id, owner, nation.officialId]);

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
      <H1 text={t("pages.nation.title")} />
      {nation.officialId != "" ? (
        <>
          <section className="w-full flex flex-wrap gap-8 items-start justify-between">
            <Score selectedNation={nation} owner={owner} />
            <Links selectedNation={nation} owner={owner} />
            <NationIdentity selectedNation={nation} owner={owner} />
            <Places selectedNation={nation} owner={owner} />
            <Diplomacy />
            <TileContainer
              children={
                <section className="flex flex-col items-center gap-4">
                  {owner && (
                    <Button
                      text={t("components.buttons.deleteNation")}
                      bgColor="bg-danger"
                      click={handleDelete}
                    />
                  )}
                </section>
              }
            />
          </section>
        </>
      ) : (
        <div>Aucune nation à afficher</div>
      )}
    </>
  );
}
