import { useTranslation } from "react-i18next";
import DashTile from "../ui/dashTile";
import { SelectedNationProps } from "../../types/typProp";
import { lazy, Suspense } from "react";
import Button from "../ui/buttons/button";
import { FaComment } from "react-icons/fa";
import TileSkeleton from "../ui/loading/skeletons/tileSkeleton";
import useNationComs from "../../hooks/componentsHooks/nation/useNationComs";

export default function NationComs({
  selectedNation,
  owner,
}: SelectedNationProps) {
  const { t } = useTranslation();
  const { coms, handleClick } = useNationComs(selectedNation);
  const ComTile = lazy(() => import("../ui/tiles/comTile"));

  return (
    <DashTile title={t("pages.nation.coms.title")}>
      <section className="w-full flex flex-col items-center rounded gap-4">
        {owner && (
          <div className="flex gap-1 justify-center items-center flex-wrap">
            <Button
              text={t("components.buttons.createCom")}
              click={handleClick}
              // disabled={!allowPost}
            >
              <FaComment />
            </Button>
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
    </DashTile>
  );
}
