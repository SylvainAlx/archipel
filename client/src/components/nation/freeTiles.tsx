import { useEffect } from "react";
import DashTile from "../dashTile";
import TileContainer from "../tileContainer";
import FreeTile from "../tiles/freeTile";
import { getNationTile } from "../../api/tile/tileAPI";
import { SelectedNationProps } from "../../types/typProp";
import { useAtom } from "jotai";
import { editTileAtom, tileListAtom } from "../../settings/store";
import Button from "../buttons/button";
import { emptyTile } from "../../types/typTile";
import { GiSBrick } from "react-icons/gi";
import { useTranslation } from "react-i18next";

export default function FreeTiles({
  selectedNation,
  owner,
}: SelectedNationProps) {
  const { t } = useTranslation();
  const [tileList] = useAtom(tileListAtom);
  const [, setEditTile] = useAtom(editTileAtom);

  useEffect(() => {
    if (selectedNation.officialId != "") {
      getNationTile(selectedNation.officialId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNation.officialId]);

  const handleClick = () => {
    const newTile = { ...emptyTile };
    newTile.nationOfficialId = selectedNation.officialId;
    setEditTile(newTile);
  };

  return (
    <TileContainer
      children={
        <DashTile
          title={t("pages.nation.simulation.freeTiles")}
          children={
            <section className="flex flex-col items-center justify-center gap-2">
              {owner && (
                <Button
                  text="ajouter une tuile"
                  children={<GiSBrick />}
                  click={handleClick}
                />
              )}
              <div className="flex flex-wrap items-stretch justify-center gap-4">
                {tileList.map((tile, i) => {
                  return (
                    <FreeTile
                      key={i}
                      tile={tile}
                      owner={owner ? owner : false}
                    />
                  );
                })}
              </div>
            </section>
          }
        />
      }
    />
  );
}
