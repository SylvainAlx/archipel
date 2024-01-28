/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from "jotai";
import {
  confirmBox,
  nationAtom,
  selectedNationAtom,
} from "../../../settings/store";
import { ChangeEvent, useEffect, useState } from "react";
import H1 from "../../../components/titles/h1";
import DashTile from "../../../components/dashTile";
import { StringProps } from "../../../types/typProp";
import { GiBlackFlag } from "react-icons/gi";
import { FaLink } from "react-icons/fa6";
import Tag from "../../../components/tag";
import TileContainer from "../../../components/tileContainer";
import H3 from "../../../components/titles/h3";
import BreakLine from "../../../components/breakLine";
import Button from "../../../components/button";
import { regimeOptions } from "../../../settings/consts";
import Select from "../../../components/form/select";
import Input from "../../../components/form/input";
import { EmptyNation } from "../../../types/typNation";

// import { GiBlackFlag } from "react-icons/gi";
// import Uploader from "../components/uploader";

export default function DashboardMain({ text }: StringProps) {
  const [myNation] = useAtom(nationAtom);
  const [selectedNation] = useAtom(selectedNationAtom);
  const [, setConfirm] = useAtom(confirmBox);
  const [owner, setOwner] = useState(false);
  const [saved, setSaved] = useState(true);
  const [regimeValue, setRegimeValue] = useState(regimeOptions[0].id);
  const [regimeTag, setRegimeTag] = useState(regimeOptions[0]);
  const [tempNation, setTempNation] = useState(EmptyNation);

  useEffect(() => {
    if (myNation._id === selectedNation._id) {
      setOwner(true);
    }
    setTempNation(selectedNation);
    setRegimeValue(selectedNation.data.general.regime);
    return () => {
      cancel();
    };
  }, []);

  useEffect(() => {
    const editedNation = { ...tempNation };
    editedNation.data.general.regime = regimeValue;
    setTempNation(editedNation);
    updateRegimeTag(regimeValue);
  }, [regimeValue]);

  const saveData = () => {
    setConfirm({
      action: "updateNation",
      text: "Valider les modification ?",
      result: "",
      payload: tempNation,
    });
    setSaved(true);
  };

  const cancel = () => {
    setSaved(true);
    setRegimeValue(selectedNation.data.general.regime);
    // setTempNation(selectedNation);
  };

  const edit = () => {
    setSaved(false);
    // setTempNation(selectedNation);
  };

  const updateRegimeTag = (value: number) => {
    regimeOptions.map((regime) => {
      if (regime.id === value) {
        setRegimeTag(regime);
      }
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let editedNation = tempNation;
    const name = e.target.name;
    if (name === "name") {
      editedNation = { ...editedNation, [e.target.name]: e.target.value };
    }
    setTempNation(editedNation);
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRegimeValue(Number(e.target.value));
  };

  return (
    <>
      <H1 text={text} />
      <section className="w-full flex flex-col gap-8 items-center">
        <div className="w-full md:hidden text-center">
          {saved && owner ? (
            <Button path="" text="MODIFIER" click={edit} />
          ) : (
            <div className="flex flex-col md:flex-row gap-2 items-center justify-center">
              <Button path="" text="ENREGISTRER" click={saveData} />
              <Button path="" text="ANNULER" click={cancel} />
            </div>
          )}
        </div>
        <TileContainer
          children={
            <>
              <DashTile
                title="Informations générales"
                className="w-full"
                children={
                  saved ? (
                    <>
                      <div className="flex gap-2">
                        {selectedNation.role === "admin" && (
                          <Tag text="admin" bgColor="bg-success" />
                        )}

                        <Tag text={regimeTag.label} bgColor={regimeTag.color} />
                      </div>
                      <H3 text={selectedNation.name} />
                    </>
                  ) : (
                    <div className="p-4 flex flex-col gap-2 items-center">
                      <Select
                        options={regimeOptions}
                        onChange={handleSelectChange}
                        value={regimeTag.id}
                      />
                      <Input
                        placeholder={tempNation.name}
                        value={tempNation.name}
                        name="name"
                        onChange={handleInputChange}
                        type="text"
                      />
                    </div>
                  )
                }
              />
              <DashTile
                title="Symboles"
                children={
                  <>
                    <div className="w-[50px] h-[50px] bg-complementary rounded-full flex flex-col items-center justify-center">
                      {selectedNation.data.url.flagUrl ? (
                        <img
                          src={selectedNation.data.url.flagUrl}
                          alt={`flag of ${selectedNation.name}`}
                          className="w-full h-full"
                        />
                      ) : (
                        <div className="text-[3.1rem]">
                          <GiBlackFlag />
                        </div>
                      )}
                    </div>
                    <em>
                      {selectedNation.data.general.motto
                        ? selectedNation.data.general.motto
                        : "Pas de devise"}
                    </em>
                  </>
                }
              />

              <DashTile
                title="Lien externe"
                children={
                  <>
                    <div className=" bg-complementary rounded-full flex flex-col items-center justify-center">
                      {selectedNation.data.url.websiteUrl ? (
                        <a
                          href={selectedNation.data.url.websiteUrl}
                          className="cursor-pointer"
                        >
                          <div className="text-[3.1rem] flex justify-center">
                            <FaLink />
                          </div>
                          <p>{selectedNation.data.url.websiteUrl}</p>
                        </a>
                      ) : (
                        <div>
                          <div className="text-[3.1rem] flex justify-center cursor-not-allowed">
                            <FaLink />
                          </div>
                          <p>aucun lien</p>
                        </div>
                      )}
                    </div>
                  </>
                }
              />
            </>
          }
        />
        <BreakLine />
        <TileContainer
          children={
            <>
              <DashTile
                title="Total points Navir"
                children={
                  <>
                    <H3 text={selectedNation.data.general.points.toString()} />
                  </>
                }
              />
              <DashTile
                title="Points non attribués"
                children={
                  <>
                    <H3
                      text={selectedNation.data.general.unusedPoints.toString()}
                    />
                  </>
                }
              />
            </>
          }
        />
        <div className="w-full text-center">
          {saved && owner ? (
            <Button path="" text="MODIFIER" click={edit} />
          ) : (
            <div className="flex flex-col md:flex-row gap-2 items-center justify-center">
              <Button path="" text="ENREGISTRER" click={saveData} />
              <Button path="" text="ANNULER" click={cancel} />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
