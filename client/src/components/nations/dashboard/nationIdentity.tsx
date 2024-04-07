/* eslint-disable react-hooks/exhaustive-deps */
import { GiBlackFlag } from "react-icons/gi";
import DashTile from "../../dashTile";
import TileContainer from "../../tileContainer";
import H3 from "../../titles/h3";
import { FaDiscord, FaInstagram, FaLink, FaWikipediaW } from "react-icons/fa6";
import Tag from "../../tags/tag";
import { SelectedNationProps } from "../../../types/typProp";
import EditIcon from "../../editIcon";
import ExternalLink from "../../externalLink";
import H2 from "../../titles/h2";
import { useEffect, useState } from "react";
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

export default function NationIdentity({
  selectedNation,
  owner,
}: SelectedNationProps) {
  const { t } = useTranslation();
  const [placesList, setPlacesList] = useState<LabelId[]>([]);
  const [nationPlaceList] = useAtom(nationPlacesListAtom);

  useEffect(() => {
    const updatedPlaces: LabelId[] = [];
    nationPlaceList.forEach((place) => {
      if (place._id) {
        const newPlace: LabelId = { id: place._id, label: place.name };
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
                  <div className="flex justify-center items-center flex-wrap gap-6">
                    <div
                      onClick={() => handleClick(selectedNation.data.url.flag)}
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
                    <div
                      onClick={() =>
                        handleClick(selectedNation.data.url.coatOfArms)
                      }
                      className="relative cursor-zoom-in"
                    >
                      <div
                        className={`w-[140px] h-[140px] bg-complementary flex flex-col items-center justify-center overflow-hidden rounded`}
                      >
                        {selectedNation.data.url.coatOfArms ? (
                          <img
                            src={selectedNation.data.url.coatOfArms}
                            alt={`coatOfArms of ${selectedNation.name}`}
                            className="object-contain w-full h-full"
                          />
                        ) : (
                          <div className="text-[3.1rem]">
                            <GiBlackFlag />
                          </div>
                        )}
                      </div>
                      {owner && (
                        <EditIcon
                          param={selectedNation.data.url.coatOfArms}
                          path="data.url.coatOfArms"
                        />
                      )}
                    </div>
                  </div>

                  <div className="relative flex flex-col items-center">
                    <H3 text={selectedNation.name} />
                    {owner && (
                      <EditIcon param={selectedNation.name} path="name" />
                    )}
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

                  <div className="flex gap-1 flex-wrap items-center justify-center">
                    <IdTag label={selectedNation.officialId} />
                    {selectedNation.role === "admin" && (
                      <Tag text="admin" bgColor="bg-danger" />
                    )}
                    <span className="relative">
                      {selectedNation.data != undefined && (
                        <RegimeTag selectedNation={selectedNation} />
                      )}
                      {owner && (
                        <EditIcon
                          param={regimeList}
                          path="data.general.regime"
                          indice={selectedNation.data.general.regime}
                        />
                      )}
                    </span>
                    {selectedNation.data.roleplay.capital != "" && (
                      <div className="relative">
                        <CapitalTag selectedNation={selectedNation} />
                        {owner && (
                          <EditIcon
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
