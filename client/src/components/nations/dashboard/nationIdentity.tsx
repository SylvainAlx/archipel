/* eslint-disable react-hooks/exhaustive-deps */
import { GiBlackFlag } from "react-icons/gi";
import DashTile from "../../dashTile";
import TileContainer from "../../tileContainer";
import H3 from "../../titles/h3";
import { FaDiscord, FaInstagram, FaLink, FaWikipediaW } from "react-icons/fa6";
import Tag from "../../tag";
import { SelectedNationProps } from "../../../types/typProp";
import EditIcon from "../../editIcon";
import ExternalLink from "../../externalLink";
import H2 from "../../titles/h2";
import { useEffect, useState } from "react";
import {
  imageAtom,
  langAtom,
  myStore,
  nationPlacesListAtom,
} from "../../../settings/store";
import { LabelId } from "../../../types/typNation";
import { useAtom } from "jotai";
import { createTagRegime, getCapitalName } from "../../../utils/functions";
import RegimeTag from "../../tags/regimeTag";
import IdTag from "../../tags/idTag";
import CapitalTag from "../../tags/capitalTag";
import { useTranslation } from "react-i18next";
import { regimeList } from "../../../settings/consts";

export default function NationIdentity({
  selectedNation,
  owner,
}: SelectedNationProps) {
  const [lang] = useAtom(langAtom);
  const { t } = useTranslation();
  const [regime, setRegime] = useState({
    id: 0,
    label: "",
    type: 0,
    bgColor: "bg-regime_0",
  });
  const [placesList, setPlacesList] = useState<LabelId[]>([]);
  const [nationPlaceList] = useAtom(nationPlacesListAtom);
  const [capital, setCapital] = useState<string>(
    t("pages.dashboard.tabs.dashboard.nationIdentity.noCapital"),
  );

  useEffect(() => {
    setRegime(createTagRegime(selectedNation.data.general.regime));
  }, [lang]);

  useEffect(() => {
    const updatedPlaces: LabelId[] = [];
    nationPlaceList.forEach((place) => {
      if (place._id) {
        const newPlace: LabelId = { id: place._id, label: place.name };
        updatedPlaces.push(newPlace);
      }
    });
    setPlacesList(updatedPlaces);

    if (selectedNation.data.roleplay.capital != "") {
      const capitalName = getCapitalName(
        nationPlaceList,
        selectedNation.data.roleplay.capital,
      );
      if (capitalName != "") {
        setCapital(capitalName);
      } else {
        setCapital(
          t("pages.dashboard.tabs.dashboard.nationIdentity.noCapital"),
        );
      }
    }
  }, [nationPlaceList, selectedNation]);

  const handleClick = () => {
    myStore.set(imageAtom, selectedNation.data.url.flag);
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
                  <div
                    onClick={handleClick}
                    className="relative cursor-zoom-in"
                  >
                    <div
                      className={`w-[200px] h-[140px] bg-complementary flex flex-col items-center justify-center overflow-hidden rounded`}
                    >
                      {selectedNation.data.url.flag ? (
                        <img
                          src={selectedNation.data.url.flag}
                          alt={`flag of ${selectedNation.name}`}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="text-[3.1rem]">
                          <GiBlackFlag />
                        </div>
                      )}
                    </div>
                    {owner && (
                      <EditIcon
                        param={selectedNation.data.url.flag}
                        path="data.url.flag"
                      />
                    )}
                  </div>
                  <div className="relative flex flex-col items-center">
                    <H3 text={selectedNation.name} />
                    {owner && (
                      <EditIcon param={selectedNation.name} path="name" />
                    )}
                    <IdTag label={selectedNation._id} />
                  </div>
                  <div className="relative">
                    <em className="text-xl">
                      {selectedNation.data.general.motto
                        ? `" ${selectedNation.data.general.motto} "`
                        : t(
                            "pages.dashboard.tabs.dashboard.nationIdentity.noMotto",
                          )}
                    </em>
                    {owner && (
                      <EditIcon
                        param={
                          selectedNation.data.general.motto
                            ? selectedNation.data.general.motto
                            : ""
                        }
                        path="data.general.motto"
                      />
                    )}
                  </div>

                  <div className="flex gap-2 flex-wrap items-center justify-center">
                    {selectedNation.role === "admin" && (
                      <Tag text="admin" bgColor="bg-danger" />
                    )}
                    <span className="relative">
                      <RegimeTag
                        label={regime.label}
                        type={regime.type}
                        bgColor={regime.bgColor}
                      />
                      {owner && (
                        <EditIcon
                          param={regimeList}
                          path="data.general.regime"
                          indice={regime.id}
                        />
                      )}
                    </span>
                  </div>
                  {capital != "" && (
                    <div className="relative">
                      <CapitalTag label={capital} />
                      {owner && (
                        <EditIcon
                          param={placesList}
                          path="data.roleplay.capital"
                        />
                      )}
                    </div>
                  )}
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
                  <span className="relative">
                    <ExternalLink
                      url={selectedNation.data.url.website}
                      children={<FaLink />}
                    />
                    {owner && (
                      <EditIcon
                        param={selectedNation.data.url.website}
                        path="data.url.website"
                      />
                    )}
                  </span>
                  <span className="relative">
                    <ExternalLink
                      url={selectedNation.data.url.instagram}
                      children={<FaInstagram />}
                    />
                    {owner && (
                      <EditIcon
                        param={selectedNation.data.url.instagram}
                        path="data.url.instagram"
                      />
                    )}
                  </span>
                  <span className="relative">
                    <ExternalLink
                      url={selectedNation.data.url.wiki}
                      children={<FaWikipediaW />}
                    />
                    {owner && (
                      <EditIcon
                        param={selectedNation.data.url.wiki}
                        path="data.url.wiki"
                      />
                    )}
                  </span>
                  <span className="relative">
                    <ExternalLink
                      url={selectedNation.data.url.discord}
                      children={<FaDiscord />}
                    />
                    {owner && (
                      <EditIcon
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
