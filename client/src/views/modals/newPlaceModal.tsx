import Button from "../../components/ui/buttons/button";
import Form from "../../components/form/form";
import Input from "../../components/form/input";
import { emptyPlace } from "../../types/typPlace";
import Select from "../../components/form/select";
import { useTranslation } from "react-i18next";
import { PLACE_TYPE } from "../../settings/consts";
import { FaCoins } from "react-icons/fa";
import RequiredStar from "../../components/form/requiredStar";
import { useModal } from "../../hooks/useModal";
import { getValueFromParam } from "../../services/paramService";
import { useNewPlaceModal } from "../../hooks/modalsHooks/useNewPlaceModal";

export default function NewPlaceModal() {
  const { t } = useTranslation();
  const {
    handleSubmit,
    handleChange,
    handleSelectChange,
    newPlace,
    setNewPlace,
  } = useNewPlaceModal();
  const modalRef = useModal(() => setNewPlace(emptyPlace));
  const cost = Number(getValueFromParam("costs", "place"));

  return (
    <div ref={modalRef} tabIndex={-1} className="flex flex-col items-center">
      <h2 className="text-2xl text-center p-4">
        {t("components.modals.newPlaceModal.title")}
      </h2>
      {!newPlace.isFree && (
        <span className="flex items-center gap-1 text-gold">
          <FaCoins />
          {cost}
        </span>
      )}
      <Form submit={handleSubmit}>
        <>
          <Input
            required
            type="text"
            name="name"
            value={newPlace.name}
            onChange={handleChange}
            placeholder={t("components.modals.newPlaceModal.placeName")}
          />
          <Select
            options={Object.values(PLACE_TYPE)}
            onChange={handleSelectChange}
            required={true}
          />
          <RequiredStar />
          <Button
            type="submit"
            text={t("components.buttons.validate")}
            widthFull={true}
          />
          <Button
            type="button"
            text={t("components.buttons.cancel")}
            click={() => setNewPlace(emptyPlace)}
            widthFull={true}
          />
        </>
      </Form>
    </div>
  );
}
