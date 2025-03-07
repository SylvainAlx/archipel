import { useAtom } from "jotai";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  confirmBox,
  editTileAtom,
  myStore,
  tileListAtomV2,
} from "../../settings/store";
import { TileModel } from "../../models/tileModel";
import { getValueFromParam } from "../../services/paramService";
import { useTranslation } from "react-i18next";

export function useTileFormModal() {
  const { t } = useTranslation();
  const [isNewTile, setIsNewTile] = useState(false);
  const [tile, setTile] = useAtom(editTileAtom);
  const [localTile, setLocalTile] = useState(new TileModel(tile));
  const [tileList] = useAtom(tileListAtomV2);
  const cost = Number(getValueFromParam("costs", "tile"));

  useEffect(() => {
    if (
      localTile.nationOfficialId != "" &&
      localTile.title === "" &&
      !isNewTile
    ) {
      setIsNewTile(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localTile]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setLocalTile((prevTile) => {
      const updatedTile = new TileModel(prevTile);
      updatedTile.updateFields({ [name]: value });
      return updatedTile;
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // if (localTile.isFree === undefined) {
    //   localTile.isFree = true;
    // }
    if (isNewTile) {
      myStore.set(confirmBox, {
        text: t("components.modals.confirmModal.createTile"),
        actionToDo: async () => {
          const tileInserted = await localTile.baseInsert(localTile);
          tileList.addToTileListAtom([tileInserted]);
        },
      });
    } else {
      myStore.set(confirmBox, {
        text: t("components.modals.confirmModal.updateTile"),
        actionToDo: async () => {
          const tileUpdated = await localTile.baseUpdate(localTile);
          tileList.addToTileListAtom([tileUpdated]);
        },
      });
    }
    setTile(new TileModel());
  };

  return {
    handleChange,
    handleSubmit,
    localTile,
    isNewTile,
    tile,
    setTile,
    cost,
    t,
  };
}
