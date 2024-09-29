/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAtom } from "jotai";
import {
  confirmBox,
  editPlaceAtom,
  editbox,
  myStore,
  sessionAtom,
} from "../../settings/store";
import Button from "../buttons/button";
import Input from "../form/input";
import Select from "../form/select";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import TextArea from "../form/textArea";
import { IoMdCloseCircle } from "react-icons/io";
import { MdCheckCircle } from "react-icons/md";

export default function EditBoxModal() {
  const [editBox, setEditBox] = useAtom(editbox);
  const [newElement, setNewElement] = useState("");
  const [placeData] = useAtom(editPlaceAtom);
  const [, setConfirm] = useAtom(confirmBox);
  const { t } = useTranslation();

  useEffect(() => {
    if (Array.isArray(editBox.original)) {
      setEditBox({ ...editBox, new: [] });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editBox.original]);

  const handleSubmit = (e: FormEvent) => {
    const session = myStore.get(sessionAtom);
    e.preventDefault();
    const parties: string[] = editBox.path.split(".");
    let objetCourant;
    let dernierePartie;
    switch (editBox.target) {
      case "nation":
        const updatedNation: any = { ...session.nation };
        objetCourant = updatedNation;
        for (let i = 0; i < parties.length - 1; i++) {
          if (typeof objetCourant === "object" && objetCourant !== null) {
            objetCourant = objetCourant[parties[i]];
          } else {
            console.error(
              `Chemin incorrect. Propriété ${parties[i]} non trouvée.`,
            );
            break;
          }
        }
        dernierePartie = parties[parties.length - 1];
        if (typeof objetCourant === "object" && objetCourant !== null) {
          objetCourant[dernierePartie] = editBox.new;
        }
        // updatedNation.officialId = session.user.officialId;

        setConfirm({
          action: "updateNation",
          text: "Mettre à jour votre nation ?",
          result: "",
          target: "",
          payload: updatedNation,
        });
        break;
      case "place":
        const updatedPlace: any = { ...placeData.place };
        objetCourant = updatedPlace;
        for (let i = 0; i < parties.length - 1; i++) {
          if (typeof objetCourant === "object" && objetCourant !== null) {
            objetCourant = objetCourant[parties[i]];
          } else {
            console.error(
              `Chemin incorrect. Propriété ${parties[i]} non trouvée.`,
            );
            break;
          }
        }
        dernierePartie = parties[parties.length - 1];
        if (typeof objetCourant === "object" && objetCourant !== null) {
          objetCourant[dernierePartie] = editBox.new;
        }
        setConfirm({
          action: "updatePlace",
          text: "Mettre à jour votre lieu ?",
          result: "",
          target: "",
          payload: updatedPlace,
        });
        break;
      default:
        break;
    }

    setEditBox({ target: "", original: -1, new: -1, path: "" });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditBox({ ...editBox, new: e.target.value });
  };

  const handleInputChangeArray = (
    e: ChangeEvent<HTMLInputElement>,
    i: number,
  ) => {
    const newArray = editBox.original;
    if (Array.isArray(newArray)) {
      newArray[i] = e.target.value;
      setEditBox({ ...editBox, new: newArray });
    }
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditBox({ ...editBox, new: e.target.value });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (editBox.path === "data.roleplay.capital") {
      setEditBox({ ...editBox, new: e.target.value });
    } else if (editBox.path === "parentId") {
      setEditBox({ ...editBox, new: e.target.value });
    } else {
      setEditBox({ ...editBox, new: Number(e.target.value) });
    }
  };

  const handleDelete = (i: number) => {
    const newArray = editBox.original;
    if (Array.isArray(newArray)) {
      newArray.splice(i, 1);
      setEditBox({ ...editBox, new: newArray });
    }
  };

  return (
    <div className="max-w-[600px] flex flex-col justify-center items-center gap-2">
      <h2 className="text-2xl text-center p-4">
        {t("components.modals.editModal.title")}
      </h2>
      <div
        className={`w-full max-h-[300px] overflow-y-auto text-center text-lg ${editBox.original.toString() === "" && "text-danger"}`}
      >
        {typeof editBox.original != "object" && editBox.original.toString()}
        {editBox.original.toString() === "" &&
          t("components.modals.editModal.noValue")}
        {/* {typeof editBox.original == "object" &&
          editBox.indice &&
          editBox.original[editBox.indice].label} */}
      </div>
      <form
        className="w-full flex flex-col gap-2 items-center"
        onSubmit={handleSubmit}
      >
        {typeof editBox.original == "string" && (
          <TextArea
            required
            maxLength={2000}
            placeholder={t("components.modals.editModal.newValue")}
            onChange={handleTextChange}
            value={editBox.new.toString()}
            name=""
          />
        )}
        {typeof editBox.original == "number" && (
          <Input
            required
            type="number"
            placeholder={t("components.modals.editModal.newValue")}
            onChange={handleInputChange}
            value={editBox.new.toString()}
            name=""
          />
        )}
        {Array.isArray(editBox.original) &&
        typeof editBox.original[0] == "string" ? (
          <div className="flex flex-wrap justify-center items-center gap-2">
            {editBox.original.map((_element, i) => {
              return (
                <div
                  className="w-full flex items-center gap-1 justify-center"
                  key={i}
                >
                  <Input
                    required
                    type="string"
                    placeholder={t("components.modals.editModal.newValue")}
                    onChange={(e) => handleInputChangeArray(e, i)}
                    value={
                      Array.isArray(editBox.new)
                        ? editBox.new[i]
                        : Array.isArray(editBox.original) && editBox.original[i]
                    }
                    name=""
                  />
                  <div
                    onClick={() => handleDelete(i)}
                    className="cursor-pointer text-xl hover:animate-pulse rounded-full transition-all"
                  >
                    <IoMdCloseCircle />
                  </div>
                </div>
              );
            })}
            <div className="w-full flex items-center gap-1 justify-center">
              <Input
                type="string"
                placeholder={t("components.modals.editModal.newValue")}
                onChange={(e) => setNewElement(e.target.value)}
                value={newElement}
                name=""
              />
              <div
                className="cursor-pointer text-xl hover:animate-pulse rounded-full transition-all"
                onClick={() => {
                  const newArray = editBox.original;
                  if (Array.isArray(newArray)) {
                    newArray.push(newElement);
                    setEditBox({ ...editBox, new: newArray });
                    setNewElement("");
                  }
                }}
              >
                <MdCheckCircle />
              </div>
            </div>
          </div>
        ) : (
          typeof editBox.original == "object" && (
            <Select
              required
              options={editBox.original}
              onChange={handleSelectChange}
            />
          )
        )}

        <Button
          text={t("components.buttons.cancel")}
          click={() =>
            setEditBox({ target: "", original: -1, new: -1, path: "" })
          }
          widthFull={true}
        />
        {editBox.new != -1 && editBox.new != "" && (
          <Button
            type="submit"
            text={t("components.buttons.validate")}
            widthFull={true}
          />
        )}
      </form>
    </div>
  );
}
