import Button from "../../components/ui/buttons/button";
import Form from "../../components/form/form";
import Input from "../../components/form/input";
import { emptyNewNationPayload } from "../../types/typNation";
import Select from "../../components/form/select";
import HashTag from "../../components/ui/tags/hashTag";
import { MAX_LENGTH, REGIME } from "../../settings/consts";
import RequiredStar from "../../components/form/requiredStar";
import { useModal } from "../../hooks/useModal";
import BooleanRadio from "../../components/form/booleanRadio";
import { useNewNationModal } from "../../hooks/modalsHooks/useNewNationModal";

export default function NewNationModal() {
  const {
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
  } = useNewNationModal();

  const modalRef = useModal(() => setNewNation(emptyNewNationPayload));

  return (
    <div ref={modalRef} tabIndex={-1}>
      <h2 className="text-2xl text-center p-4">
        {t("components.modals.newNationModal.title")}
      </h2>
      <Form submit={handleSubmit}>
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
          <BooleanRadio
            title={t("components.modals.newNationModal.isNationState")}
            name="nationState"
            value={newNation.isNationState}
            onChange={() =>
              setNewNation({
                ...newNation,
                isNationState: !newNation.isNationState,
              })
            }
          />
          <Select
            id="regime"
            onChange={handleSelectChange}
            options={Object.values(REGIME)}
            title={t("components.modals.newNationModal.regime")}
            required={newNation.regime === 0}
          />
          <RequiredStar />
          <div className="flex items-center justify-center flex-wrap gap-2">
            <Button
              type="submit"
              text={t("components.buttons.validate")}
              disabled={newNation.name === "" || newNation.regime === 0}
            />
            <Button
              type="button"
              text={t("components.buttons.cancel")}
              click={() => setNewNation(emptyNewNationPayload)}
            />
          </div>
        </>
      </Form>
    </div>
  );
}
