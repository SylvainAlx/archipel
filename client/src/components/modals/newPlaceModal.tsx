/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from "jotai";
import { newPlaceAtom } from "../../settings/store";
import Button from "../button";
import { ChangeEvent, FormEvent } from "react";
import Form from "../form/form";
import Input from "../form/input";
import TextArea from "../form/textArea";
import Tag from "../tag";
import { FaArrowUpRightDots, FaTrophy } from "react-icons/fa6";
import { emptyPlace } from "../../types/typPlace";
import { createNewPlace } from "../../utils/api";

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

  return (
    <div>
      <h2 className="text-2xl text-center p-4">NOUVELLE VILLE</h2>
      <div className="w-full px-2 flex items-center justify-center gap-4">
        <Tag
          text={newPlace.points.toString()}
          bgColor="bg-info"
          children={<FaTrophy />}
        />
        <Tag
          text={"niveau " + newPlace.level.toString()}
          bgColor="bg-info"
          children={<FaArrowUpRightDots />}
        />
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
            <TextArea
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
