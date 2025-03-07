import { useAtom } from "jotai";
import { newRelationAtom } from "../../settings/store";
import { ChangeEvent, FormEvent, useState } from "react";
import { RelationModel } from "../../models/relationModel";
import { emptyDiplomaticRelationship } from "../../types/typRelation";
import { errorMessage } from "../../utils/toasts";
import { useTranslation } from "react-i18next";

export function useRelationModal(update: boolean) {
  const [newRelation, setNewRelation] = useAtom(newRelationAtom);
  const [hoverInfo, setHoverInfo] = useState("");
  const { t } = useTranslation();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      newRelation.relation.name != "" &&
      newRelation.relation.nations.length > 0
    ) {
      if (update) {
        await newRelation.relation.baseUpdate(newRelation.relation);
      } else {
        await newRelation.relation.baseInsert(newRelation.relation);
      }

      setNewRelation({
        relation: new RelationModel(emptyDiplomaticRelationship),
        show: false,
        update: false,
      });
    } else {
      errorMessage(t("components.form.missingField"));
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = e.target.value;
    const name = e.target.name;
    const updatedRelation = new RelationModel({
      ...newRelation.relation,
      [name]: value,
    });
    setNewRelation({
      ...newRelation,
      relation: updatedRelation,
    });
  };

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const checked = e.target.checked;
    const updatedRelation = { ...newRelation.relation };
    switch (name) {
      case "business":
        updatedRelation.kind.business = checked;
        break;
      case "economic":
        updatedRelation.kind.economic = checked;
        break;
      case "cultural":
        updatedRelation.kind.cultural = checked;
        break;
      case "scientific":
        updatedRelation.kind.scientific = checked;
        break;
      case "coop":
        updatedRelation.kind.coop = checked;
        break;
      default:
        break;
    }
    setNewRelation({
      ...newRelation,
      relation: new RelationModel(updatedRelation),
    });
  };
  return {
    newRelation,
    setNewRelation,
    handleSubmit,
    handleChange,
    handleCheck,
    hoverInfo,
    setHoverInfo,
    t,
  };
}
