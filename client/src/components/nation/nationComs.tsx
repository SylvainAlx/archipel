import { useTranslation } from "react-i18next";
import DashTile from "../ui/dashTile";
import { SelectedNationProps } from "../../types/typProp";
import { useAtom } from "jotai";
import {
  comListAtomV2,
  myStore,
  newComAtom,
  sessionAtom,
} from "../../settings/store";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import Button from "../ui/buttons/button";
import { FaComment } from "react-icons/fa";
import { ComPayload, emptyComPayload } from "../../types/typCom";
import { ComListModel } from "../../models/lists/comListModel";
import { COM_TYPE } from "../../settings/consts";
import TileSkeleton from "../ui/loading/skeletons/tileSkeleton";

export default function NationComs({
  selectedNation,
  owner,
}: SelectedNationProps) {
  const { t } = useTranslation();
  const [session] = useAtom(sessionAtom);
  const [comList] = useAtom(comListAtomV2);
  const [coms, setComs] = useState<ComListModel>(new ComListModel());
  // const { allowPost, dueDate } = useAllowPost(coms, selectedNation);
  const ComTile = lazy(() => import("../ui/tiles/comTile"));

  const comTypes: number[] =
    session.user.citizenship.nationId === selectedNation.officialId
      ? [COM_TYPE.nationPublic.id, COM_TYPE.nationPrivate.id]
      : [COM_TYPE.nationPublic.id];

  const filterComList = useMemo(() => {
    const list = comList
      .getItems()
      .filter(
        (com) =>
          com.destination === selectedNation.officialId &&
          comTypes.includes(com.comType),
      );
    return new ComListModel(list);
  }, [comList]);

  useEffect(() => {
    const loadNationComList = async () => {
      await coms.loadNationComList(
        "",
        selectedNation.officialId,
        comTypes,
        session.user.citizenship.nationId === selectedNation.officialId,
      );
    };
    loadNationComList();
  }, []);

  useEffect(() => {
    setComs(filterComList);
  }, [filterComList]);

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
                // disabled={!allowPost}
              />
              {/* {dueDate > new Date() && <Countdown targetDate={dueDate} />} */}
            </div>
          )}
          <div className="w-full flex flex-col-reverse gap-2 items-center">
            {coms.getItems().length > 0 ? (
              coms.getItems().map((com, i) => {
                return (
                  <Suspense key={i} fallback={<TileSkeleton />}>
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
