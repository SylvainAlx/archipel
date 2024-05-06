// import { useTranslation } from "react-i18next";
// import Button from "../components/buttons/button";
import { useAtom } from "jotai";
import H1 from "../components/titles/h1";
import {
  myStore,
  nationAtom,
  selectedNationAtom,
  userAtom,
} from "../settings/store";
import Button from "../components/buttons/button";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  // const { t } = useTranslation();
  const navigate = useNavigate();

  const [user] = useAtom(userAtom);
  const [nation] = useAtom(nationAtom);

  const handleClick = () => {
    myStore.set(selectedNationAtom, nation);
    navigate(`/nation/${nation.officialId}`);
  };

  return (
    <>
      <H1 text={user.name} />
      {nation.officialId != undefined && (
        <Button path="" text={nation.name} click={handleClick} />
      )}
    </>
  );
}
