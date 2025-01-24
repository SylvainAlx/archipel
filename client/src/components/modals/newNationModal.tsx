/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from "jotai";
import { newNationAtom } from "../../settings/store";
import Button from "../buttons/button";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Form from "../form/form";
import Input from "../form/input";
import { emptyNewNationPayload } from "../../types/typNation";
import Select from "../form/select";
import { useTranslation } from "react-i18next";
import { errorMessage } from "../../utils/toasts";
import HashTag from "../tags/hashTag";
import { regimeList } from "../../settings/lists";
import { MAX_LENGTH } from "../../settings/consts";
import RequiredStar from "../form/requiredStar";
import { Link } from "react-router-dom";
import { NationModel } from "../../models/nationModel";

export default function NewNationModal() {
  const [newNation, setNewNation] = useAtom(newNationAtom);
  const [tagString, setTagString] = useState<string>("");
  const [tags, setTags] = useState<string[]>(newNation.tags);
  const { t } = useTranslation();

  useEffect(() => {
    const updateNewNation = { ...newNation };
    updateNewNation.tags = tags;
    setNewNation(updateNewNation);
  }, [tags]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (newNation.regime != 0 && newNation.name != "") {
      const newNationToInsert = new NationModel(newNation);
      await newNationToInsert.baseInsert();
      setNewNation(emptyNewNationPayload);
    } else {
      errorMessage(t("components.form.missingField"));
    }
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

  const handleChangeTag = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value != " ") {
      setTagString(value);

      if (value.includes(" ")) {
        const word = value.trim().split(/\s+/); // Séparer par des espaces multiples
        setTags([...tags, ...word]); // Ajouter les mots au tableau de mots-clés
        setTagString("");
      }
    }
  };

  const deleteTag = (value: string) => {
    setTags((currentTags) => currentTags.filter((tag) => tag !== value));
  };

  return (
    <div>
      <h2 className="text-2xl text-center p-4">
        {t("components.modals.newNationModal.title")}
      </h2>
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
              placeholder={t("components.modals.newNationModal.nationName")}
              maxLength={60}
            />
            <Input
              onChange={handleChange}
              type="text"
              name="motto"
              placeholder={t("components.modals.newNationModal.motto")}
              value={newNation.motto}
            />
            <div className="flex flex-wrap gap-1">
              {tags.map((tag, i) => {
                return (
                  <span
                    onClick={() => deleteTag(tag)}
                    key={i}
                    className="hover:text-danger"
                  >
                    <HashTag label={tag} occurrence={-1} />
                  </span>
                );
              })}
            </div>
            <div>
              <Input
                onChange={handleChangeTag}
                type="text"
                name="tag"
                placeholder={t("components.hoverInfos.tags.hash")}
                value={tagString}
                disabled={tags.length === MAX_LENGTH.array.tags}
              />
              <em className="text-sm">
                {t("components.modals.newNationModal.tagsInfos")}
              </em>
            </div>
            <Input
              onChange={handleChange}
              type="text"
              name="currency"
              placeholder={t("components.modals.newNationModal.currency")}
              value={newNation.currency}
            />
            <label>
              {t("components.hoverInfos.tags.nationalDay").toLocaleUpperCase()}
              <Input
                onChange={handleChange}
                type="date"
                name="nationalDay"
                placeholder="Fête nationale"
                value={newNation.nationalDay}
              />
            </label>
            <label className="w-full flex gap-2 items-center justify-center">
              <Link
                to="https://fr.wikipedia.org/wiki/%C3%89tat-nation"
                target="_blank"
                className="cursor-help text-sm"
              >
                {t("components.modals.newNationModal.isNationState")}
              </Link>
              <Input
                type="checkbox"
                name="nationState"
                checked={newNation.isNationState}
                onChange={() =>
                  setNewNation({
                    ...newNation,
                    isNationState: !newNation.isNationState,
                  })
                }
              />
            </label>
            <Select
              id="regime"
              onChange={handleSelectChange}
              options={regimeList}
              title={t("components.modals.newNationModal.regime")}
              required={newNation.regime === 0}
            />
            <RequiredStar />
            <Button
              type="submit"
              text={t("components.buttons.validate")}
              widthFull={true}
              disabled={newNation.name === "" || newNation.regime === 0}
            />
            <Button
              type="button"
              text={t("components.buttons.cancel")}
              click={() => setNewNation(emptyNewNationPayload)}
              widthFull={true}
            />
          </>
        }
      />
    </div>
  );
}
