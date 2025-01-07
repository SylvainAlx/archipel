/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from "jotai";
import DashTile from "../../components/dashTile";
import H1 from "../../components/titles/h1";
import { statsAtom, tagListAtom } from "../../settings/store";
import { useEffect } from "react";
import { getAllNationTags } from "../../api/nation/nationAPI";
import { useTranslation } from "react-i18next";
import { StringProps } from "../../types/typProp";
import HashTag from "../../components/tags/hashTag";
import CountUp from "react-countup";
import { getCounts } from "../../api/stats/statsAPI";

export default function Stats({ text }: StringProps) {
  const [stats] = useAtom(statsAtom);
  const [tagList] = useAtom(tagListAtom);
  const { t } = useTranslation();

  useEffect(() => {
    if (
      stats.counts.nations === 0 ||
      stats.counts.places === 0 ||
      stats.counts.citizens === 0 ||
      stats.counts.coms === 0
    ) {
      getCounts();
    }
    if (tagList.length === 0) {
      getAllNationTags();
    }
  }, []);

  return (
    <section className="w-full flex gap-1 flex-wrap items-center flex-col ">
      <H1 text={text} />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <DashTile
          title={t("pages.explore.stats.nations")}
          children={<CountUp className="text-3xl" end={stats.counts.nations} />}
        />
        <DashTile
          title={t("pages.explore.stats.citizens")}
          children={
            <CountUp className="text-3xl" end={stats.counts.citizens} />
          }
        />
        <DashTile
          title={t("pages.explore.stats.locations")}
          children={<CountUp className="text-3xl" end={stats.counts.places} />}
        />
        <DashTile
          title={t("pages.explore.stats.coms")}
          children={<CountUp className="text-3xl" end={stats.counts.coms} />}
        />
        <DashTile
          title={t("pages.explore.stats.tags")}
          children={
            <div className="w-full px-2 flex flex-wrap items-center justify-center gap-1">
              {tagList != undefined &&
                tagList.map((tag, i) => {
                  return (
                    <HashTag
                      label={tag.label}
                      occurrence={tag.occurrence}
                      key={i}
                    />
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
