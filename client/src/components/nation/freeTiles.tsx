import { lazy, Suspense, useEffect } from "react";
import DashTile from "../dashTile";
import TileContainer from "../tileContainer";
import { getNationTiles } from "../../api/tile/tileAPI";
import { SelectedNationProps } from "../../types/typProp";
import { useAtom } from "jotai";
import {
  editTileAtom,
  nationTileListAtom,
  session,
} from "../../settings/store";
import Button from "../buttons/button";
import { emptyTile } from "../../types/typTile";
import { GiSBrick } from "react-icons/gi";
import { useTranslation } from "react-i18next";
import BarreLoader from "../loading/barreLoader";
import { COSTS, QUOTAS } from "../../settings/consts";
import { FaCoins } from "react-icons/fa";
import { errorMessage } from "../../utils/toasts";

export default function FreeTiles({
  selectedNation,
  owner,
}: SelectedNationProps) {
  const { t } = useTranslation();
  const [nationTileList] = useAtom(nationTileListAtom);
  const [, setEditTile] = useAtom(editTileAtom);

  const FreeTile = lazy(() => import("../tiles/freeTile"));

  useEffect(() => {
    if (selectedNation.officialId != "") {
      getNationTiles(selectedNation.officialId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNation.officialId]);

  const handleClick = () => {
    if (
      session.user.credits >= COSTS.TILE ||
      nationTileList.length < QUOTAS.TILES
    ) {
      const newTile = { ...emptyTile };
      newTile.nationOfficialId = selectedNation.officialId;
      setEditTile(newTile);
    } else {
      errorMessage(t("toasts.user.creditsNotReady"));
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
                  {nationTileList.length >= QUOTAS.TILES && (
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
                {nationTileList.length > 0 ? (
                  nationTileList.map((tile, i) => {
                    return (
                      <Suspense key={i} fallback={<BarreLoader />}>
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
