/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from "jotai";
import DashTile from "../../components/dashTile";
import H1 from "../../components/titles/h1";
import { statsAtom } from "../../settings/store";
import { useEffect } from "react";
import H3 from "../../components/titles/h3";
import { getNationsCount } from "../../api/nation/nationAPI";
import { getPlacesCount } from "../../api/place/placeAPI";
import { getCitizensCount } from "../../api/user/userAPI";
import { useTranslation } from "react-i18next";
import { StringProps } from "../../types/typProp";

export default function Stats({ text }: StringProps) {
  const [stats] = useAtom(statsAtom);
  const { t } = useTranslation();

  useEffect(() => {
    if (stats.counts.nations === 0) {
      getNationsCount();
    }
    if (stats.counts.places === 0) {
      getPlacesCount();
    }
    if (stats.counts.citizens === 0) {
      getCitizensCount();
    }
  }, []);

  return (
    <section className="w-full flex gap-1 flex-wrap items-center flex-col ">
      <H1 text={text} />
      <div className="flex flex-wrap items-center justify-center gap-2">
        <DashTile
          title={t("pages.explore.stats.nations")}
          children={<H3 text={stats.counts.nations.toString()} />}
          className="max-w-[100px]"
        />
        <DashTile
          title={t("pages.explore.stats.locations")}
          children={<H3 text={stats.counts.places.toString()} />}
          className="max-w-[100px]"
        />
        <DashTile
          title={t("pages.explore.stats.citizens")}
          children={<H3 text={stats.counts.citizens.toString()} />}
          className="max-w-[100px]"
        />
      </div>
    </section>
  );
}
