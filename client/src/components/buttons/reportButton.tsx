import Button from "./button";
import { useTranslation } from "react-i18next";
import { MdReport } from "react-icons/md";
import { confirmBox, myStore, sessionAtom } from "../../settings/store";
import { ComPayload } from "../../types/typCom";

interface ReportButtonProps {
  contentOfficialId: string;
  small?: boolean;
}

export default function ReportButton({ contentOfficialId }: ReportButtonProps) {
  const { t } = useTranslation();

  const handleClick = () => {
    const payload: ComPayload = {
      comType: 0,
      destination: contentOfficialId,
      origin: myStore.get(sessionAtom).user.officialId,
      title: "Report",
      message: "",
    };
    myStore.set(confirmBox, {
      action: "reportContent",
      text: t("components.modals.confirmModal.reportContent"),
      result: "",
      payload,
    });
  };
  return (
    <Button
      text={t("components.buttons.report")}
      bgColor="bg-danger"
      click={handleClick}
      children={<MdReport />}
    />
  );
}
