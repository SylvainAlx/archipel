/* eslint-disable react-hooks/exhaustive-deps */
import Button from "../../components/buttons/button";
import { useState, lazy, Suspense } from "react";
import H1 from "../../components/titles/h1";
import IndexTag from "../../components/tags/indexTag";
import BarreLoader from "../../components/loading/barreLoader";
import { StringProps } from "../../types/typProp";
import { User } from "../../types/typUser";
import CitizenSearchBar from "../../components/searchBars/citizenSearchBar";
import { useTranslation } from "react-i18next";
import { ELEMENTS_DISPLAYED_LIMIT } from "../../settings/consts";

export default function CitizenList({ text }: StringProps) {
  const [citizensList, setCitizensList] = useState<User[]>([]);
  const [displayedCitizens, setDisplayedCitizens] = useState(
    ELEMENTS_DISPLAYED_LIMIT.citizens,
  );
  const { t } = useTranslation();
  const CitizenTile = lazy(() => import("../../components/tiles/citizenTile"));

  return (
    <>
      <H1 text={text} />
      <CitizenSearchBar
        type="citizen"
        list={citizensList}
        setList={setCitizensList}
      />
      <section className="w-full flex gap-1 flex-wrap items-center flex-col ">
        {citizensList != undefined &&
          citizensList.length > 0 &&
          citizensList.map((citizen, i) => {
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
      </section>
      {displayedCitizens < citizensList.length && (
        <Button
          click={() =>
            setDisplayedCitizens(
              displayedCitizens + ELEMENTS_DISPLAYED_LIMIT.citizens,
            )
          }
          text={t("components.buttons.showMore")}
        />
      )}
    </>
  );
}
