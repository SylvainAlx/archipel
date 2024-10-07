import { useState } from "react";
import { Tile } from "../../types/typTile";
import i18n from "../../i18n/i18n";
import CrossButton from "../buttons/crossButton";
import EditButton from "../buttons/editButton";
import { useAtom } from "jotai";
import { confirmBox, editTileAtom, myStore } from "../../settings/store";

export interface FreeTileProps {
  tile: Tile;
  owner: boolean;
}

export default function FreeTile({ tile, owner }: FreeTileProps) {
  const { title, description, value, updatedAt } = tile;
  const [stringDate] = useState(
    new Date(updatedAt).toLocaleString(i18n.language),
  );
  const [, setUpdatedTile] = useAtom(editTileAtom);

  const handleEdit = (tile: Tile) => {
    setUpdatedTile(tile);
  };

  const handleDelete = (tile: Tile) => {
    myStore.set(confirmBox, {
      action: "deleteTile",
      text: "confirmer la suppression de la tuile ?",
      payload: tile._id,
      result: "",
    });
  };

  return (
    <div
      className={`relative max-w-[300px] p-4 rounded flex flex-col flex-grow items-center justify-between gap-2 bg-complementary shadow-xl`}
    >
      <h4 className="bold text-xl text-center text-secondary">{title}</h4>
      <em className="text-[13px] text-center text-secondary2">{description}</em>
      <p className="text-2xl">{value}</p>
      <em className="text-[12px] text-secondary">{stringDate}</em>
      {owner && <CrossButton small={true} click={() => handleDelete(tile)} />}
      {owner && <EditButton click={() => handleEdit(tile)} />}
    </div>
  );
}
