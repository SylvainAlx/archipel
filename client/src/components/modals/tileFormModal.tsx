import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Form from "../form/form";
import Input from "../form/input";
import { emptyTile } from "../../types/typTile";
import Button from "../buttons/button";
import { editTileAtom } from "../../settings/store";
import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";

export default function TileFormModal() {
  const [newTile, setNewTile] = useState(false);
  const [updatedTile, setUpdatedTile] = useState(emptyTile);
  const [tile, setTile] = useAtom(editTileAtom);
  const { t } = useTranslation();

  useEffect(() => {
    if (tile.nationOfficialId != "") {
      setUpdatedTile(tile);
      if (tile.title === "") {
        setNewTile(true);
      }
    }
  }, [tile]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUpdatedTile({ ...updatedTile, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newTile) {
      console.log("nouvelle tuile pour " + updatedTile.nationOfficialId);
    } else {
      console.log("mise à jour de " + updatedTile.title);
    }
  };
  return (
    <div>
      <h2 className="text-2xl text-center p-4">
        {newTile ? "Nouvelle tuile" : "Modifier la tuile"}
      </h2>
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
              placeholder="titre"
              maxLength={60}
            />
            <Input
              onChange={handleChange}
              type="text"
              name="description"
              placeholder="description"
              value={updatedTile.description}
            />

            <Input
              required
              onChange={handleChange}
              type="text"
              name="value"
              placeholder="valeur"
              value={updatedTile.value}
            />
            <Button
              type="submit"
              text={t("components.buttons.validate")}
              widthFull={true}
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
