/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from "jotai";
import {
  confirmBox,
  nationAtom,
  selectedNationAtom,
} from "../../../settings/store";
import { useEffect, useState } from "react";
import H1 from "../../../components/titles/h1";
import DashTile from "../../../components/dashTile";
import { StringProps } from "../../../types/typProp";
import TileContainer from "../../../components/tileContainer";
import H3 from "../../../components/titles/h3";
import BreakLine from "../../../components/breakLine";
import Button from "../../../components/button";
import GeneralInformations from "../../../components/nations/dashboard/generalInformations";

// import { GiBlackFlag } from "react-icons/gi";
// import Uploader from "../components/uploader";

export default function DashboardMain({ text }: StringProps) {
  const [myNation] = useAtom(nationAtom);
  const [selectedNation] = useAtom(selectedNationAtom);
  const [, setConfirm] = useAtom(confirmBox);
  const [owner, setOwner] = useState(false);
  const [saved, setSaved] = useState(true);

  useEffect(() => {
    if (myNation._id === selectedNation._id) {
      setOwner(true);
    }
    return () => {
      setSaved(true);
    };
  }, []);

  const saveData = () => {
    console.log(selectedNation);

    setConfirm({
      action: "updateNation",
      text: "Valider les modification ?",
      result: "",
      payload: selectedNation,
    });
    setSaved(true);
  };

  return (
    <>
      <H1 text={text} />
      <section className="w-full flex flex-col gap-8 items-center">
        <div className="w-full lg:hidden text-center">
          {saved && owner ? (
            <Button path="" text="MODIFIER" click={() => setSaved(false)} />
          ) : (
            <div className="flex flex-col md:flex-row gap-2 items-center justify-center">
              <Button path="" text="ENREGISTRER" click={saveData} />
              <Button path="" text="ANNULER" click={() => setSaved(true)} />
            </div>
          )}
        </div>
        <GeneralInformations saved={saved} />
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
            <Button path="" text="MODIFIER" click={() => setSaved(false)} />
          ) : (
            <div className="flex flex-col md:flex-row gap-2 items-center justify-center">
              <Button path="" text="ENREGISTRER" click={saveData} />
              <Button path="" text="ANNULER" click={() => setSaved(true)} />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
