import { RiArrowGoBackFill } from "react-icons/ri";
import Button from "./button";
import { confirmBox, myStore } from "../../settings/store";
import { FaBan } from "react-icons/fa";

interface AdminBanButtonProps {
  contentOfficialId: string;
  reverse?: boolean;
}

export default function AdminBanButton({
  contentOfficialId,
  reverse = false,
}: AdminBanButtonProps) {
  const handleAdminBan = (reverse: boolean) => {
    if (reverse) {
      myStore.set(confirmBox, {
        action: "adminBanReverse",
        text: "Réindexer le contenu ?",
        result: "",
        target: contentOfficialId,
      });
    } else {
      myStore.set(confirmBox, {
        action: "adminBan",
        text: "Désindexer le contenu ?",
        result: "",
        target: contentOfficialId,
      });
    }
  };

  return (
    <>
      {reverse ? (
        <Button
          text="débannir"
          bgColor="bg-danger"
          children={<RiArrowGoBackFill />}
          click={() => handleAdminBan(true)}
        />
      ) : (
        <Button
          text="bannir"
          bgColor="bg-danger"
          children={<FaBan />}
          click={() => handleAdminBan(false)}
        />
      )}
    </>
  );
}
