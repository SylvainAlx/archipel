import { useTranslation } from "react-i18next";
import DashTile from "../ui/dashTile";
import { useAtom } from "jotai";
import { comListAtomV2 } from "../../settings/store";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { COM_TYPE } from "../../settings/consts";
import { ComListModel } from "../../models/lists/comListModel";
import TileSkeleton from "../ui/loading/skeletons/tileSkeleton";
import { UserModel } from "../../models/userModel";

const ComTile = lazy(() => import("../ui/tiles/comTile"));

interface CitizensComProps {
  citizen: UserModel;
}

export default function CitizensCom({ citizen }: CitizensComProps) {
  const { t } = useTranslation();
  const [comList] = useAtom(comListAtomV2);
  const [listChecked, setListChecked] = useState(false);
  const [citizenComList, setCitizenComList] = useState(new ComListModel());

  const filteredComList = useMemo(() => {
    const list = comList
      .getItems()
      .filter(
        (com) =>
          com.destination === citizen.officialId &&
          [COM_TYPE.userPrivate.id, COM_TYPE.userUpdate.id].includes(
            com.comType,
          ),
      );
    return new ComListModel(list);
  }, [comList, citizen.officialId]);

  useEffect(() => {
    const loadComList = async () => {
      await citizenComList.loadComList("", citizen.officialId, [
        COM_TYPE.userPrivate.id,
        COM_TYPE.userUpdate.id,
      ]);
      setListChecked(true);
    };
    if (listChecked) {
      loadComList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [citizen.officialId, listChecked]);

  useEffect(() => {
    setCitizenComList(filteredComList);
  }, [filteredComList]);

  return (
    <DashTile title={t("pages.citizen.privateCom")}>
      <section className="w-full flex flex-col items-center rounded gap-4">
        <div className="w-full flex flex-col-reverse gap-2 items-center">
          {citizenComList.getItems().length > 0 ? (
            citizenComList.getItems().map((com, i) => (
              <Suspense key={i} fallback={<TileSkeleton />}>
                <div className="relative w-full">
                  <ComTile com={com} />
                </div>
              </Suspense>
            ))
          ) : (
            <em className="text-center">{t("pages.nation.coms.noComs")}</em>
          )}
        </div>
      </section>
    </DashTile>
  );
}
