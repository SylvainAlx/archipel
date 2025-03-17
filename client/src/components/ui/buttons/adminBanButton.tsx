import { RiArrowGoBackFill } from "react-icons/ri";
import Button from "./button";
import { confirmBox, myStore } from "../../../settings/store";
import { FaBan } from "react-icons/fa";
import { CommonModel } from "../../../models/commonModel";

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
      text: reverse ? "Réindexer le contenu ?" : "Désindexer le contenu ?",
      actionToDo: async () => {
        const content = new CommonModel();
        content.officialId = contentOfficialId;
        await content.banContent(reverse);
      },
    });
  };

  return (
    <>
      {reverse ? (
        <Button
          text="débannir"
          bgColor="bg-danger"
          click={() => handleAdminBan(true)}
        >
          <RiArrowGoBackFill />
        </Button>
      ) : (
        <Button
          text="bannir"
          bgColor="bg-danger"
          click={() => handleAdminBan(false)}
        >
          <FaBan />
        </Button>
      )}
    </>
  );
}
