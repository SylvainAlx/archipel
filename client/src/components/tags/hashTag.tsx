import Tag from "./tag";
import { customTagProps } from "../../types/typProp";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function HashTag({ label }: customTagProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Tag
      text={"#" + label.toString()}
      hover={t("components.hoverInfos.tags.hash")}
      bgColor="bg-complementary3"
      click={() => navigate("/explore/2")}
    />
  );
}
