import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Form from "../form/form";
import Input from "../form/input";
import Button from "../buttons/button";
import {
  confirmBox,
  editTileAtom,
  myStore,
  tileListAtomV2,
} from "../../settings/store";
import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import TextArea from "../form/textArea";
import { FaCoins } from "react-icons/fa";
import { COSTS } from "../../settings/consts";
import RequiredStar from "../form/requiredStar";
import { TileModel } from "../../models/tileModel";

export default function TileFormModal() {
  const [isNewTile, setIsNewTile] = useState(false);
  const [tile, setTile] = useAtom(editTileAtom);
  const [localTile, setLocalTile] = useState(new TileModel(tile));
  const [tileList] = useAtom(tileListAtomV2);
  const { t } = useTranslation();

  useEffect(() => {
    if (
      localTile.nationOfficialId != "" &&
      localTile.title === "" &&
      !isNewTile
    ) {
      setIsNewTile(true);
    }
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
        action: "",
        text: t("components.modals.confirmModal.createTile"),
        result: "",
        actionToDo: async () => {
          const tileInserted = await localTile.baseInsert(localTile);
          tileList.addToTileListAtom([tileInserted]);
        },
      });
    } else {
      myStore.set(confirmBox, {
        action: "",
        text: t("components.modals.confirmModal.updateTile"),
        result: "",
        actionToDo: async () => {
          const tileUpdated = await localTile.baseUpdate(localTile);
          tileList.addToTileListAtom([tileUpdated]);
        },
      });
    }
    setTile(new TileModel());
  };
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl text-center p-4">
        {isNewTile
          ? t("components.modals.tileModal.new")
          : t("components.modals.tileModal.update")}
      </h2>
      {!localTile.isFree && (
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
              value={localTile.title}
              onChange={handleChange}
              placeholder={t("components.modals.tileModal.inputTitle")}
              maxLength={60}
            />
            <TextArea
              name="description"
              placeholder={t("components.modals.tileModal.inputDescription")}
              value={
                localTile.description != undefined ? localTile.description : ""
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
              value={localTile.value}
            />
            <RequiredStar />
            <Button
              type="submit"
              text={t("components.buttons.validate")}
              widthFull={true}
              disabled={
                localTile.title === tile.title &&
                localTile.value === tile.value &&
                localTile.description === tile.description
              }
            />
            <Button
              type="button"
              text={t("components.buttons.cancel")}
              click={() => setTile(new TileModel())}
              widthFull={true}
            />
          </>
        }
      />
    </div>
  );
}
