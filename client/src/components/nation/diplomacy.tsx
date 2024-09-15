import { useTranslation } from "react-i18next";
import TileContainer from "../tileContainer";
import DashTile from "../dashTile";
import { SelectedNationProps } from "../../types/typProp";
import { useAtom } from "jotai";
import { relationListAtom } from "../../settings/store";
import { lazy, Suspense, useEffect } from "react";
import { getRelations } from "../../api/relation/relationAPI";
import BarreLoader from "../loading/barreLoader";
import Button from "../buttons/button";
import { FaHandshakeSimple } from "react-icons/fa6";

export default function Diplomacy({
  selectedNation,
  owner,
}: SelectedNationProps) {
  const { t } = useTranslation();
  const [relationList] = useAtom(relationListAtom);
  const RelationTile = lazy(() => import("../tiles/relationTile"));

  useEffect(() => {
    getRelations(selectedNation.officialId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TileContainer
      children={
        <DashTile
          title={t("pages.nation.simulation.diplomacy")}
          children={
            <div className="w-full flex flex-col-reverse gap-2 items-center">
              {relationList.length > 0 ? (
                relationList.map((relation, i) => {
                  return (
                    <Suspense key={i} fallback={<BarreLoader />}>
                      <RelationTile
                        relation={relation}
                        selectedNation={selectedNation}
                      />
                    </Suspense>
                  );
                })
              ) : (
                <em className="text-center">
                  {t("pages.nation.simulation.noRelations")}
                </em>
              )}
              {owner && (
                <Button
                  text={t("components.buttons.createRelation")}
                  children={<FaHandshakeSimple />}
                />
              )}
            </div>
          }
        />
      }
    />
  );
}
