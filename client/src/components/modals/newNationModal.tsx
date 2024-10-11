/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from "jotai";
import { newNationAtom } from "../../settings/store";
import Button from "../buttons/button";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Form from "../form/form";
import Input from "../form/input";
// import Select from "../form/select";
import { emptyNewNationPayload } from "../../types/typNation";
import { createNation } from "../../api/nation/nationAPI";
import Select from "../form/select";
import { regimeList } from "../../settings/consts";
import { useTranslation } from "react-i18next";
import RequiredStar from "../form/requiredStar";
import { errorMessage } from "../../utils/toasts";
import HashTag from "../tags/hashTag";

export default function NewNationModal() {
  const [newNation, setNewNation] = useAtom(newNationAtom);
  const [tagString, setTagString] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const updateNewNation = { ...newNation };
    updateNewNation.tags = tags;
    setNewNation(updateNewNation);
  }, [tags]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newNation.regime != 0 && newNation.name != "") {
      createNation(newNation);
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
    const valeur = e.target.value;
    setTagString(valeur);

    if (valeur.includes(" ")) {
      const mots = valeur.trim().split(/\s+/); // Séparer par des espaces multiples
      setTags([...tags, ...mots]); // Ajouter les mots au tableau de mots-clés
      setTagString("");
    }
  };

  const deleteTag = (value: string) => {
    const updatedTags = tags.filter((tag) => tag !== value);
    setTags(updatedTags);
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
                    <HashTag label={tag} />
                  </span>
                );
              })}
            </div>

            <Input
              onChange={handleChangeTag}
              type="text"
              name="tag"
              placeholder={t("components.hoverInfos.tags.hash")}
              value={tagString}
              disabled={tags.length > 5}
            />
            <em className="text-sm">
              {t("components.modals.newNationModal.tagsInfos")}
            </em>
            <Input
              onChange={handleChange}
              type="text"
              name="currency"
              placeholder={t("components.modals.newNationModal.currency")}
              value={newNation.currency}
            />

            <Select
              id="regime"
              onChange={handleSelectChange}
              options={regimeList}
              title={t("components.modals.newNationModal.regime")}
            />

            <Button
              type="submit"
              text={t("components.buttons.validate")}
              widthFull={true}
            />
            <Button
              type="button"
              text={t("components.buttons.cancel")}
              click={() => setNewNation(emptyNewNationPayload)}
              widthFull={true}
            />
            <RequiredStar />
          </>
        }
      />
    </div>
  );
}
