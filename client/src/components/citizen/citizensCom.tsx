import { useTranslation } from "react-i18next";
import DashTile from "../dashTile";
import { useAtom } from "jotai";
import { sessionAtom } from "../../settings/store";
import { lazy, Suspense, useEffect } from "react";
import BarreLoader from "../loading/barreLoader";
import { COM_TYPE } from "../../settings/consts";
import { User } from "../../types/typUser";
import { ComListModel } from "../../models/lists/comListModel";

interface CitizensComProps {
  citizen: User;
  citizenComList: ComListModel;
}

export default function CitizensCom({
  citizen,
  citizenComList,
}: CitizensComProps) {
  const { t } = useTranslation();
  const [session] = useAtom(sessionAtom);
  const ComTile = lazy(() => import("../tiles/comTile"));

  useEffect(() => {
    if (session.user.officialId != "") {
      citizenComList.loadComList("", citizen.officialId, [
        COM_TYPE.userPrivate.id,
        COM_TYPE.userUpdate.id,
      ]);
    }
  }, [citizen, session.user.officialId]);

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
                      <ComTile com={com} owner={true} />
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
