import { useAtom } from "jotai";
import { newNationAtom } from "../../settings/store";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { NationModel } from "../../models/nationModel";
import { useNavigate } from "react-router-dom";
import { emptyNewNationPayload } from "../../types/typNation";
import { errorMessage } from "../../utils/toasts";
import { useTranslation } from "react-i18next";

export function useNewNationModal() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [newNation, setNewNation] = useAtom(newNationAtom);
  const [tagString, setTagString] = useState<string>("");
  const [tags, setTags] = useState<string[]>(newNation.tags);

  useEffect(() => {
    const updateNewNation = { ...newNation };
    updateNewNation.tags = tags;
    setNewNation(updateNewNation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (newNation.regime != 0 && newNation.name != "") {
      const newNationToInsert = new NationModel(newNation);
      const nationInBase = await newNationToInsert.baseInsert();
      navigate(`/nation/${nationInBase.officialId}`);
      setNewNation(emptyNewNationPayload);
    } else {
      errorMessage(t("components.form.missingField"));
      setNewNation(emptyNewNationPayload);
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

  return {
    newNation,
    setNewNation,
    handleSubmit,
    handleChange,
    handleSelectChange,
    handleChangeTag,
    deleteTag,
    tagString,
    tags,
    t,
  };
}
