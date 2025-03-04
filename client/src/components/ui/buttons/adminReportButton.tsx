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
      actionToDo: () => {
        const content = new CommonModel();
        content.officialId = contentOfficialId;
        content.reportContent(reverse);
      },
    });
  };

  return (
    <>
      {reverse ? (
        <Button
          text="afficher"
          bgColor="bg-wait"
          children={<BiShow />}
          click={() => handleAdminReport(true)}
        />
      ) : (
        <Button
          text="masquer"
          bgColor="bg-wait"
          children={<BiSolidHide />}
          click={() => handleAdminReport(false)}
        />
      )}
    </>
  );
}
