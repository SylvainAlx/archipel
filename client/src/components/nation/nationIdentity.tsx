/* eslint-disable react-hooks/exhaustive-deps */
import { Suspense, lazy, useEffect, useState } from "react";
import { nationPlacesListAtom } from "../../settings/store";
import { LabelId } from "../../types/typNation";
import { useAtom } from "jotai";
import RegimeTag from "../tags/regimeTag";
import IdTag from "../tags/idTag";
import CapitalTag from "../tags/capitalTag";
import { useTranslation } from "react-i18next";
import { regimeList } from "../../settings/consts";
import Spinner from "../loading/spinner";
import { BsShieldShaded } from "react-icons/bs";
import { GiBlackFlag } from "react-icons/gi";
import { SelectedNationProps } from "../../types/typProp";
import TileContainer from "../tileContainer";
import DashTile from "../dashTile";
import EditIcon from "../editIcon";
import H3 from "../titles/h3";
import Upploader from "../uploader";

export default function NationIdentity({
  selectedNation,
  owner,
}: SelectedNationProps) {
  const { t } = useTranslation();
  const [placesList, setPlacesList] = useState<LabelId[]>([]);
  const [nationPlaceList] = useAtom(nationPlacesListAtom);

  const LazyImage = lazy(() => import("../lazy/lazyImage"));

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
                  <div className="w-full relative flex items-center justify-center gap-2">
                    <H3 text={selectedNation.name} />
                    {owner && (
                      <EditIcon
                        target="nation"
                        param={selectedNation.name}
                        path="name"
                      />
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row justify-center items-center sm:flex-wrap gap-6">
                    <div className="relative">
                      <div
                        className={`w-[140px] flex flex-col items-center justify-end gap-2`}
                      >
                        {selectedNation.data.url.flag ? (
                          <Suspense fallback={<Spinner />}>
                            <LazyImage
                              src={selectedNation.data.url.flag}
                              alt={`flag of ${selectedNation.name}`}
                              className="object-cover w-full h-full rounded cursor-zoom-in"
                              hover={t("components.hoverInfos.flag")}
                            />
                          </Suspense>
                        ) : (
                          <div className="text-9xl">
                            <GiBlackFlag />
                          </div>
                        )}
                        {owner && (
                          <Upploader
                            path="data.url.flag"
                            destination="nation"
                          />
                        )}
                      </div>
                    </div>
                    <div className="relative">
                      <div
                        className={`w-[140px] h-full flex flex-col items-center justify-end gap-2`}
                      >
                        {selectedNation.data.url.coatOfArms ? (
                          <Suspense fallback={<Spinner />}>
                            <LazyImage
                              src={
                                selectedNation.data.url.coatOfArms +
                                "-/preview/"
                              }
                              alt={`coatOfArms of ${selectedNation.name}`}
                              className="object-contain w-full h-full cursor-zoom-in"
                              hover={t("components.hoverInfos.coatOfArms")}
                            />
                          </Suspense>
                        ) : (
                          <div className="text-9xl">
                            <BsShieldShaded />
                          </div>
                        )}
                        {owner && (
                          <Upploader
                            path="data.url.coatOfArms"
                            destination="nation"
                          />
                        )}
                      </div>
                    </div>
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
                      />
                    )}
                  </div>

                  <div className="flex gap-1 flex-wrap items-center justify-center">
                    <IdTag label={selectedNation.officialId} />
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