import { useTranslation } from "react-i18next";
import TileContainer from "../ui/tileContainer";
import DashTile from "../ui/dashTile";
import { SelectedNationProps } from "../../types/typProp";
import { lazy, Suspense } from "react";
import Button from "../ui/buttons/button";
import { FaHandshakeSimple } from "react-icons/fa6";
import TileSkeleton from "../ui/loading/skeletons/tileSkeleton";
import useDiplomacy from "../../hooks/componentsHooks/nation/useDiplomacy";

export default function Diplomacy({
  selectedNation,
  owner,
}: SelectedNationProps) {
  const { t } = useTranslation();
  const { nationRelationList, session, handleClick } =
    useDiplomacy(selectedNation);
  const RelationTile = lazy(() => import("../ui/tiles/relationTile"));

  return (
    <TileContainer>
      <DashTile title={t("pages.nation.relations.title")}>
        <>
          <div className="w-full flex flex-reverse flex-wrap gap-2 items-center">
            {nationRelationList.getItems().length > 0 ? (
              nationRelationList.getItems().map((relation, i) => {
                if (
                  relation.nations.length > 1 &&
                  (relation.nations[1].accepted ||
                    relation.nations[1].AmbassadorId ===
                      session.user.officialId)
                ) {
                  return (
                    <Suspense key={i} fallback={<TileSkeleton />}>
                      <RelationTile relation={relation} />
                    </Suspense>
                  );
                } else {
                  return (
                    <em key={i} className="text-center">
                      {t("components.buttons.createRelation")}
                    </em>
                  );
                }
              })
            ) : (
              <em className="text-center">
                {t("pages.nation.relations.noRelations")}
              </em>
            )}
          </div>
          {!owner && session.user.citizenship.nationOwner && (
            <Button
              text={t("components.buttons.createRelation")}
              click={handleClick}
            >
              <FaHandshakeSimple />
            </Button>
          )}
        </>
      </DashTile>
    </TileContainer>
  );
}
