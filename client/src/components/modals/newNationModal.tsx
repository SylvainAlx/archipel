/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from "jotai";
import { newNationAtom } from "../../settings/store";
import Button from "../buttons/button";
import { ChangeEvent, FormEvent } from "react";
import Form from "../form/form";
import Input from "../form/input";
// import Select from "../form/select";
import { emptyNewNationPayload } from "../../types/typNation";
import { createNation } from "../../api/nation/nationAPI";
import Select from "../form/select";
import { regimeList } from "../../settings/consts";

export default function NewNationModal() {
  const [newNation, setNewNation] = useAtom(newNationAtom);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    createNation(newNation);
    setNewNation(emptyNewNationPayload);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewNation({ ...newNation, [name]: value });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setNewNation({ ...newNation, regime: value });
  };

  return (
    <div>
      <h2 className="text-2xl text-center p-4">NOUVELLE NATION</h2>
      <Form
        submit={handleSubmit}
        children={
          <>
            <Input
              required
              type="text"
              name="name"
              value={newNation.name}
              onChange={handleChange}
              placeholder="Nom de la nation"
              maxLength={60}
            />
            <Input
              onChange={handleChange}
              type="text"
              name="motto"
              placeholder="Devise"
              value={newNation.motto}
            />
            <Select onChange={handleSelectChange} options={regimeList} />
            <Button type="submit" text="VALIDER" />
            <Button
              type="button"
              text="ANNULER"
              click={() => setNewNation(emptyNewNationPayload)}
            />
          </>
        }
      />
    </div>
  );
}
