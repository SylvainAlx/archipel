import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Button from "../ui/buttons/button";
import Form from "./form";
import Input from "./input";
import MarkdownEditor from "./markdownEditor";
import Select from "./select";
import { emptyComPayload } from "../../types/typCom";
import { adminComTypeOptions } from "../../settings/lists";
import { COM_GENERAL_DESTINATION, MAX_LENGTH } from "../../settings/consts";
import { useTranslation } from "react-i18next";
import { confirmBox, myStore, sessionAtom } from "../../settings/store";
import H2 from "../ui/titles/h2";
import TileContainer from "../ui/tileContainer";
import { ComModel } from "../../models/comModel";

export default function AdminForm() {
  const [newCom, setNewCom] = useState(emptyComPayload);
  const { t } = useTranslation();

  useEffect(() => {
    setNewCom({
      ...newCom,
      origin: myStore.get(sessionAtom).user.officialId,
      destination: COM_GENERAL_DESTINATION,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    myStore.set(confirmBox, {
      text: t("components.modals.confirmModal.createCom"),
      actionToDo: async () => {
        const comToInsert = new ComModel(newCom);
        await comToInsert.baseInsert();
      },
    });
    setNewCom(emptyComPayload);
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
    <TileContainer>
      <section className="flex flex-col items-center">
        <H2 text="Envoyer communication" />
        <Form submit={handleSubmit}>
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
              value={newCom.destination.toLowerCase()}
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
              maxLength={MAX_LENGTH.text.comMessage}
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
        </Form>
      </section>
    </TileContainer>
  );
}
