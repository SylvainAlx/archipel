import { lazy, Suspense, useEffect, useState } from "react";
import TileContainer from "../ui/tileContainer";
import H2 from "../ui/titles/h2";
import IndexTag from "../ui/tags/indexTag";
import Button from "../ui/buttons/button";
import { useAtom } from "jotai";
import { bannedCitizensAtom } from "../../settings/store";
import { useTranslation } from "react-i18next";
import TileSkeleton from "../ui/loading/skeletons/tileSkeleton";

export default function AdminBanned() {
  const { t } = useTranslation();
  const [bannedUsers] = useAtom(bannedCitizensAtom);
  const [displayedCitizens, setDisplayedCitizens] = useState(10);
  const CitizenTile = lazy(() => import("../ui/tiles/citizenTile"));
  useEffect(() => {
    const getUsers = () => {
      bannedUsers.loadBannedCitizensAtom();
    };
    if (bannedUsers.getItems().length === 0) {
      getUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <TileContainer
      children={
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
      }
    />
  );
}
