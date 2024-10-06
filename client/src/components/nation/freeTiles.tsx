import { useEffect } from "react";
import DashTile from "../dashTile";
import TileContainer from "../tileContainer";
import FreeTile from "../tiles/freeTile";
import { getNationTile } from "../../api/tile/tileAPI";
import { SelectedNationProps } from "../../types/typProp";
import { useAtom } from "jotai";
import { tileListAtom } from "../../settings/store";

export default function FreeTiles({ selectedNation }: SelectedNationProps) {
  const [tileList] = useAtom(tileListAtom);

  useEffect(() => {
    if (selectedNation.officialId != "") {
      getNationTile(selectedNation.officialId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNation.officialId]);

  useEffect(() => {
    console.log(tileList);
  }, [tileList]);

  return (
    <TileContainer
      children={
        <DashTile
          title="Tuiles libres"
          children={
            <div className="flex flex-wrap items-stretch justify-center gap-4">
              {tileList.map((tile, i) => {
                return (
                  <FreeTile
                    key={i}
                    nationOfficialId={tile.nationOfficialId}
                    title={tile.title}
                    description={tile.description ? tile.description : ""}
                    value={tile.value}
                    updatedAt={tile.updatedAt}
                  />
                );
              })}
            </div>
          }
        />
      }
    />
  );
}
