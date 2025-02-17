/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from "jotai";
import { confirmBox, myStore, newComAtom } from "../../settings/store";
import Button from "../buttons/button";
import { ChangeEvent, FormEvent } from "react";
import Form from "../form/form";
import Input from "../form/input";
import Select from "../form/select";
import { MAX_LENGTH } from "../../settings/consts";
import { useTranslation } from "react-i18next";
import { emptyComPayload } from "../../types/typCom";
import MarkdownEditor from "../form/markdownEditor";
import { nationComTypeOptions } from "../../settings/lists";
import RequiredStar from "../form/requiredStar";
import { ComModel } from "../../models/comModel";
import { useModal } from "../../hooks/useModal";

export default function NewComModal() {
  const [newCom, setNewCom] = useAtom(newComAtom);
  const { t } = useTranslation();
  const modalRef = useModal(() => setNewCom(emptyComPayload));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    myStore.set(confirmBox, {
      text: t("components.modals.confirmModal.createCom"),
      actionToDo: () => {
        const comToInsert = new ComModel(newCom);
        comToInsert.baseInsert();
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
    <div
      ref={modalRef}
      tabIndex={-1}
      className="max-w-[600px] flex flex-col justify-center items-center gap-2"
    >
      <h2 className="text-2xl text-center p-4">
        {t("components.modals.newComModal.title")}
      </h2>
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
            <Select
              options={nationComTypeOptions}
              onChange={handleSelectChange}
              value={newCom.comType}
            />
            <MarkdownEditor
              value={newCom.message}
              onChange={(value) =>
                value != undefined && setNewCom({ ...newCom, message: value })
              }
              maxLength={MAX_LENGTH.text.comMessage}
            />
            <RequiredStar />
            <Button
              type="submit"
              text={t("components.buttons.validate")}
              widthFull={true}
              disabled={
                newCom.title === "" ||
                newCom.message.length === 0 ||
                newCom.message.length > MAX_LENGTH.text.comMessage
              }
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
    </div>
  );
}
