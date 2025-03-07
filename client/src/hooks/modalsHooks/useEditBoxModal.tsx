import { useAtom } from "jotai";
import { editbox } from "../../settings/store";
import { ChangeEvent, FormEvent, useState } from "react";

export function useEditBoxModal() {
  const [editBox, setEditBox] = useAtom(editbox);
  const [newElement, setNewElement] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (editBox.action != undefined) {
      editBox.action(editBox.path, editBox.new);
    }
    setEditBox({ target: "", original: -1, new: -1, path: "" });
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

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setEditBox({ ...editBox, new: e.target.value });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (
      [
        "data.roleplay.capital",
        "parentId",
        "citizenship.residence",
        "language",
      ].includes(editBox.path)
    ) {
      setEditBox({ ...editBox, new: e.target.value });
    } else {
      setEditBox({ ...editBox, new: Number(e.target.value) });
    }
  };

  const handleDeleteItem = (i: number) => {
    const newArray = structuredClone(editBox.new);
    if (Array.isArray(newArray)) {
      newArray.splice(i, 1);
      setEditBox({ ...editBox, new: newArray });
    }
  };

  const handleAddItem = () => {
    if (newElement != "" && Array.isArray(editBox.new)) {
      const newArray = [...editBox.new];
      newArray.push(newElement);
      setEditBox({ ...editBox, new: newArray });
      setNewElement("");
    }
  };

  const handleRadioChange = () => {
    setEditBox({ ...editBox, new: !editBox.new });
  };

  return {
    editBox,
    newElement,
    setEditBox,
    setNewElement,
    handleSubmit,
    handleInputChangeArray,
    handleChange,
    handleSelectChange,
    handleDeleteItem,
    handleAddItem,
    handleRadioChange,
  };
}
