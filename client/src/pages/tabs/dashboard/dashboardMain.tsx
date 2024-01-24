/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from "jotai";
import {
  confirmBox,
  nationAtom,
  selectedNationAtom,
} from "../../../settings/store";
import { ChangeEvent, useEffect, useState } from "react";
import { EmptyNation } from "../../../types/typNation";
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

// import { GiBlackFlag } from "react-icons/gi";
// import Uploader from "../components/uploader";

export default function DashboardMain({ text }: StringProps) {
  const [myNation] = useAtom(nationAtom);
  const [selectedNation] = useAtom(selectedNationAtom);
  const [, setConfirm] = useAtom(confirmBox);
  const [nation, setNation] = useState(EmptyNation);
  const [owner, setOwner] = useState(false);
  const [saved, setSaved] = useState(true);

  useEffect(() => {
    if (myNation._id === selectedNation._id) {
      setNation(myNation);
      setOwner(true);
    } else {
      setNation(selectedNation);
      setOwner(false);
    }
  }, [selectedNation]);

  const saveData = () => {
    setConfirm({
      action: "updateNation",
      text: "Valider les modification ?",
      result: "",
      payload: nation,
    });
    setNation(myNation);
    setSaved(true);
  };

  const edit = () => {
    regimeOptions.sort((a, b) => {
      if (a.id === nation.data.general.regime) {
        return -1; // Met l'objet a en première position
      } else if (b.id === nation.data.general.regime) {
        return 1; // Met l'objet b en première position
      } else {
        return 0; // Laisse les autres objets inchangés dans leur ordre relatif
      }
    });
    setSaved(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let editedNation = nation;
    const name = e.target.name;
    if (name === "name") {
      editedNation = { ...editedNation, [e.target.name]: e.target.value };
    }
    setNation(editedNation);
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    let editedNation = nation;
    editedNation.data.general.regime = Number(e.target.value);
    setNation(editedNation);
  };

  return (
    <>
      <H1 text={text} />
      <section className="w-full flex flex-col gap-8 items-center">
        <div className="w-full md:hidden text-center">
          {saved ? (
            <Button path="" text="MODIFIER" click={edit} />
          ) : (
            <Button path="" text="ENREGISTRER" click={saveData} />
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
                        {nation.role === "admin" && (
                          <Tag text="admin" bgColor="bg-success" />
                        )}
                        {regimeOptions.map((regime, i) => {
                          if (regime.id === nation.data.general.regime) {
                            return (
                              <span key={i}>
                                <Tag
                                  text={regime.label}
                                  bgColor={regime.color}
                                />
                              </span>
                            );
                          }
                        })}
                      </div>
                      <H3 text={nation.name} />
                    </>
                  ) : (
                    <div className="p-4 flex flex-col gap-2 items-center">
                      <Select
                        options={regimeOptions}
                        required
                        onChange={handleSelectChange}
                      />
                      <Input
                        required
                        placeholder={nation.name}
                        value={nation.name}
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
                      {nation.data.url.flagUrl ? (
                        <img
                          src={nation.data.url.flagUrl}
                          alt={`flag of ${nation.name}`}
                          className="w-full h-full"
                        />
                      ) : (
                        <div className="text-[3.1rem]">
                          <GiBlackFlag />
                        </div>
                      )}
                    </div>
                    <em>
                      {nation.data.general.motto
                        ? nation.data.general.motto
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
                      {nation.data.url.websiteUrl ? (
                        <a
                          href={nation.data.url.websiteUrl}
                          className="cursor-pointer"
                        >
                          <div className="text-[3.1rem] flex justify-center">
                            <FaLink />
                          </div>
                          <p>{nation.data.url.websiteUrl}</p>
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
                    <H3 text={nation.data.general.points.toString()} />
                  </>
                }
              />
              <DashTile
                title="Points non attribués"
                children={
                  <>
                    <H3 text={nation.data.general.unusedPoints.toString()} />
                  </>
                }
              />
            </>
          }
        />
        {saved ? (
          <Button path="" text="MODIFIER" click={edit} />
        ) : (
          <Button path="" text="ENREGISTRER" click={saveData} />
        )}
        {owner && <></>}
      </section>
    </>
  );
}
