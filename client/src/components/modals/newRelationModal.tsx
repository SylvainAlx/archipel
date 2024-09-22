/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from "jotai";
import { newRelationAtom } from "../../settings/store";
import Button from "../buttons/button";
import { ChangeEvent, FormEvent } from "react";
import Form from "../form/form";
import Input from "../form/input";
import { useTranslation } from "react-i18next";
import RequiredStar from "../form/requiredStar";
import { errorMessage } from "../../utils/toasts";
import { emptyDiplomaticRelationship } from "../../types/typRelation";
import { FaBriefcase, FaCoins, FaFlask } from "react-icons/fa";
import { FaMasksTheater, FaPersonMilitaryPointing } from "react-icons/fa6";
import { createRelation, updateRelation } from "../../api/relation/relationAPI";

export interface NewRelationModalProps {
  update: boolean;
}

export default function NewRelationModal({ update }: NewRelationModalProps) {
  const [newRelation, setNewRelation] = useAtom(newRelationAtom);
  const { t } = useTranslation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (
      newRelation.relation.name != "" &&
      newRelation.relation.nations.length > 0
    ) {
      if (update) {
        updateRelation(newRelation.relation);
      } else {
        createRelation(newRelation.relation);
      }

      setNewRelation({
        relation: emptyDiplomaticRelationship,
        show: false,
        update: false,
      });
    } else {
      errorMessage(t("components.form.missingField"));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const updatedRelation = { ...newRelation.relation };
    updatedRelation.name = value;
    setNewRelation({ ...newRelation, relation: updatedRelation });
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
    setNewRelation({ ...newRelation, relation: updatedRelation });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl text-center p-4">Relation diplomatique</h2>
      <Form
        submit={handleSubmit}
        children={
          <>
            <Input
              required
              type="text"
              name="name"
              value={newRelation.relation.name}
              onChange={handleChange}
              placeholder="Nom de la relation diplomatique"
              maxLength={100}
            />
            <fieldset className="p-2 flex flex-wrap justify-center items-center gap-2 bg-complementary2 text-2xl">
              <label className="flex gap-1">
                <FaBriefcase />
                <Input
                  type="checkbox"
                  name="business"
                  checked={newRelation.relation.kind.business}
                  onChange={handleCheck}
                />
              </label>
              <label className="flex gap-1">
                <FaCoins />
                <Input
                  type="checkbox"
                  name="economic"
                  checked={newRelation.relation.kind.economic}
                  onChange={handleCheck}
                />
              </label>
              <label className="flex gap-1">
                <FaMasksTheater />
                <Input
                  type="checkbox"
                  name="cultural"
                  checked={newRelation.relation.kind.cultural}
                  onChange={handleCheck}
                />
              </label>
              <label className="flex gap-1">
                <FaFlask />
                <Input
                  type="checkbox"
                  name="scientific"
                  checked={newRelation.relation.kind.scientific}
                  onChange={handleCheck}
                />
              </label>
              <label className="flex gap-1">
                <FaPersonMilitaryPointing />
                <Input
                  type="checkbox"
                  name="coop"
                  checked={newRelation.relation.kind.coop}
                  onChange={handleCheck}
                />
              </label>
            </fieldset>

            <Button
              type="submit"
              text={t("components.buttons.validate")}
              widthFull={true}
            />
            <Button
              type="button"
              text={t("components.buttons.cancel")}
              click={() =>
                setNewRelation({
                  relation: emptyDiplomaticRelationship,
                  show: false,
                  update: false,
                })
              }
              widthFull={true}
            />
            <RequiredStar />
          </>
        }
      />
    </div>
  );
}