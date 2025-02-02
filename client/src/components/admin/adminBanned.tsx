import { lazy, Suspense, useEffect, useState } from "react";
import TileContainer from "../tileContainer";
import H2 from "../titles/h2";
import BarreLoader from "../loading/barreLoader";
import IndexTag from "../tags/indexTag";
import Button from "../buttons/button";
import { useAtom } from "jotai";
import { bannedCitizensAtom } from "../../settings/store";
import { useTranslation } from "react-i18next";

export default function AdminBanned() {
  const { t } = useTranslation();
  const [bannedUsers] = useAtom(bannedCitizensAtom);
  const [displayedCitizens, setDisplayedCitizens] = useState(10);
  const CitizenTile = lazy(() => import("../tiles/citizenTile"));
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
                    <Suspense key={i} fallback={<BarreLoader />}>
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
