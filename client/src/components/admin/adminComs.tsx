import { Suspense } from "react";
import TileContainer from "../ui/tileContainer";
import AdminComTile from "../ui/tiles/adminComTile";
import H2 from "../ui/titles/h2";
import IndexTag from "../ui/tags/indexTag";
import Button from "../ui/buttons/button";
import { useTranslation } from "react-i18next";
import TileSkeleton from "../ui/loading/skeletons/tileSkeleton";
import useAdminComs from "../../hooks/componentsHooks/admin/useAdminComs";
import { ComModel } from "../../models/comModel";

export default function AdminComs() {
  const { adminComList, displayedComs, setDisplayedComs } = useAdminComs();
  const { t } = useTranslation();

  return (
    <TileContainer>
      <>
        <H2 text="Communications" />
        <section className="w-full flex gap-1 flex-wrap items-center flex-col-reverse">
          {adminComList != undefined &&
            adminComList.getItems().length > 0 &&
            adminComList.getItems().map((com: ComModel, i: number) => {
              if (i < displayedComs) {
                return (
                  <Suspense key={i} fallback={<TileSkeleton />}>
                    <div className="min-w-[300px] w-full relative transition-all duration-300 animate-fadeIn">
                      <AdminComTile com={com} />
                      <IndexTag text={i} />
                    </div>
                  </Suspense>
                );
              }
            })}
          {displayedComs < adminComList.getItems().length && (
            <Button
              click={() => setDisplayedComs(displayedComs + 5)}
              text={t("components.buttons.showMore")}
            />
          )}
        </section>
      </>
    </TileContainer>
  );
}
