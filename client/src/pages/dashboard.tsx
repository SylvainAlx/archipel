/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from "jotai";
import { nationAtom, selectedNationAtom } from "../settings/store";
import H1 from "../components/titles/h1";
import Button from "../components/button";
import { useEffect, useState } from "react";
import { EmptyNation } from "../types/typNation";
// import { GiBlackFlag } from "react-icons/gi";
// import Uploader from "../components/uploader";

export default function Dashboard() {
  const [myNation] = useAtom(nationAtom);
  const [selectedNation] = useAtom(selectedNationAtom);
  const [nation, setNation] = useState(EmptyNation);
  const [owner, setOwner] = useState(false);

  useEffect(() => {
    if (myNation._id === selectedNation._id) {
      setNation(myNation);
      setOwner(true);
    } else {
      setNation(selectedNation);
      setOwner(false);
    }
  }, []);

  return (
    <>
      <H1 text={nation.name} />
      {owner && (
        <>
          <Button path="delete" text="SUPPRIMER LA NATION" />
        </>
      )}
    </>
  );
}
{
  /* {nation.data.url.flagUrl ? (
        <Avatar text={nation.data.url.flagUrl} />
      ) : (
        <div className="text-[50px]">
          <GiBlackFlag />
        </div>
      )}
      
      
       */
}
