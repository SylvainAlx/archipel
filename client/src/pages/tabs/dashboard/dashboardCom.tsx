import { useAtom } from "jotai";
import H1 from "../../../components/titles/h1";
import { StringProps } from "../../../types/typProp";
import {
  comsListAtom,
  confirmBox,
  infoModal,
  loadingSpinner,
  nationAtom,
} from "../../../settings/store";
import { EmptyCom } from "../../../types/typCom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Form from "../../../components/form/form";
import Input from "../../../components/form/input";
import Button from "../../../components/button";
import { getAllComs } from "../../../utils/fetch";
import Select from "../../../components/form/select";
import { TITLE, comTypeOptions } from "../../../settings/consts";
import TextArea from "../../../components/form/textArea";
import ListTile from "../../../components/listTile";
import Tag from "../../../components/tag";
import { IoMdTrash } from "react-icons/io";
import { dateToString } from "../../../utils/functions";

export default function DashboardCom({ text }: StringProps) {
  const [nation] = useAtom(nationAtom);
  const [newCom, setNewCom] = useState(EmptyCom);
  const [, setInfo] = useAtom(infoModal);
  const [, setLoading] = useAtom(loadingSpinner);
  const [comList, setComsList] = useAtom(comsListAtom);
  const [, setConfirm] = useAtom(confirmBox);

  useEffect(() => {
    if (comList[0]._id === "") {
      setLoading({ show: true, text: "Connexion au serveur" });
      getAllComs()
        .then((data) => {
          setLoading({ show: false, text: "Connexion au serveur" });
          if (data != undefined) {
            setComsList(data);
          }
        })
        .catch((error) => {
          setLoading({ show: false, text: "Connexion au serveur" });
          setInfo(error.message);
        });
    }
    setNewCom({
      ...newCom,
      originId: nation._id,
      originName: nation.name,
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
              <Button type="submit" text="ENVOYER" path="" />
            </>
          }
        />
        {comList.length > 0 && (
          <ListTile
            children={
              <>
                {comList.map((com, i) => {
                  if (
                    (nation.role === "admin" && com.comType === 0) ||
                    com.originId === nation._id ||
                    com.destinationId === nation._id
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
                          {nation.role === "admin" &&
                            com.comType != 1 &&
                            com.comType != 2 && (
                              <span>origine : {com.originName}</span>
                            )}
                          {com.comType === 1 && (
                            <span>Bienvenue sur {TITLE} !</span>
                          )}
                          <div className="flex items-center gap-2">
                            {com.comType === 0 && (
                              <Tag text="privé" bgColor="bg-danger" />
                            )}
                            {com.comType > 0 && (
                              <Tag text="public" bgColor="bg-success" />
                            )}
                            {com.originId === nation._id && (
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
