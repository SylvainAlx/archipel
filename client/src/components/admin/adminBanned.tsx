import { Suspense, useState } from "react";
import TileContainer from "../tileContainer";
import H2 from "../titles/h2";
import BarreLoader from "../loading/barreLoader";
import IndexTag from "../tags/indexTag";
import CitizenTile from "../tiles/citizenTile";
import Button from "../buttons/button";
import { useAtom } from "jotai";
import { bannedCitizensAtom } from "../../settings/store";
import { useTranslation } from "react-i18next";

export default function AdminBanned() {
  const { t } = useTranslation();
  const [bannedUsers] = useAtom(bannedCitizensAtom);
  const [displayedCitizens, setDisplayedCitizens] = useState(10);
  return (
    <TileContainer
      children={
        <>
          <H2 text="Bannis" />
          <section>
            {bannedUsers != undefined &&
              bannedUsers.length > 0 &&
              bannedUsers.map((citizen, i) => {
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
            {displayedCitizens < bannedUsers.length && (
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
