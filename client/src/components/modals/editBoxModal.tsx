/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAtom } from "jotai";
import { editbox } from "../../settings/store";
import Button from "../buttons/button";
import Input from "../form/input";
import Select from "../form/select";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import TextArea from "../form/textArea";
import { IoMdCloseCircle } from "react-icons/io";
import { MdCheckCircle } from "react-icons/md";
import MarkdownEditor from "../form/markdownEditor";
import { getMaxLength } from "../../utils/functions";
import { MAX_LENGTH } from "../../settings/consts";
import { updateElement } from "../../utils/procedures";

export default function EditBoxModal() {
  const [editBox, setEditBox] = useAtom(editbox);
  const [newElement, setNewElement] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    if (Array.isArray(editBox.original)) {
      if (editBox.path === "data.roleplay.capital") {
        setEditBox({ ...editBox, new: editBox.original });
      } else if (editBox.path === "citizenship.residence") {
        setEditBox({ ...editBox, new: editBox.original[0].id });
      } else if (editBox.path === "parentId") {
        setEditBox({ ...editBox, new: editBox.original[0].id });
      } else setEditBox({ ...editBox, new: editBox.original });
    }
    if (
      typeof editBox.indice == "string" ||
      typeof editBox.indice == "number"
    ) {
      setEditBox({ ...editBox, new: editBox.indice });
    } else if (
      typeof editBox.original == "string" ||
      typeof editBox.indice == "number"
    ) {
      setEditBox({ ...editBox, new: editBox.original });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editBox.original]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (editBox.action != undefined) {
      editBox.action(editBox.path, editBox.new);
    } else {
      updateElement(editBox.target, editBox.path, editBox.new, true);
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
    if (editBox.path === "data.roleplay.capital") {
      setEditBox({ ...editBox, new: e.target.value });
    } else if (editBox.path === "parentId") {
      setEditBox({ ...editBox, new: e.target.value });
    } else if (editBox.path === "citizenship.residence") {
      setEditBox({ ...editBox, new: e.target.value });
    } else if (editBox.path === "language") {
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
    if (newElement != "") {
      const newArray = structuredClone(editBox.new);
      if (Array.isArray(newArray)) {
        newArray.push(newElement);
        setEditBox({ ...editBox, new: newArray });
        setNewElement("");
      }
    }
  };

  return (
    <div className="max-w-[600px] flex flex-col justify-center items-center gap-2">
      <h2 className="text-2xl text-center p-4">
        {t("components.modals.editModal.title")}
      </h2>
      <form
        className="w-full flex flex-col gap-2 items-center"
        onSubmit={handleSubmit}
      >
        {typeof editBox.original == "string" &&
          (editBox.path != "data.general.description" &&
          editBox.path != "description" &&
          editBox.path != "bio" &&
          editBox.path != "data.general.nationalDay" ? (
            <TextArea
              required={!editBox.canBeEmpty}
              maxLength={MAX_LENGTH.text.textArea}
              placeholder={t("components.modals.editModal.newValue")}
              onChange={handleChange}
              value={editBox.new.toString()}
              name=""
              rows={1}
            />
          ) : editBox.path === "data.general.nationalDay" ? (
            <Input
              onChange={handleChange}
              type="date"
              name="nationalDay"
              value={editBox.new.toString()}
            />
          ) : (
            <MarkdownEditor
              value={editBox.new.toString()}
              onChange={(e: any) => setEditBox({ ...editBox, new: e })}
              maxLength={getMaxLength(editBox.path)}
            />
          ))}
        {typeof editBox.original == "number" && (
          <Input
            required={!editBox.canBeEmpty}
            type="number"
            placeholder={t("components.modals.editModal.newValue")}
            onChange={handleChange}
            value={editBox.new.toString()}
            name=""
          />
        )}
        {Array.isArray(editBox.original) &&
        Array.isArray(editBox.new) &&
        (typeof editBox.original[0] == "string" ||
          editBox.path === "data.general.tags") ? (
          <div className="flex flex-wrap justify-center items-center gap-2">
            {editBox.new.map((_element, i) => {
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
                    onClick={() => handleDeleteItem(i)}
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
                onClick={handleAddItem}
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
              value={editBox.new.toString()}
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
        <Button
          type="submit"
          text={t("components.buttons.validate")}
          widthFull={true}
          disabled={editBox.new === editBox.indice}
        />
      </form>
    </div>
  );
}
