import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Button from "../buttons/button";
import Form from "./form";
import Input from "./input";
import MarkdownEditor from "./markdownEditor";
import Select from "./select";
import { emptyComPayload } from "../../types/typCom";
import { adminComTypeOptions } from "../../settings/lists";
import { MAX_LENGTH } from "../../settings/consts";
import { useTranslation } from "react-i18next";
import { confirmBox, myStore, sessionAtom } from "../../settings/store";

export default function AdminForm() {
  const [newCom, setNewCom] = useState(emptyComPayload);
  const { t } = useTranslation();

  useEffect(() => {
    setNewCom({ ...newCom, origin: myStore.get(sessionAtom).user.officialId });
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    myStore.set(confirmBox, {
      action: "createCom",
      text: t("components.modals.confirmModal.createCom"),
      result: "",
      payload: newCom,
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewCom({ ...newCom, [name]: value });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setNewCom({ ...newCom, comType: value });
  };

  return (
    <Form
      submit={handleSubmit}
      children={
        <>
          <Input
            required
            type="text"
            name="title"
            value={newCom.title}
            onChange={handleChange}
            placeholder={t("components.modals.newComModal.comTitle")}
          />
          <Input
            required
            type="text"
            name="destination"
            value={newCom.destination}
            onChange={handleChange}
            placeholder="Destinataire"
            disabled={newCom.comType === 1}
          />
          <Select
            options={adminComTypeOptions}
            onChange={handleSelectChange}
            value={newCom.comType}
          />
          <MarkdownEditor
            value={newCom.message}
            onChange={(e) =>
              e != undefined && setNewCom({ ...newCom, message: e })
            }
            maxLength={MAX_LENGTH.comMessage}
          />
          <Button
            type="submit"
            text={t("components.buttons.validate")}
            widthFull={true}
          />
          <Button
            type="button"
            text={t("components.buttons.cancel")}
            click={() => setNewCom(emptyComPayload)}
            widthFull={true}
          />
        </>
      }
    />
  );
}
