import { Suspense, useState } from "react";
import BarreLoader from "../loading/barreLoader";
import TileContainer from "../tileContainer";
import AdminComTile from "../tiles/adminComTile";
import H2 from "../titles/h2";
import IndexTag from "../tags/indexTag";
import Button from "../buttons/button";
import { comFetchedListAtom } from "../../settings/store";
import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";

export default function AdminComs() {
  const [adminComs] = useAtom(comFetchedListAtom);
  const [displayedComs, setDisplayedComs] = useState(10);
  const { t } = useTranslation();
  return (
    <TileContainer
      children={
        <>
          <H2 text="Communications" />
          <section className="w-full flex gap-1 flex-wrap items-center flex-col-reverse">
            {adminComs != undefined &&
              adminComs.length > 0 &&
              adminComs.map((com, i) => {
                if (i < displayedComs) {
                  return (
                    <Suspense key={i} fallback={<BarreLoader />}>
                      <div className="min-w-[300px] w-full relative transition-all duration-300 animate-fadeIn">
                        <AdminComTile com={com} />
                        <IndexTag text={i} />
                      </div>
                    </Suspense>
                  );
                }
              })}
            {displayedComs < adminComs.length && (
              <Button
                click={() => setDisplayedComs(displayedComs + 5)}
                text={t("components.buttons.showMore")}
              />
            )}
          </section>
        </>
      }
    />
  );
}
