import Button from "../../components/ui/buttons/button";
import Form from "../../components/form/form";
import Input from "../../components/form/input";
import { emptyDiplomaticRelationship } from "../../types/typRelation";
import { FaBriefcase, FaCoins, FaFlask } from "react-icons/fa";
import { FaMasksTheater, FaPersonMilitaryPointing } from "react-icons/fa6";
import { RelationModel } from "../../models/relationModel";
import { MAX_LENGTH } from "../../settings/consts";
import TextArea from "../../components/form/textArea";
import { useModal } from "../../hooks/useModal";
import { useRelationModal } from "../../hooks/modalsHooks/useRelationModal";
import HoverInfo from "../../components/ui/hoverInfo";

export interface RelationModalProps {
  update: boolean;
}

export default function RelationModal({ update }: RelationModalProps) {
  const {
    newRelation,
    setNewRelation,
    handleSubmit,
    handleChange,
    handleCheck,
    hoverInfo,
    setHoverInfo,
    t,
  } = useRelationModal(update);
  const modalRef = useModal(() =>
    setNewRelation({
      relation: new RelationModel(emptyDiplomaticRelationship),
      show: false,
      update: false,
    }),
  );

  return (
    <div
      ref={modalRef}
      tabIndex={-1}
      className="flex flex-col items-center justify-center"
    >
      <h2 className="text-2xl text-center p-4">
        {update
          ? t("components.modals.relationModal.update")
          : t("components.modals.relationModal.new")}
      </h2>
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
              placeholder={t("components.modals.relationModal.nameInput")}
              maxLength={100}
            />
            <TextArea
              required
              name="description"
              value={newRelation.relation.description}
              onChange={handleChange}
              placeholder={t("components.modals.relationModal.description")}
              maxLength={MAX_LENGTH.text.relationDescription}
            />
            <fieldset className="w-full p-2 flex flex-wrap justify-center items-center gap-2 bg-complementary2 text-2xl">
              <label className="flex gap-1">
                <FaBriefcase
                  onMouseEnter={() =>
                    setHoverInfo(t("components.hoverInfos.relations.business"))
                  }
                  onMouseLeave={() => setHoverInfo("")}
                />
                <Input
                  type="checkbox"
                  name="business"
                  checked={newRelation.relation.kind.business}
                  onChange={handleCheck}
                />
              </label>
              <label className="flex gap-1">
                <FaCoins
                  onMouseEnter={() =>
                    setHoverInfo(t("components.hoverInfos.relations.economic"))
                  }
                  onMouseLeave={() => setHoverInfo("")}
                />
                <Input
                  type="checkbox"
                  name="economic"
                  checked={newRelation.relation.kind.economic}
                  onChange={handleCheck}
                />
              </label>
              <label className="flex gap-1">
                <FaMasksTheater
                  onMouseEnter={() =>
                    setHoverInfo(t("components.hoverInfos.relations.cultural"))
                  }
                  onMouseLeave={() => setHoverInfo("")}
                />
                <Input
                  type="checkbox"
                  name="cultural"
                  checked={newRelation.relation.kind.cultural}
                  onChange={handleCheck}
                />
              </label>
              <label className="flex gap-1">
                <FaFlask
                  onMouseEnter={() =>
                    setHoverInfo(
                      t("components.hoverInfos.relations.scientific"),
                    )
                  }
                  onMouseLeave={() => setHoverInfo("")}
                />
                <Input
                  type="checkbox"
                  name="scientific"
                  checked={newRelation.relation.kind.scientific}
                  onChange={handleCheck}
                />
              </label>
              <label className="flex gap-1">
                <FaPersonMilitaryPointing
                  onMouseEnter={() =>
                    setHoverInfo(t("components.hoverInfos.relations.coop"))
                  }
                  onMouseLeave={() => setHoverInfo("")}
                />
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
                  relation: new RelationModel(emptyDiplomaticRelationship),
                  show: false,
                  update: false,
                })
              }
              widthFull={true}
            />
          </>
        }
      />
      {hoverInfo != "" && <HoverInfo text={hoverInfo} />}
    </div>
  );
}
