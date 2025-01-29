import { RiArrowGoBackFill } from "react-icons/ri";
import Button from "./button";
import { confirmBox, myStore } from "../../settings/store";
import { FaBan } from "react-icons/fa";
import { CommonModel } from "../../models/commonModel";

interface AdminBanButtonProps {
  contentOfficialId: string;
  reverse?: boolean;
}

export default function AdminBanButton({
  contentOfficialId,
  reverse = false,
}: AdminBanButtonProps) {
  const handleAdminBan = (reverse: boolean) => {
    myStore.set(confirmBox, {
      action: "adminBan",
      text: reverse ? "Réindexer le contenu ?" : "Désindexer le contenu ?",
      result: "",
      actionToDo: () => {
        const content = new CommonModel();
        content.officialId = contentOfficialId;
        content.banContent(reverse);
      },
    });
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
