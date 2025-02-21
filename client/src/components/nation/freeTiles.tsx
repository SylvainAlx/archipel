import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import DashTile from "../dashTile";
import TileContainer from "../tileContainer";
import { SelectedNationProps } from "../../types/typProp";
import { useAtom } from "jotai";
import { editTileAtom, tileListAtomV2 } from "../../settings/store";
import Button from "../buttons/button";
import { emptyTile } from "../../types/typTile";
import { GiSBrick } from "react-icons/gi";
import { useTranslation } from "react-i18next";
import { COSTS, QUOTAS } from "../../settings/consts";
import { FaCoins } from "react-icons/fa";
import { errorMessage } from "../../utils/toasts";
import { TileListModel } from "../../models/lists/tileListModel";
import { TileModel } from "../../models/tileModel";
import TileSkeleton from "../loading/skeletons/tileSkeleton";

export default function FreeTiles({
  selectedNation,
  owner,
}: SelectedNationProps) {
  const { t } = useTranslation();
  const [tileList] = useAtom(tileListAtomV2);
  const [nationTileList, setNationTileList] = useState<TileListModel>(
    new TileListModel(),
  );
  const [, setEditTile] = useAtom(editTileAtom);

  const FreeTile = lazy(() => import("../tiles/freeTile"));

  const filteredTileList = useMemo(() => {
    const list = tileList
      .getItems()
      .filter((tile) => tile.nationOfficialId === selectedNation.officialId);
    return new TileListModel(list);
  }, [tileList]);

  useEffect(() => {
    const loadTileList = async () => {
      await nationTileList.loadTiles(selectedNation.officialId);
    };
    if (selectedNation.officialId != "") {
      loadTileList();
    }
  }, []);

  useEffect(() => {
    setNationTileList(filteredTileList);
  }, [filteredTileList]);

  const handleClick = () => {
    if (
      selectedNation.data.roleplay.treasury >= COSTS.TILE ||
      nationTileList.getItems().length < QUOTAS.TILES
    ) {
      const newTile = { ...emptyTile };
      newTile.isFree = nationTileList.getItems().length < QUOTAS.TILES;
      newTile.nationOfficialId = selectedNation.officialId;
      setEditTile(new TileModel(newTile));
    } else {
      errorMessage(t("toasts.errors.notEnoughCredits"));
    }
  };

  return (
    <TileContainer
      children={
        <DashTile
          title={t("pages.nation.freeTiles.title")}
          children={
            <section className="flex flex-col items-center justify-center gap-2">
              {owner && (
                <div className="flex items-center gap-4">
                  {nationTileList.getItems().length >= QUOTAS.TILES && (
                    <span className="flex items-center gap-1 text-gold">
                      <FaCoins />
                      {COSTS.TILE}
                    </span>
                  )}
                  <Button
                    text={t("components.buttons.createFreeTile")}
                    children={<GiSBrick />}
                    click={handleClick}
                  />
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
          }
        />
      }
    />
  );
}
