/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from "jotai";
import { newPlaceAtom } from "../../settings/store";
import Button from "../buttons/button";
import { ChangeEvent, FormEvent } from "react";
import Form from "../form/form";
import Input from "../form/input";
import { emptyPlace } from "../../types/typPlace";
import { createNewPlace } from "../../api/place/placeAPI";
import Select from "../form/select";
import { useTranslation } from "react-i18next";
import { PLACE_TYPE } from "../../settings/consts";

export default function NewPlaceModal() {
  const [newPlace, setNewPlace] = useAtom(newPlaceAtom);
  const { t } = useTranslation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    createNewPlace(newPlace);
    setNewPlace(emptyPlace);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewPlace({ ...newPlace, [name]: value });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setNewPlace({ ...newPlace, type: value });
  };

  return (
    <div>
      <h2 className="text-2xl text-center p-4">
        {t("components.modals.newPlaceModal.title")}
      </h2>
      <Form
        submit={handleSubmit}
        children={
          <>
            <Input
              required
              type="text"
              name="name"
              value={newPlace.name}
              onChange={handleChange}
              placeholder={t("components.modals.newPlaceModal.placeName")}
            />
            <Select
              options={Object.values(PLACE_TYPE)}
              onChange={handleSelectChange}
            />
            <Button
              type="submit"
              text={t("components.buttons.validate")}
              widthFull={true}
            />
            <Button
              type="button"
              text={t("components.buttons.cancel")}
              click={() => setNewPlace(emptyPlace)}
              widthFull={true}
            />
          </>
        }
      />
    </div>
  );
}
