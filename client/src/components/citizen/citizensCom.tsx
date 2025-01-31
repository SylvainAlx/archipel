import { useTranslation } from "react-i18next";
import DashTile from "../dashTile";
import { useAtom } from "jotai";
import { sessionAtom } from "../../settings/store";
import { lazy, Suspense, useEffect, useState } from "react";
import BarreLoader from "../loading/barreLoader";
import { COM_GENERAL_DESTINATION, COM_TYPE } from "../../settings/consts";
import { User } from "../../types/typUser";
import { ComListModel } from "../../models/lists/comListModel";
import { displayUnwatchedComs } from "../../utils/procedures";

interface CitizensComProps {
  citizen: User;
  owner: boolean;
}

export default function CitizensCom({ citizen, owner }: CitizensComProps) {
  const { t } = useTranslation();
  const [session] = useAtom(sessionAtom);
  const [citizenComList, setCitizenComList] = useState<ComListModel>(
    new ComListModel(),
  );
  const ComTile = lazy(() => import("../tiles/comTile"));

  useEffect(() => {
    const loadComList = async () => {
      const comList = await citizenComList.loadComList(
        "",
        session.user.officialId,
        [COM_TYPE.userPrivate.id, COM_TYPE.userUpdate.id],
      );
      comList && setCitizenComList(comList);
    };
    if (owner) {
      loadComList();
    }
  }, [citizen.officialId]);

  useEffect(() => {
    if (
      owner &&
      citizenComList.getItems().length > 0 &&
      citizenComList.getItems()[0].destination === citizen.officialId
    ) {
      displayUnwatchedComs(COM_GENERAL_DESTINATION, citizenComList.getItems());
      displayUnwatchedComs(citizen.officialId, citizenComList.getItems());
    }
  }, [citizenComList]);

  return (
    <DashTile
      title={t("pages.citizen.privateCom")}
      children={
        <section className="w-full flex flex-col items-center rounded gap-4">
          <div className="w-full flex flex-col-reverse gap-2 items-center">
            {citizenComList.getItems().length > 0 ? (
              citizenComList.getItems().map((com, i) => {
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
