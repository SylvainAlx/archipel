/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { LabelId, Nation } from "../../types/typNation";
import RegimeTag from "../tags/regimeTag";
import IdTag from "../tags/idTag";
import CapitalTag from "../tags/capitalTag";
import { useTranslation } from "react-i18next";
import TileContainer from "../tileContainer";
import DashTile from "../dashTile";
import EditIcon from "../editIcon";
import TagList from "./tagList";
import CurrencyTag from "../tags/currencyTag";
import NationalDayTag from "../tags/nationalDayTag";
import { getLabelIdArrayFromNationPlaceList } from "../../utils/functions";
import PopulationTag from "../tags/populationTag";
import PlaceTag from "../tags/placeTag";
import MDEditor from "@uiw/react-md-editor";
import { regimeList } from "../../settings/lists";
import TreasuryTag from "../tags/treasuryTag";
import BigFlag from "./bigFlag";
import CoatOfArms from "./coatOfArms";
import NationStateTag from "../tags/nationStateTag";

interface NationIdentityProps {
  selectedNation: Nation;
  owner: boolean;
  updatePath: (path: string, value: string) => void;
}

export default function NationIdentity({
  selectedNation,
  owner,
  updatePath,
}: NationIdentityProps) {
  const { t } = useTranslation();
  const [placesList, setPlacesList] = useState<LabelId[]>([]);

  useEffect(() => {
    const list = getLabelIdArrayFromNationPlaceList();
    setPlacesList(list);
  }, []);

  return (
    <TileContainer
      children={
        <section className="flex flex-col items-center gap-4">
          <DashTile
            title={t("pages.nation.nationIdentity.title")}
            className="w-full min-w-[300px] flex-grow"
            children={
              <>
                <div className="w-full p-4 flex flex-col gap-2 items-center">
                  <div className="flex flex-row justify-center items-start flex-wrap gap-6">
                    <BigFlag
                      nation={selectedNation}
                      owner={owner ? owner : false}
                      updatePath={updatePath}
                    />
                    {(selectedNation.data.url.coatOfArms || owner) && (
                      <CoatOfArms
                        nation={selectedNation}
                        owner={owner ? owner : false}
                        updatePath={updatePath}
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <em className="text-xl">
                      {selectedNation.data.general.motto
                        ? `" ${selectedNation.data.general.motto} "`
                        : t("pages.nation.nationIdentity.noMotto")}
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
                        action={updatePath}
                      />
                    )}
                  </div>

                  <div className="flex gap-1 flex-wrap items-center justify-center">
                    <IdTag label={selectedNation.officialId} />
                    <TreasuryTag
                      label={selectedNation.data.roleplay.treasury}
                    />
                    {selectedNation.data.general.isNationState && (
                      <NationStateTag />
                    )}
                    <div className="flex items-center gap-2">
                      {selectedNation.data != undefined && (
                        <RegimeTag selectedNation={selectedNation} />
                      )}
                      {owner && (
                        <EditIcon
                          target="nation"
                          param={regimeList}
                          path="data.general.regime"
                          indice={selectedNation.data.general.regime}
                          action={updatePath}
                        />
                      )}
                    </div>
                    <PopulationTag
                      label={selectedNation.data.roleplay.citizens}
                    />
                    <PlaceTag label={selectedNation.data.roleplay.places} />
                    <div className="flex items-center gap-2">
                      {selectedNation.data.general.nationalDay != undefined && (
                        <NationalDayTag
                          label={selectedNation.data.general.nationalDay}
                        />
                      )}
                      {owner && (
                        <EditIcon
                          target="nation"
                          param={
                            selectedNation.data.general.nationalDay
                              ? selectedNation.data.general.nationalDay
                              : ""
                          }
                          path="data.general.nationalDay"
                          action={updatePath}
                        />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedNation.data.general.currency != undefined && (
                        <CurrencyTag
                          label={selectedNation.data.general.currency}
                        />
                      )}
                      {owner && (
                        <EditIcon
                          target="nation"
                          param={
                            selectedNation.data.general.currency
                              ? selectedNation.data.general.currency
                              : ""
                          }
                          path="data.general.currency"
                          action={updatePath}
                        />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <CapitalTag selectedNation={selectedNation} />
                      {owner && selectedNation.data.roleplay.capital != "" && (
                        <EditIcon
                          target="nation"
                          param={placesList}
                          path="data.roleplay.capital"
                          action={updatePath}
                        />
                      )}
                    </div>
                    <TagList
                      nation={selectedNation}
                      owner={owner}
                      isTile={false}
                    />
                  </div>

                  <div className="w-full mt-4 justify-center flex gap-2">
                    {selectedNation.data.general.description ? (
                      <MDEditor.Markdown
                        className="bg-transparent text-light text-justify mde-markdown"
                        source={selectedNation.data.general.description}
                      />
                    ) : (
                      <em className="text-center">
                        {t("pages.nation.nationIdentity.noDescription")}
                      </em>
                    )}

                    {owner && (
                      <EditIcon
                        target="nation"
                        param={
                          selectedNation.data.general.description
                            ? selectedNation.data.general.description
                            : ""
                        }
                        path="data.general.description"
                        action={updatePath}
                      />
                    )}
                  </div>
                </div>
              </>
            }
          />
        </section>
      }
    />
  );
}
