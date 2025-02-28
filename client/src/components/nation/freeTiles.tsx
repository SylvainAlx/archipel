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
import { FaCoins } from "react-icons/fa";
import { errorMessage } from "../../utils/toasts";
import { TileListModel } from "../../models/lists/tileListModel";
import { TileModel } from "../../models/tileModel";
import TileSkeleton from "../loading/skeletons/tileSkeleton";
import { getValueFromParam } from "../../services/paramService";

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
  const quota = Number(getValueFromParam("quotas", "tiles"));
  const cost = Number(getValueFromParam("costs", "tile"));
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
      (quota && selectedNation.data.roleplay.treasury >= quota) ||
      nationTileList.getItems().length < quota
    ) {
      const newTile = { ...emptyTile };
      newTile.isFree = nationTileList.getItems().length < quota;
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
                  {quota &&
                    cost &&
                    nationTileList.getItems().length >= quota && (
                      <span className="flex items-center gap-1 text-gold">
                        <FaCoins />
                        {cost}
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
