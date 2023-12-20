import { useAtom } from "jotai";
import { nationAtom } from "../utils/store";
import H1 from "../components/titles/h1";
import Button from "../components/button";
import Avatar from "../components/avatar";
import { GiBlackFlag } from "react-icons/gi";

export default function Dashboard() {
  const [nation] = useAtom(nationAtom);
  return (
    <>
      {nation.data.url.flagUrl ? (
        <Avatar
        text={nation.data.url.flagUrl}
      />
      ):(
       <div className="text-[50px]">
         <GiBlackFlag />
       </div>
      )}
      
      <H1 text={nation.name} />
      <em className="text-xl">
        {nation.data.general.motto
          ? nation.data.general.motto
          : "Pas, Encore, De, Devise !"}
      </em>
      <fieldset>
        <legend>Informations générales</legend>
        Points : {nation.data.general.points}
      </fieldset>
      <Button path="delete" text="SUPPRIMER SA NATION" />
    </>
  );
}
