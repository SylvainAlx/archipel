import { useAtom } from "jotai";
import H1 from "../../../components/titles/h1";
import { StringProps } from "../../../types/typProp";
import { comsListAtom, infoModal, nationAtom } from "../../../settings/store";
import { EmptyCom } from "../../../types/typCom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Form from "../../../components/form/form";
import Input from "../../../components/form/input";
import Button from "../../../components/button";
import { createCom } from "../../../utils/fetch";
import Select from "../../../components/form/select";
import { comTypeOptions } from "../../../settings/consts";

export default function DashboardCom({ text }: StringProps) {
  const [nation] = useAtom(nationAtom);
  const [newCom, setNewCom] = useState(EmptyCom);
  const [, setInfo] = useAtom(infoModal);
  const [, setComsList] = useAtom(comsListAtom);

  useEffect(() => {
    setNewCom({
      ...newCom,
      originId: nation._id,
      originName: nation.name,
      comType: comTypeOptions[0].id,
    });
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    setNewCom({ ...newCom, [name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    createCom(newCom);
    setComsList([EmptyCom]);
    setInfo("Communication envoyée");
  };

  return (
    <>
      <H1 text={text} />
      <Form
        title="Communication"
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
            <Select
              required={true}
              options={comTypeOptions}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setNewCom({ ...newCom, comType: Number(e.target.value) })
              }
            />
            <Input
              type="text"
              required={true}
              onChange={handleChange}
              placeholder="Message"
              value={newCom.message}
              name="message"
            />
            <Button type="submit" text="ENVOYER" path="" />
          </>
        }
      />
    </>
  );
}
