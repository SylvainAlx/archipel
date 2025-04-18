import DashTile from "../../components/ui/dashTile";
import H1 from "../../components/ui/titles/h1";
import { useTranslation } from "react-i18next";
import { StringProps } from "../../types/typProp";
import HashTag from "../../components/ui/tags/hashTag";
import CountUp from "react-countup";
import RegimeChart from "../../components/ui/charts/regimeChart";
import LanguageChart from "../../components/ui/charts/languageChart";
import PlaceTypeChart from "../../components/ui/charts/placeTypeChart";
import TileContainer from "../../components/ui/tileContainer";
import { useStats } from "../../hooks/exploreTabsHooks/useStats";

export default function Stats({ text }: StringProps) {
  const { nationsList, citizensList, placesList, tagList } = useStats();
  const { t } = useTranslation();

  return (
    <section className="w-full flex gap-1 flex-wrap items-center flex-col ">
      <H1 text={text} />
      <section className="flex flex-wrap justify-center gap-2">
        <TileContainer>
          <>
            <DashTile title={t("pages.explore.stats.nations")}>
              <div className="w-full flex flex-col items-center">
                <CountUp
                  className="text-3xl"
                  end={nationsList.getItems().length}
                />
                <RegimeChart nations={nationsList} />
              </div>
            </DashTile>
            <div className="flex flex-col items-center">
              <strong>{t("pages.explore.stats.tags")}</strong>
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
            </div>
          </>
        </TileContainer>
        <TileContainer>
          <>
            <DashTile title={t("pages.explore.stats.citizens")}>
              <div className="w-full flex flex-col items-center">
                <CountUp
                  className="text-3xl"
                  end={citizensList.getItems().length}
                />
                <LanguageChart userList={citizensList} />
              </div>
            </DashTile>
          </>
        </TileContainer>
        <TileContainer>
          <>
            <DashTile title={t("pages.explore.stats.locations")}>
              <div className="w-full flex flex-col items-center">
                <CountUp
                  className="text-3xl"
                  end={placesList.getItems().length}
                />
                <PlaceTypeChart placeList={placesList} />
              </div>
            </DashTile>
          </>
        </TileContainer>
      </section>
    </section>
  );
}
