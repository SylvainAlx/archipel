import { BiSolidHide, BiShow } from "react-icons/bi";
import Button from "./button";
import { confirmBox, myStore } from "../../settings/store";

interface AdminReportButtonProps {
  contentOfficialId: string;
  reverse?: boolean;
}

export default function AdminReportButton({
  contentOfficialId,
  reverse = false,
}: AdminReportButtonProps) {
  const handleAdminReport = (reverse: boolean) => {
    if (reverse) {
      myStore.set(confirmBox, {
        action: "adminReportReverse",
        text: "Afficher le contenu ?",
        result: "",
        target: contentOfficialId,
      });
    } else {
      myStore.set(confirmBox, {
        action: "adminReport",
        text: "Masquer le contenu ?",
        result: "",
        target: contentOfficialId,
      });
    }
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
