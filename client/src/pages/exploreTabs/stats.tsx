/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from "jotai";
import DashTile from "../../components/dashTile";
import H1 from "../../components/titles/h1";
import { statsAtom, tagListAtom } from "../../settings/store";
import { useEffect } from "react";
import H3 from "../../components/titles/h3";
import { getNationsCount } from "../../api/nation/nationAPI";
import { getPlacesCount } from "../../api/place/placeAPI";
import { getCitizensCount } from "../../api/user/userAPI";
import { useTranslation } from "react-i18next";
import { StringProps } from "../../types/typProp";
import { getAllTags } from "../../api/tag/tagAPI";
import i18n from "../../i18n/i18n";
import HashTag from "../../components/tags/hashTag";

export default function Stats({ text }: StringProps) {
  const [stats] = useAtom(statsAtom);
  const [tagList] = useAtom(tagListAtom);
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
    if (stats.counts.coms === 0) {
      // getComsCount
    }
    if (tagList.length === 0) {
      getAllTags();
    }
  }, []);

  return (
    <section className="w-full flex gap-1 flex-wrap items-center flex-col ">
      <H1 text={text} />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <DashTile
          title={t("pages.explore.stats.nations")}
          children={<H3 text={stats.counts.nations.toString()} />}
        />
        <DashTile
          title={t("pages.explore.stats.locations")}
          children={<H3 text={stats.counts.places.toString()} />}
        />
        <DashTile
          title={t("pages.explore.stats.citizens")}
          children={<H3 text={stats.counts.citizens.toString()} />}
        />
        <DashTile
          title={t("pages.explore.stats.coms")}
          children={<H3 text={stats.counts.coms.toString()} />}
        />
        <DashTile
          title={t("pages.explore.stats.tags")}
          children={
            <div>
              {tagList.map((tag, i) => {
                return (
                  <div key={i}>
                    {i18n.language === "fr" && <HashTag label={tag.label.fr} />}
                    {i18n.language === "en" && <HashTag label={tag.label.en} />}
                  </div>
                );
              })}
            </div>
          }
          className="w-full"
        />
      </div>
    </section>
  );
}