import { useTranslation } from "react-i18next";
import DashTile from "../ui/dashTile";
import { lazy, Suspense } from "react";
import TileSkeleton from "../ui/loading/skeletons/tileSkeleton";
import { UserModel } from "../../models/userModel";
import useCitizenComs from "../../hooks/componentsHooks/citizen/useCitizenComs";
import { ComModel } from "../../models/comModel";

const ComTile = lazy(() => import("../ui/tiles/comTile"));

interface CitizensComProps {
  citizen: UserModel;
}

export default function CitizenComs({ citizen }: CitizensComProps) {
  const { t } = useTranslation();
  const { citizenComList } = useCitizenComs(citizen);

  return (
    <DashTile title={t("pages.citizen.privateCom")}>
      <section className="w-full flex flex-col items-center rounded gap-4">
        <div className="w-full flex flex-col-reverse gap-2 items-center">
          {citizenComList.getItems().length > 0 ? (
            citizenComList.getItems().map((com: ComModel, i: number) => (
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
