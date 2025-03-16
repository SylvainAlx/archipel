import { lazy, Suspense } from "react";
import TileContainer from "../ui/tileContainer";
import H2 from "../ui/titles/h2";
import IndexTag from "../ui/tags/indexTag";
import Button from "../ui/buttons/button";
import { useTranslation } from "react-i18next";
import TileSkeleton from "../ui/loading/skeletons/tileSkeleton";
import useAdminBanned from "../../hooks/componentsHooks/useAdminBanned";

export default function AdminBanned() {
  const { t } = useTranslation();
  const { displayedCitizens, setDisplayedCitizens, bannedUsers } =
    useAdminBanned();

  const CitizenTile = lazy(() => import("../ui/tiles/citizenTile"));

  return (
    <TileContainer>
      <>
        <H2 text="Bannis" />
        <section>
          {bannedUsers != undefined &&
            bannedUsers.getItems().length > 0 &&
            bannedUsers.getItems().map((citizen, i) => {
              if (i < displayedCitizens) {
                return (
                  <Suspense key={i} fallback={<TileSkeleton />}>
                    <div className="min-w-[300px] w-full relative transition-all duration-300 animate-fadeIn">
                      <CitizenTile citizen={citizen} />
                      <IndexTag text={i} />
                    </div>
                  </Suspense>
                );
              }
            })}
          {displayedCitizens < bannedUsers.getItems().length && (
            <Button
              click={() => setDisplayedCitizens(displayedCitizens + 5)}
              text={t("components.buttons.showMore")}
            />
          )}
        </section>
      </>
    </TileContainer>
  );
}
