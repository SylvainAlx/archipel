import { useTranslation } from "react-i18next";
import DashTile from "../dashTile";
import { useAtom } from "jotai";
import { comFetchedListAtom, sessionAtom } from "../../settings/store";
import { getComs } from "../../api/communication/comAPI";
import { lazy, Suspense, useEffect } from "react";
import BarreLoader from "../loading/barreLoader";
import { COM_TYPE } from "../../settings/consts";
import { User } from "../../types/typUser";

interface CitizensComProps {
  citizen: User;
}

export default function CitizensCom({ citizen }: CitizensComProps) {
  const { t } = useTranslation();
  const [citizenComList, setCitizenComList] = useAtom(comFetchedListAtom);
  const [session] = useAtom(sessionAtom);
  const ComTile = lazy(() => import("../tiles/comTile"));

  useEffect(() => {
    setCitizenComList([]);
    if (session.user.officialId != "") {
      getComs("", citizen.officialId, [
        COM_TYPE.userPrivate.id,
        COM_TYPE.userUpdate.id,
      ]);
    }
  }, [citizen, session.user.officialId]);

  return (
    <DashTile
      title={t("pages.nation.coms.title")}
      children={
        <section className="w-full flex flex-col items-center rounded gap-4">
          <div className="w-full flex flex-col-reverse gap-2 items-center">
            {citizenComList.length > 0 ? (
              citizenComList.map((com, i) => {
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
