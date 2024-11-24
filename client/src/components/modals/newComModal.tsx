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
import { comTypeOptions } from "../../settings/lists";

export default function NewComModal() {
  const [newCom, setNewCom] = useAtom(newComAtom);
  const { t } = useTranslation();

  const handleSubmit = (e: FormEvent) => {
    setNewCom(emptyComPayload);
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
    <div className="max-w-[600px] flex flex-col justify-center items-center gap-2">
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
              options={comTypeOptions}
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
    </div>
  );
}
