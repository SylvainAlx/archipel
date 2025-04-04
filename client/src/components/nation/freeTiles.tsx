import { lazy, Suspense } from "react";
import DashTile from "../ui/dashTile";
import TileContainer from "../ui/tileContainer";
import { SelectedNationProps } from "../../types/typProp";
import Button from "../ui/buttons/button";
import { GiSBrick } from "react-icons/gi";
import { FaCoins } from "react-icons/fa";
import TileSkeleton from "../ui/loading/skeletons/tileSkeleton";
import useFreeTiles from "../../hooks/componentsHooks/nation/useFreeTiles";

export default function FreeTiles({
  selectedNation,
  owner,
}: SelectedNationProps) {
  const { cost, quota, handleClick, nationTileList, t } =
    useFreeTiles(selectedNation);
  const FreeTile = lazy(() => import("../ui/tiles/freeTile"));

  return (
    <TileContainer>
      <DashTile title={t("pages.nation.freeTiles.title")}>
        <section className="flex flex-col items-center justify-center gap-2">
          {owner && (
            <div className="flex items-center gap-4">
              {quota && cost && nationTileList.getItems().length >= quota && (
                <span className="flex items-center gap-1 text-gold">
                  <FaCoins />
                  {cost}
                </span>
              )}
              <Button
                text={t("components.buttons.createFreeTile")}
                click={handleClick}
              >
                <GiSBrick />
              </Button>
            </div>
          )}
          <div className="flex flex-wrap items-stretch justify-center gap-4">
            {nationTileList.getItems().length > 0 ? (
              nationTileList.getItems().map((tile, i) => {
                return (
                  <Suspense key={i} fallback={<TileSkeleton />}>
                    <FreeTile
                      key={i}
                      tile={tile}
                      owner={owner ? owner : false}
                    />
                  </Suspense>
                );
              })
            ) : (
              <em>{t("pages.nation.freeTiles.noFreeTiles")}</em>
            )}
          </div>
        </section>
      </DashTile>
    </TileContainer>
  );
}
