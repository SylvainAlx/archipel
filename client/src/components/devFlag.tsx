import { useTranslation } from "react-i18next";
import { ImLab } from "react-icons/im";

export default function DevFlag() {
  const { t } = useTranslation();
  return (
    <div className="p-2 flex items-center justify-center gap-2 bg-slate-600 rounded w-max">
      <ImLab />
      <p>{t("components.hoverInfos.dev")}</p>
    </div>
  );
}
