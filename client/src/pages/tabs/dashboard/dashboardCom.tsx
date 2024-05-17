/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from "jotai";
import H1 from "../../../components/titles/h1";
import { StringProps } from "../../../types/typProp";
import { comsListAtom, confirmBox, session } from "../../../settings/store";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Form from "../../../components/form/form";
import Input from "../../../components/form/input";
import Button from "../../../components/buttons/button";
import Select from "../../../components/form/select";
import { comTypeOptions } from "../../../settings/consts";
import TextArea from "../../../components/form/textArea";
import ListTile from "../../../components/listTile";
import Tag from "../../../components/tags/tag";
import { IoMdTrash } from "react-icons/io";
import { dateToString } from "../../../utils/functions";
import { EmptyCom } from "../../../types/typAtom";
import { getComs } from "../../../api/communication/comAPI";
import { useTranslation } from "react-i18next";

export default function DashboardCom({ text }: StringProps) {
  const [newCom, setNewCom] = useState(EmptyCom);
  const [comList] = useAtom(comsListAtom);
  const [, setConfirm] = useAtom(confirmBox);
  const { t } = useTranslation();

  useEffect(() => {
    if (comList.length < 1) {
      getComs();
    }
    setNewCom({
      ...newCom,
      originId: session.nation.officialId,
      originName: session.nation.name,
      comType: comTypeOptions[0].id,
    });
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const name = e.target.name;
    setNewCom({ ...newCom, [name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setConfirm({
      action: "createCom",
      text: "Envoi de la communication ?",
      result: "",
      payload: newCom,
    });
  };

  const handleDelete = (id: string) => {
    setConfirm({
      action: "deleteCom",
      text: "Confirmez-vous la suppression de la communication ?",
      result: "",
      target: id,
    });
  };

  return (
    <>
      <H1 text={text} />
      <section className="w-full flex flex-col md:flex-row justify-center items-center md:items-start gap-4">
        <Form
          title="Nouveau message"
          submit={handleSubmit}
          children={
            <>
              <Input
                type="text"
                required={true}
                onChange={handleChange}
                placeholder="Titre"
                value={newCom.title}
                name="title"
              />
              <fieldset className="w-full">
                <legend>Sujet</legend>
                <Select
                  required={true}
                  options={comTypeOptions}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setNewCom({ ...newCom, comType: Number(e.target.value) })
                  }
                />
              </fieldset>
              <TextArea
                required={true}
                onChange={handleChange}
                placeholder="Message (max 200 caractères)"
                value={newCom.message}
                name="message"
                maxLength={200}
                rows={10}
              />
              <Button type="submit" text="ENVOYER" />
            </>
          }
        />
        {comList.length > 0 && (
          <ListTile
            children={
              <>
                {comList.map((com, i) => {
                  if (
                    (session.nation.role === "admin" && com.comType === 0) ||
                    com.originId === session.nation._id ||
                    com.destinationId === session.nation._id
                  ) {
                    return (
                      <div
                        key={i}
                        className="w-full p-2 rounded bg-complementary flex flex-col gap-2"
                      >
                        <div className="w-full flex items-center justify-between gap-2">
                          <span className="text-[10px]">
                            {dateToString(com.createdAt)}
                          </span>
                          {session.nation.role === "admin" &&
                            com.comType != 1 &&
                            com.comType != 2 && (
                              <span>origine : {com.originName}</span>
                            )}
                          {com.comType === 1 && (
                            <span>
                              Bienvenue sur {t("components.logo.title")} !
                            </span>
                          )}
                          <div className="flex items-center gap-2">
                            {com.comType === 0 && (
                              <Tag text="privé" hover="" bgColor="bg-danger" />
                            )}
                            {com.comType > 0 && (
                              <Tag
                                text="public"
                                hover=""
                                bgColor="bg-success"
                              />
                            )}
                            {com.originId === session.nation._id && (
                              <div
                                onClick={() => handleDelete(com._id)}
                                className="text-lg hover:scale-110 hover:cursor-pointer transition-all"
                              >
                                <IoMdTrash />
                              </div>
                            )}
                          </div>
                        </div>

                        {com.comType != 1 && com.comType != 2 && (
                          <div className="bg-black_alpha p-2 rounded">
                            <b className="text-lg"> {com.title}</b>
                            <blockquote>{com.message}</blockquote>
                          </div>
                        )}
                      </div>
                    );
                  }
                })}
              </>
            }
          />
        )}
      </section>
    </>
  );
}
