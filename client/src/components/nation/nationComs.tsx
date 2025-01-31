import { useTranslation } from "react-i18next";
import DashTile from "../dashTile";
import { SelectedNationProps } from "../../types/typProp";
import { useAtom } from "jotai";
import { myStore, newComAtom, sessionAtom } from "../../settings/store";
import { lazy, Suspense, useEffect, useState } from "react";
import BarreLoader from "../loading/barreLoader";
import Button from "../buttons/button";
import { FaComment } from "react-icons/fa";
import { ComPayload, emptyComPayload } from "../../types/typCom";
import Countdown from "../countdown";
import { displayUnwatchedComs } from "../../utils/procedures";
import { isMoreThan24Hours } from "../../utils/functions";
import { ComListModel } from "../../models/lists/comListModel";
import { ComModel } from "../../models/comModel";
import { COM_TYPE } from "../../settings/consts";

export default function NationComs({
  selectedNation,
  owner,
}: SelectedNationProps) {
  const { t } = useTranslation();
  const [session] = useAtom(sessionAtom);
  const [coms, setComs] = useState<ComListModel>(new ComListModel());
  const [allowPost, setAllowPost] = useState<boolean>(true);
  const [dueDate, setDueDate] = useState(new Date());
  const ComTile = lazy(() => import("../tiles/comTile"));

  const comTypes: number[] = owner
    ? [COM_TYPE.nationPublic.id, COM_TYPE.nationPrivate.id]
    : [COM_TYPE.nationPublic.id];

  useEffect(() => {
    const filterComs = (comList: ComListModel) => {
      const list: ComModel[] = [];
      comList.getItems().forEach((com) => {
        if (
          com.origin === selectedNation.officialId &&
          com.destination === selectedNation.officialId &&
          comTypes.includes(com.comType)
        ) {
          list.push(com);
        }
      });
      setComs(new ComListModel(list));
    };
    const loadNationComList = async () => {
      const list = await coms.loadNationComList(
        selectedNation.officialId,
        selectedNation.officialId,
        comTypes,
        owner,
      );
      if (list) {
        filterComs(list);
      }
    };
    loadNationComList();
  }, [selectedNation]);

  useEffect(() => {
    if (coms.getItems().length > 0) {
      const lastElement = coms.getItems()[coms.getItems().length - 1];
      if (lastElement) {
        const isActivePlan =
          myStore.get(sessionAtom).user.plan != "free" &&
          myStore.get(sessionAtom).user.expirationDate >
            new Date().toLocaleDateString();
        if (isMoreThan24Hours(lastElement.createdAt) || isActivePlan) {
          setAllowPost(true);
        } else {
          setAllowPost(false);
        }
      } else {
        setAllowPost(true);
      }
      session.user.citizenship.nationId === selectedNation.officialId &&
        displayUnwatchedComs(selectedNation.officialId, coms.getItems());
    } else {
      setAllowPost(true);
    }
  }, [selectedNation]);

  useEffect(() => {
    if (!allowPost && coms.getItems().length > 0) {
      const givenDate = new Date(
        coms.getItems()[coms.getItems().length - 1].createdAt,
      );
      const dateAfter24Hours = new Date(
        givenDate.getTime() + 24 * 60 * 60 * 1000,
      );
      setDueDate(dateAfter24Hours);
    } else {
      setDueDate(new Date());
    }
  }, [allowPost, coms]);

  const handleClick = () => {
    const newCom: ComPayload = {
      comType: 10,
      message: emptyComPayload.message,
      origin: selectedNation.officialId,
      destination: selectedNation.officialId,
      title: emptyComPayload.title,
    };
    myStore.set(newComAtom, newCom);
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
            {coms.getItems().length > 0 ? (
              coms.getItems().map((com, i) => {
                return (
                  <Suspense key={i} fallback={<BarreLoader />}>
                    <div className="relative w-full">
                      <ComTile com={com} />
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
