import { BiSolidHide, BiShow } from "react-icons/bi";
import Button from "./button";
import { confirmBox, myStore } from "../../../settings/store";
import { CommonModel } from "../../../models/commonModel";

interface AdminReportButtonProps {
  contentOfficialId: string;
  reverse?: boolean;
}

export default function AdminReportButton({
  contentOfficialId,
  reverse = false,
}: AdminReportButtonProps) {
  const handleAdminReport = (reverse: boolean) => {
    myStore.set(confirmBox, {
      text: reverse ? "Afficher le contenu ?" : "Masquer le contenu ?",
      actionToDo: async () => {
        const content = new CommonModel();
        content.officialId = contentOfficialId;
        await content.reportContent(reverse);
      },
    });
  };

  return (
    <>
      {reverse ? (
        <Button
          text="afficher"
          bgColor="bg-wait"
          click={() => handleAdminReport(true)}
        >
          <BiShow />
        </Button>
      ) : (
        <Button
          text="masquer"
          bgColor="bg-wait"
          click={() => handleAdminReport(false)}
        >
          <BiSolidHide />
        </Button>
      )}
    </>
  );
}
