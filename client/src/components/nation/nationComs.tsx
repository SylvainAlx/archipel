import { useTranslation } from "react-i18next";
import DashTile from "../dashTile";
import { SelectedNationProps } from "../../types/typProp";
import { useAtom } from "jotai";
import {
  comFetchedListAtom,
  myStore,
  newComAtom,
  sessionAtom,
} from "../../settings/store";
import { getComsByDestination } from "../../api/communication/comAPI";
import { lazy, Suspense, useEffect, useState } from "react";
import BarreLoader from "../loading/barreLoader";
import Button from "../buttons/button";
import { FaComment } from "react-icons/fa";
import { ComPayload, emptyComPayload } from "../../types/typCom";
import Countdown from "../countdown";
import { COM_TYPE } from "../../settings/consts";

export default function NationComs({
  selectedNation,
  owner,
}: SelectedNationProps) {
  const { t } = useTranslation();
  const [nationComList] = useAtom(comFetchedListAtom);
  const [allowPost, setAllowPost] = useState<boolean>(true);
  const [dueDate, setDueDate] = useState(new Date());
  const ComTile = lazy(() => import("../tiles/comTile"));

  useEffect(() => {
    if (selectedNation != undefined) {
      getComsByDestination(selectedNation.officialId);
    }
  }, [selectedNation]);

  useEffect(() => {
    if (nationComList.length > 0) {
      if (
        new Date(nationComList[0].createdAt).toLocaleDateString() <
          new Date().toLocaleDateString() ||
        (myStore.get(sessionAtom).user.plan != "free" &&
          myStore.get(sessionAtom).user.expirationDate >
            new Date().toLocaleDateString())
      ) {
        setAllowPost(true);
      } else {
        setAllowPost(false);
      }
    } else {
      setAllowPost(true);
    }
  }, [nationComList]);

  useEffect(() => {
    if (!allowPost && nationComList.length > 0) {
      const givenDate = new Date(nationComList[0].createdAt);
      const dateAfter24Hours = new Date(
        givenDate.getTime() + 24 * 60 * 60 * 1000,
      );
      setDueDate(dateAfter24Hours);
    } else {
      setDueDate(new Date());
    }
  }, [allowPost, nationComList]);

  const handleClick = () => {
    const newComPayload: ComPayload = {
      comType: 10,
      message: emptyComPayload.message,
      origin: selectedNation.officialId,
      destination: emptyComPayload.destination,
      title: emptyComPayload.title,
    };
    myStore.set(newComAtom, newComPayload);
  };

  return (
    <DashTile
      title={t("pages.nation.coms.title")}
      children={
        <section className="w-full flex flex-col items-center rounded">
          <div className="w-full flex flex-col gap-2 items-center">
            {owner && (
              <div className="flex gap-1 justify-center items-center flex-wrap">
                <Button
                  text={t("components.buttons.createCom")}
                  children={<FaComment />}
                  click={handleClick}
                  disabled={!allowPost}
                />
                {dueDate > new Date() && <Countdown targetDate={dueDate} />}
              </div>
            )}
            {nationComList.length > 0 ? (
              nationComList.map((com, i) => {
                return (
                  com.destination === selectedNation.officialId &&
                  (com.comType === COM_TYPE.nationPrivate.id ||
                    COM_TYPE.nationPublic.id) && (
                    <Suspense key={i} fallback={<BarreLoader />}>
                      <div className="relative w-full">
                        <ComTile com={com} owner={owner ? owner : false} />
                      </div>
                    </Suspense>
                  )
                );
              })
            ) : (
              <em className="text-center">{t("pages.nation.coms.noComs")}</em>
            )}
          </div>
        </section>
      }
    />
  );
}
