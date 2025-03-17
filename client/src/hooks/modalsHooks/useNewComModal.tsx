import { useAtom } from "jotai";
import { confirmBox, myStore, newComAtom } from "../../settings/store";
import { ChangeEvent, FormEvent } from "react";
import { ComModel } from "../../models/comModel";
import { emptyComPayload } from "../../types/typCom";
import { useTranslation } from "react-i18next";

export function useNewComModal() {
  const { t } = useTranslation();
  const [newCom, setNewCom] = useAtom(newComAtom);

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

  return {
    newCom,
    setNewCom,
    handleSubmit,
    handleChange,
    handleSelectChange,
    t,
  };
}
