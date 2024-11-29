import { useTranslation } from "react-i18next";
import { IoWarning } from "react-icons/io5";

export default function ReportedFlag() {
  const { t } = useTranslation();
  return (
    <div className="animate-pulse text-danger text-xl flex items-center justify-center gap-2">
      <IoWarning />
      <strong className="text-danger">{t("toasts.reported")}</strong>
    </div>
  );
}
