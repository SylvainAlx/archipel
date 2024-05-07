// import { useTranslation } from "react-i18next";
// import Button from "../components/buttons/button";
import { useAtom } from "jotai";
import H1 from "../components/titles/h1";
import {
  confirmBox,
  myStore,
  nationAtom,
  selectedNationAtom,
  userAtom,
} from "../settings/store";
import Button from "../components/buttons/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [user] = useAtom(userAtom);
  const [nation] = useAtom(nationAtom);

  const handleClick = () => {
    myStore.set(selectedNationAtom, nation);
    navigate(`/nation/${nation.officialId}`);
  };

  const handleDelete = () => {
    myStore.set(confirmBox, {
      action: "deleteUser",
      text: t("components.modals.confirmModal.deleteUser"),
      result: "",
    });
  };

  return (
    <>
      <H1 text={user.name} />
      {nation.officialId != "" && (
        <Button text={nation.name} click={handleClick} />
      )}
      <Button text="SUPPRIMER SON COMPTE" click={handleDelete} />
    </>
  );
}
