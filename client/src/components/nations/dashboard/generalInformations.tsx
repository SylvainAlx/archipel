/* eslint-disable react-hooks/exhaustive-deps */
import { GiBlackFlag } from "react-icons/gi";
import { regimeOptions } from "../../../settings/consts";
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
import { nationPlacesListAtom } from "../../../settings/store";
import { LabelId } from "../../../types/typNation";
import { useAtom } from "jotai";
import { getCapitalName } from "../../../utils/functions";
import RegimeTag from "../../tags/regimeTag";
import IdTag from "../../tags/idTag";
import CapitalTag from "../../tags/capitalTag";

export default function GeneralInformations({
  selectedNation,
  owner,
}: SelectedNationProps) {
  const [placesList, setPlacesList] = useState<LabelId[]>([]);
  const [nationPlaceList] = useAtom(nationPlacesListAtom);
  const [capital, setCapital] = useState<string>("aucune capitale");

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
        setCapital("aucune capitale");
      }
    }
  }, [nationPlaceList, selectedNation]);

  return (
    <TileContainer
      children={
        <>
          <H2 text="Identité de la nation" />
          <DashTile
            title="Informations générales"
            className="w-full min-w-[300px]"
            children={
              <>
                <div className="p-4 flex flex-col gap-2 items-center">
                  <div className="relative">
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
                  <div className="relative">
                    <H3 text={selectedNation.name} />
                    {owner && (
                      <EditIcon param={selectedNation.name} path="name" />
                    )}
                  </div>
                  <div className="relative">
                    <em className="text-xl">
                      {selectedNation.data.general.motto
                        ? selectedNation.data.general.motto
                        : "Pas de devise"}
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
                    <IdTag label={selectedNation.name + selectedNation._id} />
                    {selectedNation.role === "admin" && (
                      <Tag text="admin" bgColor="bg-success" />
                    )}
                    {regimeOptions.map((regime, i) => {
                      if (regime.id === selectedNation.data.general.regime) {
                        return (
                          <span key={i} className="relative">
                            <RegimeTag
                              label={regime.label}
                              type={regime.type}
                              bgColor={regime.color}
                            />
                            {owner && (
                              <EditIcon
                                param={regimeOptions}
                                path="data.general.regime"
                                indice={regime.id}
                              />
                            )}
                          </span>
                        );
                      }
                    })}
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
            title="Lien externe"
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
