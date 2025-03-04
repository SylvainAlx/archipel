import { useTranslation } from "react-i18next";
import { ImLab } from "react-icons/im";
import { Link } from "react-router-dom";

export default function DevFlag() {
  const { t } = useTranslation();
  return (
    <Link
      to="/releasenotes"
      className="w-full flex items-center justify-center"
    >
      <div className="w-max my-2 p-2 flex items-center justify-center gap-2 bg-complementary3 hover:bg-complementary2 transition-all rounded">
        <ImLab />
        <p>{t("components.hoverInfos.dev")}</p>
      </div>
    </Link>
  );
}
