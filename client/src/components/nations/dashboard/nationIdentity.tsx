/* eslint-disable react-hooks/exhaustive-deps */
import { GiBlackFlag } from "react-icons/gi";
import DashTile from "../../dashTile";
import TileContainer from "../../tileContainer";
import H3 from "../../titles/h3";
import { FaDiscord, FaInstagram, FaLink, FaWikipediaW } from "react-icons/fa6";
import { SelectedNationProps } from "../../../types/typProp";
import EditIcon from "../../editIcon";
import ExternalLink from "../../externalLink";
import H2 from "../../titles/h2";
import { Suspense, lazy, useEffect, useState } from "react";
import {
  imageAtom,
  myStore,
  nationPlacesListAtom,
} from "../../../settings/store";
import { LabelId } from "../../../types/typNation";
import { useAtom } from "jotai";
import RegimeTag from "../../tags/regimeTag";
import IdTag from "../../tags/idTag";
import CapitalTag from "../../tags/capitalTag";
import { useTranslation } from "react-i18next";
import { regimeList } from "../../../settings/consts";
import Spinner from "../../loading/spinner";
import RoleTag from "../../tags/roleTag";

export default function NationIdentity({
  selectedNation,
  owner,
}: SelectedNationProps) {
  const { t } = useTranslation();
  const [placesList, setPlacesList] = useState<LabelId[]>([]);
  const [nationPlaceList] = useAtom(nationPlacesListAtom);

  const LazyImage = lazy(() => import("../../lazy/lazyImage"));

  useEffect(() => {
    const updatedPlaces: LabelId[] = [];
    nationPlaceList.forEach((place) => {
      if (place._id && place.type === 2) {
        const newPlace: LabelId = { id: place.officialId, label: place.name };
        updatedPlaces.push(newPlace);
      }
    });
    setPlacesList(updatedPlaces);
  }, [nationPlaceList]);

  const handleClick = (image: string) => {
    myStore.set(imageAtom, image);
  };

  return (
    <TileContainer
      children={
        <>
          <H2 text={t("pages.dashboard.tabs.dashboard.nationIdentity.title")} />
          <DashTile
            title={t(
              "pages.dashboard.tabs.dashboard.nationIdentity.generalInformations",
            )}
            className="w-full min-w-[300px] flex-grow"
            children={
              <>
                <div className="p-4 flex flex-col gap-2 items-center">
                  <div className="flex flex-col lg:flex-row justify-center items-center lg:flex-wrap gap-6">
                    <div
                      onClick={() => handleClick(selectedNation.data.url.flag)}
                      className="relative cursor-zoom-in"
                    >
                      <div
                        className={`w-[200px] h-[140px] bg-complementary flex items-center justify-center gap-2`}
                      >
                        {selectedNation.data.url.flag ? (
                          <Suspense fallback={<Spinner />}>
                            <LazyImage
                              src={selectedNation.data.url.flag}
                              alt={`flag of ${selectedNation.name}`}
                              className="object-cover w-full h-full rounded"
                              hover={t("components.hoverInfos.flag")}
                            />
                          </Suspense>
                        ) : (
                          <div className="text-[3.1rem]">
                            <GiBlackFlag />
                          </div>
                        )}
                        {owner && (
                          <EditIcon
                            target="nation"
                            param={selectedNation.data.url.flag}
                            path="data.url.flag"
                          />
                        )}
                      </div>
                    </div>
                    <div
                      onClick={() =>
                        handleClick(selectedNation.data.url.coatOfArms)
                      }
                      className="relative cursor-zoom-in"
                    >
                      <div
                        className={`w-[140px] h-[140px] bg-complementary flex items-center justify-center gap-2`}
                      >
                        {selectedNation.data.url.coatOfArms ? (
                          <Suspense fallback={<Spinner />}>
                            <LazyImage
                              src={selectedNation.data.url.coatOfArms}
                              alt={`coatOfArms of ${selectedNation.name}`}
                              className="object-contain w-full h-full"
                              hover={t("components.hoverInfos.coatOfArms")}
                            />
                          </Suspense>
                        ) : (
                          <div className="text-[3.1rem]">
                            <GiBlackFlag />
                          </div>
                        )}
                        {owner && (
                          <EditIcon
                            target="nation"
                            param={selectedNation.data.url.coatOfArms}
                            path="data.url.coatOfArms"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="relative flex items-center gap-2">
                    <H3 text={selectedNation.name} />
                    {owner && (
                      <EditIcon
                        target="nation"
                        param={selectedNation.name}
                        path="name"
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <em className="text-xl">
                      {selectedNation.data.general.motto
                        ? `" ${selectedNation.data.general.motto} "`
                        : t(
                            "pages.dashboard.tabs.dashboard.nationIdentity.noMotto",
                          )}
                    </em>
                    {owner && (
                      <EditIcon
                        target="nation"
                        param={
                          selectedNation.data.general.motto
                            ? selectedNation.data.general.motto
                            : ""
                        }
                        path="data.general.motto"
                      />
                    )}
                  </div>

                  <div className="flex gap-1 flex-wrap items-center justify-center">
                    <IdTag label={selectedNation.officialId} />
                    {selectedNation.role === "admin" && (
                      <RoleTag label="admin" />
                    )}
                    <span className="flex items-center gap-2">
                      {selectedNation.data != undefined && (
                        <RegimeTag selectedNation={selectedNation} />
                      )}
                      {owner && (
                        <EditIcon
                          target="nation"
                          param={regimeList}
                          path="data.general.regime"
                          indice={selectedNation.data.general.regime}
                        />
                      )}
                    </span>
                    {selectedNation.data.roleplay.capital != "" && (
                      <div className="flex items-center gap-2">
                        <CapitalTag selectedNation={selectedNation} />
                        {owner && (
                          <EditIcon
                            target="nation"
                            param={placesList}
                            path="data.roleplay.capital"
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </>
            }
          />

          <DashTile
            title={t(
              "pages.dashboard.tabs.dashboard.nationIdentity.externalLinks",
            )}
            children={
              <>
                <div className=" flex items-center justify-center gap-6">
                  <span className="flex items-center gap-2">
                    <ExternalLink
                      url={selectedNation.data.url.website}
                      children={<FaLink />}
                      hover={t("components.hoverInfos.links.website")}
                    />
                    {owner && (
                      <EditIcon
                        target="nation"
                        param={selectedNation.data.url.website}
                        path="data.url.website"
                      />
                    )}
                  </span>
                  <span className="flex items-center gap-2">
                    <ExternalLink
                      url={selectedNation.data.url.instagram}
                      children={<FaInstagram />}
                      hover={t("components.hoverInfos.links.instagram")}
                    />
                    {owner && (
                      <EditIcon
                        target="nation"
                        param={selectedNation.data.url.instagram}
                        path="data.url.instagram"
                      />
                    )}
                  </span>
                  <span className="flex items-center gap-2">
                    <ExternalLink
                      url={selectedNation.data.url.wiki}
                      children={<FaWikipediaW />}
                      hover={t("components.hoverInfos.links.wiki")}
                    />
                    {owner && (
                      <EditIcon
                        target="nation"
                        param={selectedNation.data.url.wiki}
                        path="data.url.wiki"
                      />
                    )}
                  </span>
                  <span className="flex items-center gap-2">
                    <ExternalLink
                      url={selectedNation.data.url.discord}
                      children={<FaDiscord />}
                      hover={t("components.hoverInfos.links.discord")}
                    />
                    {owner && (
                      <EditIcon
                        target="nation"
                        param={selectedNation.data.url.discord}
                        path="data.url.discord"
                      />
                    )}
                  </span>
                </div>
              </>
            }
          />
        </>
      }
    />
  );
}
