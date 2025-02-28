/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from "jotai";
import { newPlaceAtom, placeListAtomV2 } from "../../settings/store";
import Button from "../buttons/button";
import { ChangeEvent, FormEvent } from "react";
import Form from "../form/form";
import Input from "../form/input";
import { emptyPlace } from "../../types/typPlace";
import Select from "../form/select";
import { useTranslation } from "react-i18next";
import { PLACE_TYPE } from "../../settings/consts";
import { FaCoins } from "react-icons/fa";
import RequiredStar from "../form/requiredStar";
import { PlaceModel } from "../../models/placeModel";
import { useNavigate } from "react-router-dom";
import { PlaceListModel } from "../../models/lists/placeListModel";
import { useModal } from "../../hooks/useModal";
import { getValueFromParam } from "../../services/paramService";

export default function NewPlaceModal() {
  const [newPlace, setNewPlace] = useAtom(newPlaceAtom);
  const [placeList, setPlaceList] = useAtom(placeListAtomV2);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const modalRef = useModal(() => setNewPlace(emptyPlace));
  const cost = Number(getValueFromParam("costs", "place", 10));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const placeToInsert = new PlaceModel(newPlace);
    const placeInserted = await placeToInsert.baseInsert();
    const listToUpdate = placeList.addOrUpdate(placeInserted);
    setPlaceList(new PlaceListModel(listToUpdate));
    setNewPlace(emptyPlace);
    navigate(`/place/${placeInserted.officialId}`);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewPlace({ ...newPlace, [name]: value });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setNewPlace({ ...newPlace, type: value });
  };

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
      <Form
        submit={handleSubmit}
        children={
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
        }
      />
    </div>
  );
}
