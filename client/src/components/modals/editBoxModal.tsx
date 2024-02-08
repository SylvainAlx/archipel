/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAtom } from "jotai";
import { confirmBox, editbox, nationAtom } from "../../settings/store";
import Button from "../button";
import Input from "../form/input";
import Select from "../form/select";
import { ChangeEvent, FormEvent } from "react";

export default function EditBoxModal() {
  const [editBox, setEditBox] = useAtom(editbox);
  const [nation] = useAtom(nationAtom);
  const [, setConfirm] = useAtom(confirmBox);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const updatedNation: any = { ...nation };
    const parties: string[] = editBox.path.split(".");

    let objetCourant: any = updatedNation;
    for (let i = 0; i < parties.length - 1; i++) {
      if (typeof objetCourant === "object" && objetCourant !== null) {
        objetCourant = objetCourant[parties[i]];
      } else {
        console.error(`Chemin incorrect. Propriété ${parties[i]} non trouvée.`);
        break;
      }
    }
    const dernierePartie: string = parties[parties.length - 1];
    if (typeof objetCourant === "object" && objetCourant !== null) {
      objetCourant[dernierePartie] = editBox.new;
    }

    setConfirm({
      action: "updateNation",
      text: "Mettre à jour votre nation ?",
      result: "",
      target: "",
      payload: updatedNation,
    });

    setEditBox({ original: -1, new: -1, path: "" });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditBox({ ...editBox, new: e.target.value });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setEditBox({ ...editBox, new: Number(e.target.value) });
  };

  return (
    <>
      <h2 className="text-2xl text-center p-4">
        MODIFICATION D'UNE INFORMATION
      </h2>
      <b
        className={`w-full text-center text-2xl ${editBox.original.toString().length > 30 && "overflow-x-scroll"} ${editBox.original.toString() === "" && "text-danger"}`}
      >
        {typeof editBox.original != "object" && editBox.original.toString()}
        {editBox.original.toString() === "" && "aucune valeur"}
        {typeof editBox.original == "object" &&
          editBox.indice &&
          editBox.original[editBox.indice].label}
      </b>
      <form
        className="flex flex-col gap-2 items-center"
        onSubmit={handleSubmit}
      >
        {typeof editBox.original == "string" && (
          <Input
            required
            type="text"
            placeholder="NOUVELLE VALEUR"
            onChange={handleInputChange}
            value={editBox.new.toString()}
            name=""
          />
        )}
        {typeof editBox.original == "number" && (
          <Input
            required
            type="number"
            placeholder="NOUVELLE VALEUR"
            onChange={handleInputChange}
            value={editBox.new.toString()}
            name=""
          />
        )}
        {typeof editBox.original == "object" && (
          <Select
            required
            options={editBox.original}
            onChange={handleSelectChange}
          />
        )}

        <Button
          text="ANNULER"
          path=""
          click={() => setEditBox({ original: -1, new: -1, path: "" })}
        />
        <Button type="submit" text="VALIDER" path="" />
      </form>
    </>
  );
}
