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
import { getComs, getPublicComs } from "../../api/communication/comAPI";
import { lazy, Suspense, useEffect, useState } from "react";
import BarreLoader from "../loading/barreLoader";
import Button from "../buttons/button";
import { FaComment } from "react-icons/fa";
import { ComPayload, emptyComPayload } from "../../types/typCom";
import Countdown from "../countdown";
import { COM_TYPE } from "../../settings/consts";
import { displayUnwatchedComs } from "../../utils/functions";

export default function NationComs({
  selectedNation,
  owner,
}: SelectedNationProps) {
  const { t } = useTranslation();
  const [nationComList, setNationComList] = useAtom(comFetchedListAtom);
  const [session] = useAtom(sessionAtom);
  const [allowPost, setAllowPost] = useState<boolean>(false);
  const [dueDate, setDueDate] = useState(new Date());
  const ComTile = lazy(() => import("../tiles/comTile"));

  useEffect(() => {
    setNationComList([]);
    if (selectedNation != undefined) {
      session.user.citizenship.nationId === selectedNation.officialId &&
      session.user.citizenship.status > 0
        ? getComs(selectedNation.officialId, selectedNation.officialId, [
            COM_TYPE.nationPrivate.id,
            COM_TYPE.nationPublic.id,
          ])
        : getPublicComs(selectedNation.officialId);
    }
  }, [selectedNation]);

  useEffect(() => {
    if (nationComList.length > 0) {
      const getLastPublicCom = () => {
        for (let i = nationComList.length - 1; i >= 0; i--) {
          if (nationComList[i].comType === COM_TYPE.nationPublic.id) {
            return nationComList[i];
          }
        }
        return null;
      };
      const lastElement = getLastPublicCom();
      if (lastElement) {
        const is24hBeforeLastCom: boolean =
          new Date(lastElement.createdAt).toLocaleDateString() <
          new Date().toLocaleDateString();
        const isActivePlan =
          myStore.get(sessionAtom).user.plan != "free" &&
          myStore.get(sessionAtom).user.expirationDate >
            new Date().toLocaleDateString();

        if (is24hBeforeLastCom || isActivePlan) {
          setAllowPost(true);
        } else {
          setAllowPost(false);
        }
      } else {
        setAllowPost(true);
      }
      session.nation.officialId === selectedNation.officialId &&
        displayUnwatchedComs(selectedNation.officialId, nationComList);
    } else {
      setAllowPost(true);
    }
  }, [nationComList]);

  useEffect(() => {
    if (!allowPost && nationComList.length > 0) {
      const givenDate = new Date(
        nationComList[nationComList.length - 1].createdAt,
      );
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
      destination: selectedNation.officialId,
      title: emptyComPayload.title,
    };
    myStore.set(newComAtom, newComPayload);
  };

  return (
    <DashTile
      title={t("pages.nation.coms.title")}
      children={
        <section className="w-full flex flex-col items-center rounded gap-4">
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
          <div className="w-full flex flex-col-reverse gap-2 items-center">
            {nationComList.length > 0 ? (
              nationComList.map((com, i) => {
                return (
                  <Suspense key={i} fallback={<BarreLoader />}>
                    <div className="relative w-full">
                      <ComTile com={com} owner={owner ? owner : false} />
                    </div>
                  </Suspense>
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
