import RegimeTag from "../ui/tags/regimeTag";
import IdTag from "../ui/tags/idTag";
import CapitalTag from "../ui/tags/capitalTag";
import { useTranslation } from "react-i18next";
import TileContainer from "../ui/tileContainer";
import DashTile from "../ui/dashTile";
import EditButton from "../ui/buttons/editButton";
import TagList from "./tagList";
import CurrencyTag from "../ui/tags/currencyTag";
import NationalDayTag from "../ui/tags/nationalDayTag";
import PopulationTag from "../ui/tags/populationTag";
import PlaceTag from "../ui/tags/placeTag";
import MDEditor from "@uiw/react-md-editor";
import { regimeList } from "../../settings/lists";
import TreasuryTag from "../ui/tags/treasuryTag";
import BigFlag from "./bigFlag";
import CoatOfArms from "./coatOfArms";
import NationStateTag from "../ui/tags/nationStateTag";
import { NationModel } from "../../models/nationModel";
import { PLACE_TYPE } from "../../settings/consts";
import { PlaceListModel } from "../../models/lists/placeListModel";

interface NationIdentityProps {
  selectedNation: NationModel;
  nationPlaceList: PlaceListModel;
  owner: boolean;
  updatePath: (path: string, value: string) => void;
}

export default function NationIdentity({
  selectedNation,
  nationPlaceList,
  owner,
  updatePath,
}: NationIdentityProps) {
  const { t } = useTranslation();

  return (
    <TileContainer>
      <section className="flex flex-col items-center gap-4">
        <DashTile
          title={t("pages.nation.nationIdentity.title")}
          className="w-full min-w-[300px] flex-grow"
        >
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
                  <EditButton
                    editBox={{
                      target: "nation",
                      original: selectedNation.data.general.motto
                        ? selectedNation.data.general.motto
                        : "",
                      new: selectedNation.data.general.motto,
                      path: "data.general.motto",
                      action: updatePath,
                    }}
                  />
                )}
              </div>

              <div className="flex gap-1 flex-wrap items-center justify-center">
                <IdTag label={selectedNation.officialId} />
                <TreasuryTag label={selectedNation.data.roleplay.treasury} />
                <NationStateTag
                  isNationState={selectedNation.data.general.isNationState}
                />
                {owner && (
                  <EditButton
                    editBox={{
                      target: "nation",
                      original: selectedNation.data.general.isNationState,
                      new: selectedNation.data.general.isNationState,
                      path: "data.general.isNationState",
                      indice: t("pages.nation.nationIdentity.nationState"),
                      action: updatePath,
                    }}
                  />
                )}
                <div className="flex items-center gap-2">
                  {selectedNation.data != undefined && (
                    <RegimeTag selectedNation={selectedNation} />
                  )}
                  {owner && (
                    <EditButton
                      editBox={{
                        target: "nation",
                        original: regimeList,
                        new: selectedNation.data.general.regime,
                        path: "data.general.regime",
                        action: updatePath,
                      }}
                    />
                  )}
                </div>
                <PopulationTag label={selectedNation.data.roleplay.citizens} />
                <PlaceTag label={selectedNation.data.roleplay.places} />
                <div className="flex items-center gap-2">
                  {selectedNation.data.general.nationalDay != undefined && (
                    <NationalDayTag
                      label={selectedNation.data.general.nationalDay}
                    />
                  )}
                  {owner && (
                    <EditButton
                      editBox={{
                        target: "nation",
                        original: selectedNation.data.general.nationalDay
                          ? selectedNation.data.general.nationalDay
                          : "",
                        new: selectedNation.data.general.nationalDay,
                        path: "data.general.nationalDay",
                        action: updatePath,
                      }}
                    />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {selectedNation.data.general.currency != undefined && (
                    <CurrencyTag label={selectedNation.data.general.currency} />
                  )}
                  {owner && (
                    <EditButton
                      editBox={{
                        target: "nation",
                        original: selectedNation.data.general.currency
                          ? selectedNation.data.general.currency
                          : "",
                        new: selectedNation.data.general.currency,
                        path: "data.general.currency",
                        action: updatePath,
                      }}
                    />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <CapitalTag selectedNation={selectedNation} />
                  {owner &&
                    nationPlaceList
                      .getCities()
                      .getLabelIdPlaceList([PLACE_TYPE.city.id]).length > 0 && (
                      <EditButton
                        editBox={{
                          target: "nation",
                          original: nationPlaceList
                            .getCities()
                            .getLabelIdPlaceList([PLACE_TYPE.city.id]),
                          new:
                            selectedNation.data.roleplay.capital != ""
                              ? selectedNation.data.roleplay.capital
                              : nationPlaceList
                                  .getCities()
                                  .getLabelIdPlaceList([PLACE_TYPE.city.id])[0]
                                  .id,
                          path: "data.roleplay.capital",
                          indice: selectedNation.data.roleplay.capital,
                          action: updatePath,
                        }}
                      />
                    )}
                </div>
                <TagList
                  nation={selectedNation}
                  owner={owner}
                  isTile={false}
                  updatePath={updatePath}
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
                  <EditButton
                    editBox={{
                      target: "nation",
                      original: selectedNation.data.general.description
                        ? selectedNation.data.general.description
                        : "",
                      new: selectedNation.data.general.description,
                      path: "data.general.description",
                      action: updatePath,
                    }}
                  />
                )}
              </div>
            </div>
          </>
        </DashTile>
      </section>
    </TileContainer>
  );
}
