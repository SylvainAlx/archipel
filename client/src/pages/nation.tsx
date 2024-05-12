/* eslint-disable react-hooks/exhaustive-deps */
import H1 from "../components/titles/h1";
import NationIdentity from "../components/nations/dashboard/nationIdentity";
import {
  confirmBox,
  myStore,
  nationAtom,
  selectedNationAtom,
  userAtom,
} from "../settings/store";
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

export default function Nation() {
  const [selectedNation] = useAtom(selectedNationAtom);
  const [nation] = useAtom(nationAtom);
  const [user] = useAtom(userAtom);
  const [owner, setOwner] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const param = useParams();

  useEffect(() => {
    if (
      user.citizenship.nationOwner &&
      user.citizenship.nationId === selectedNation.officialId
    ) {
      setOwner(true);
      myStore.set(selectedNationAtom, nation);
    }
  }, [selectedNation, user, nation]);

  useEffect(() => {
    if (selectedNation.officialId != param.id && param.id != undefined) {
      getNation(param.id, owner);
    }
  }, [param.id, owner]);

  const handleDelete = () => {
    myStore.set(confirmBox, {
      action: "deleteSelfNation",
      text: t("components.modals.confirmModal.deleteNation"),
      result: "",
    });
    navigate(`/citizen/${user.officialId}`);
  };

  return (
    <>
      <H1 text={t("pages.nation.title")} />
      {selectedNation.officialId != "" ? (
        <>
          <section className="w-full flex flex-wrap gap-8 items-start justify-between">
            <Score selectedNation={selectedNation} owner={owner} />
            <Links selectedNation={selectedNation} owner={owner} />
            <NationIdentity selectedNation={selectedNation} owner={owner} />
            <Places selectedNation={selectedNation} owner={owner} />
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
