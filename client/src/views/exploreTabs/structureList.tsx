import { lazy, Suspense } from "react";
import H1 from "../../components/ui/titles/h1";
import { useStructureList } from "../../hooks/exploreTabsHooks/useStructureList";
import { StringProps } from "../../types/typProp";
import TileSkeleton from "../../components/ui/loading/skeletons/tileSkeleton";
import IndexTag from "../../components/ui/tags/indexTag";
import Button from "../../components/ui/buttons/button";
import { ELEMENTS_DISPLAYED_LIMIT } from "../../settings/consts";
import { useTranslation } from "react-i18next";
import StructureSearchBar from "../../components/searchBars/structureSearchBar";

export default function StructureList({ text }: StringProps) {
  const { t } = useTranslation();
  const {
    structureList,
    setStructureList,
    displayedStructures,
    setDisplayedStructures,
  } = useStructureList();
  const StructureTile = lazy(
    () => import("../../components/ui/tiles/structureTile"),
  );
  return (
    <>
      <H1 text={text} />
      <StructureSearchBar list={structureList} setList={setStructureList} />
      <section className="w-full flex gap-1 flex-wrap items-center flex-col ">
        {structureList != undefined &&
          structureList.getItems().length > 0 &&
          structureList.getItems().map((strucure, i) => {
            if (i < displayedStructures) {
              return (
                <Suspense key={i} fallback={<TileSkeleton />}>
                  <div className="min-w-[300px] w-full relative transition-all duration-300 animate-fadeIn">
                    <StructureTile structure={strucure} />
                    <IndexTag text={i} />
                  </div>
                </Suspense>
              );
            }
          })}
      </section>
      {displayedStructures < structureList.getItems().length && (
        <Button
          click={() =>
            setDisplayedStructures(
              displayedStructures + ELEMENTS_DISPLAYED_LIMIT.structures,
            )
          }
          text={t("components.buttons.showMore")}
        />
      )}
    </>
  );
}
