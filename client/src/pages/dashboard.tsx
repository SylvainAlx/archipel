import { useAtom } from "jotai";
import { nationAtom, selectedNation } from "../settings/store";
import H1 from "../components/titles/h1";
import Button from "../components/button";
// import { GiBlackFlag } from "react-icons/gi";
// import Uploader from "../components/uploader";

export default function Dashboard() {
  const [myNation] = useAtom(nationAtom);
  const [nation] = useAtom(selectedNation);

  return (
    <>
      <H1 text={nation.name} />
      {myNation._id === nation._id && (
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
