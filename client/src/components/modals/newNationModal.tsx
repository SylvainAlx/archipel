/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from "jotai";
import { newNationAtom } from "../../settings/store";
import Button from "../buttons/button";
import { ChangeEvent, FormEvent } from "react";
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

export default function NewNationModal() {
  const [newNation, setNewNation] = useAtom(newNationAtom);
  const { t } = useTranslation();

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
            <Input
              onChange={handleChange}
              type="text"
              name="currency"
              placeholder={t("components.modals.newNationModal.currency")}
              value={newNation.currency}
            />

            <label htmlFor="regime">
              {t("components.modals.newNationModal.regime")}
              <Select
                id="regime"
                onChange={handleSelectChange}
                options={regimeList}
              />
            </label>
            <Button type="submit" text={t("components.buttons.validate")} />
            <Button
              type="button"
              text={t("components.buttons.cancel")}
              click={() => setNewNation(emptyNewNationPayload)}
            />
            <RequiredStar />
          </>
        }
      />
    </div>
  );
}
