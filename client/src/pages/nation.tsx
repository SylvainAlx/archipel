/* eslint-disable react-hooks/exhaustive-deps */
import H1 from "../components/titles/h1";
import NationIdentity from "../components/nations/dashboard/nationIdentity";
import {
  confirmBox,
  myStore,
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
import { useNavigate } from "react-router-dom";

export default function Nation() {
  const [selectedNation] = useAtom(selectedNationAtom);
  const [user] = useAtom(userAtom);
  const [owner, setOwner] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      user.citizenship.nationOwner &&
      user.citizenship.nationId === selectedNation.officialId
    ) {
      setOwner(true);
    }
  }, [selectedNation, user]);

  const handleDelete = () => {
    myStore.set(confirmBox, {
      action: "deleteSelfNation",
      text: t("components.modals.confirmModal.deleteNation"),
      result: "",
    });
    navigate(`/profile/${user.officialId}`);
  };

  return (
    <>
      <H1 text={t("pages.nation.title")} />
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
  );
}
