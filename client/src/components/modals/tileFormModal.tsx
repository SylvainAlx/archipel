import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Form from "../form/form";
import Input from "../form/input";
import { emptyTile } from "../../types/typTile";
import Button from "../buttons/button";
import { confirmBox, editTileAtom, myStore } from "../../settings/store";
import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import TextArea from "../form/textArea";
import { FaCoins } from "react-icons/fa";
import { COSTS } from "../../settings/consts";
import RequiredStar from "../form/requiredStar";

export default function TileFormModal() {
  const [isNewTile, setIsNewTile] = useState(false);
  const [updatedTile, setUpdatedTile] = useState(emptyTile);
  const [tile, setTile] = useAtom(editTileAtom);
  const { t } = useTranslation();

  useEffect(() => {
    if (tile.nationOfficialId != "") {
      const tileToUpdated = structuredClone(tile);
      if (tileToUpdated.isFree === undefined) {
        tileToUpdated.isFree = true;
      }
      setUpdatedTile(tileToUpdated);
      if (tile.title === "") {
        setIsNewTile(true);
      }
    }
  }, [tile]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setUpdatedTile({ ...updatedTile, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isNewTile) {
      updatedTile.nationOfficialId = tile.nationOfficialId;
      myStore.set(confirmBox, {
        action: "createTile",
        text: t("components.modals.confirmModal.createTile"),
        payload: updatedTile,
        result: "",
      });
      setTile(emptyTile);
    } else {
      myStore.set(confirmBox, {
        action: "updateTile",
        text: t("components.modals.confirmModal.updateTile"),
        payload: updatedTile,
        result: "",
      });
      setTile(emptyTile);
    }
  };
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl text-center p-4">
        {isNewTile
          ? t("components.modals.tileModal.new")
          : t("components.modals.tileModal.update")}
      </h2>
      {!updatedTile.isFree && (
        <span className="flex items-center gap-1 text-gold">
          <FaCoins />
          {COSTS.TILE}
        </span>
      )}
      <Form
        submit={handleSubmit}
        children={
          <>
            <Input
              required
              type="text"
              name="title"
              value={updatedTile.title}
              onChange={handleChange}
              placeholder={t("components.modals.tileModal.inputTitle")}
              maxLength={60}
            />
            <TextArea
              name="description"
              placeholder={t("components.modals.tileModal.inputDescription")}
              value={
                updatedTile.description != undefined
                  ? updatedTile.description
                  : ""
              }
              onChange={handleChange}
              maxLength={200}
            />
            <Input
              required
              onChange={handleChange}
              type="text"
              name="value"
              placeholder={t("components.modals.tileModal.inputValue")}
              value={updatedTile.value}
            />
            <RequiredStar />
            <Button
              type="submit"
              text={t("components.buttons.validate")}
              widthFull={true}
              disabled={
                updatedTile.title === tile.title &&
                updatedTile.value === tile.value &&
                updatedTile.description === tile.description
              }
            />
            <Button
              type="button"
              text={t("components.buttons.cancel")}
              click={() => setTile(emptyTile)}
              widthFull={true}
            />
          </>
        }
      />
    </div>
  );
}
