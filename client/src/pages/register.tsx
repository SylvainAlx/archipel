import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCom, registerFetch } from "../utils/fetch";
import { useAtom } from "jotai";
import {
  comsListAtom,
  infoModal,
  loadingSpinner,
  myStore,
  nationAtom,
  nationsListAtom,
  recoveryKey,
} from "../settings/store";
import H1 from "../components/titles/h1";
import Input from "../components/form/input";
import Button from "../components/button";
import { EmptyNation } from "../types/typNation";
import Form from "../components/form/form";
import { SERVEUR_LOADING_STRING, comOptions } from "../settings/consts";
import { EmptyCom } from "../types/typAtom";

export default function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [, setNation] = useAtom(nationAtom);
  const [, setRecovery] = useAtom(recoveryKey);
  const [, setInfo] = useAtom(infoModal);
  const [, setNationsList] = useAtom(nationsListAtom);
  const [, setComsList] = useAtom(comsListAtom);

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type == "text") {
      setName(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    myStore.set(loadingSpinner, { show: true, text: SERVEUR_LOADING_STRING });
    registerFetch({ name, password })
      .then((data) => {
        myStore.set(loadingSpinner, { show: false, text: "" });
        if (data.nation) {
          createCom({
            originId: data.nation._id,
            originName: data.nation.name,
            comType: comOptions[1].id,
          });
          localStorage.setItem("jwt", data.jwt);
          setRecovery(data.recovery);
          setNationsList([EmptyNation]);
          setComsList([EmptyCom]);
          setNation({
            _id: data.nation._id,
            name: data.nation.name,
            role: data.nation.role,
            data: data.nation.data,
            createdAt: data.nation.createdAt,
          });
          navigate(`/dashboard/${data.nation._id}`);
        } else {
          myStore.set(loadingSpinner, { show: false, text: "" });
          setInfo("création impossible : " + data.message);
        }
      })
      .catch((error) => {
        myStore.set(loadingSpinner, { show: false, text: "" });
        setInfo(error.message);
      });
  };
  return (
    <>
      <H1 text="Nouvelle nation" />
      <Form
        submit={handleSubmit}
        children={
          <>
            <Input
              required={true}
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="Nom de la nation"
              value={name}
            />
            <Input
              required={true}
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={password}
            />
            <div className="flex justify-center text-sm gap-2">
              <span>Déjà une nation ?</span>
              <span
                className="underline cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Se connecter
              </span>
            </div>
            <Button path="" text="CRÉER SA NATION" type="submit" />
          </>
        }
      />
    </>
  );
}
