import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import { editTileAtom, tileListAtomV2 } from "../../../settings/store";
import { useEffect, useMemo, useState } from "react";
import { TileListModel } from "../../../models/lists/tileListModel";
import { getValueFromParam } from "../../../services/paramService";
import { NationModel } from "../../../models/nationModel";
import { emptyTile } from "../../../types/typTile";
import { TileModel } from "../../../models/tileModel";
import { errorMessage } from "../../../utils/toasts";

export default function useFreeTiles(selectedNation: NationModel) {
  const { t } = useTranslation();
  const [tileList] = useAtom(tileListAtomV2);
  const [nationTileList, setNationTileList] = useState<TileListModel>(
    new TileListModel(),
  );
  const [, setEditTile] = useAtom(editTileAtom);
  const quota = Number(getValueFromParam("quotas", "tiles"));
  const cost = Number(getValueFromParam("costs", "tile"));

  const filteredTileList = useMemo(() => {
    const list = tileList
      .getItems()
      .filter((tile) => tile.nationOfficialId === selectedNation.officialId);
    return new TileListModel(list);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tileList]);

  useEffect(() => {
    const loadTileList = async () => {
      await nationTileList.loadTiles(selectedNation.officialId);
    };
    if (selectedNation.officialId != "") {
      loadTileList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNation]);

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

  return {
    cost,
    quota,
    handleClick,
    nationTileList,
    t,
  };
}
