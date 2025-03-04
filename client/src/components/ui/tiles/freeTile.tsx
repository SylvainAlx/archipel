import { useEffect, useState } from "react";
import { Tile } from "../../../types/typTile";
import i18n from "../../../i18n/i18n";
import CrossButton from "../buttons/crossButton";
import { useAtom } from "jotai";
import { confirmBox, editTileAtom, myStore } from "../../../settings/store";
import { MdOutlineUpdate } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { TileModel } from "../../../models/tileModel";
import EditButton from "../buttons/editButton";

export interface FreeTileProps {
  tile: Tile;
  owner: boolean;
}

export default function FreeTile({ tile, owner }: FreeTileProps) {
  const { title, description, value, updatedAt } = tile;
  const { t } = useTranslation();
  const [stringDate, setStringDate] = useState("");
  const [, setUpdatedTile] = useAtom(editTileAtom);

  useEffect(() => {
    setStringDate(new Date(updatedAt).toLocaleString(i18n.language));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedAt]);

  const handleEdit = (tile: Tile) => {
    setUpdatedTile(new TileModel(tile));
  };

  const handleDelete = () => {
    myStore.set(confirmBox, {
      text: t("components.modals.confirmModal.deleteTile"),
      actionToDo: () => {
        const newTile = new TileModel(tile);
        newTile.baseDelete();
      },
    });
  };

  return (
    <div
      className={`relative p-4 pt-6 rounded flex flex-col flex-grow items-center justify-between gap-2 bg-complementary shadow-xl`}
    >
      <h4 className="bold text-xl text-center text-secondary">{title}</h4>
      <em className="text-[13px] text-center text-secondary2">{description}</em>
      <p className="text-2xl">{value}</p>
      <em className="text-[12px] text-secondary flex items-center gap-1">
        <MdOutlineUpdate />
        <span>{stringDate}</span>
      </em>
      {owner && <CrossButton small={true} click={handleDelete} />}
      {owner && <EditButton onClick={() => handleEdit(tile)} />}
    </div>
  );
}
