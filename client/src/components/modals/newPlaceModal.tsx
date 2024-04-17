/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from "jotai";
import { newPlaceAtom } from "../../settings/store";
import Button from "../buttons/button";
import { ChangeEvent, FormEvent } from "react";
import Form from "../form/form";
import Input from "../form/input";
import TextArea from "../form/textArea";
import { emptyPlace } from "../../types/typPlace";
import { createNewPlace } from "../../api/place/placeAPI";
import Select from "../form/select";
import { placesTypeList } from "../../settings/consts";
import PointTag from "../tags/pointTag";

export default function NewPlaceModal() {
  const [newPlace, setNewPlace] = useAtom(newPlaceAtom);

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
      <h2 className="text-2xl text-center p-4">NOUVEAU LIEU</h2>
      <div className="w-full px-2 flex items-center justify-center gap-4">
        <PointTag label={newPlace.points} />
      </div>
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
              placeholder="NOM DU LIEU"
            />
            <Select options={placesTypeList} onChange={handleSelectChange} />
            <TextArea
              required
              onChange={handleChange}
              name="description"
              placeholder="DESCRIPTION"
              value={newPlace.description}
              maxLength={500}
              rows={10}
            />
            <Button type="submit" path="" text="VALIDER" />
            <Button
              type="button"
              path=""
              text="ANNULER"
              click={() => setNewPlace(emptyPlace)}
            />
          </>
        }
      />
    </div>
  );
}
