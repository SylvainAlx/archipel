import { useAtom } from "jotai";
import { nationAtom } from "../utils/store";
import H1 from "../components/titles/h1";
import Button from "../components/button";
import Avatar from "../components/avatar";

export default function Dashboard() {
  const [nation] = useAtom(nationAtom);
  return (
    <>
      <Avatar
        text={nation.data.url.flagUrl ? nation.data.url.flagUrl : "/logo.png"}
      />
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
