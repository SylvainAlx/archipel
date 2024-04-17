import { useTranslation } from "react-i18next";
import { NumberProps } from "../../types/typProp";
import Tag from "./tag";

export default function IndexTag({ text }: NumberProps) {
  const { t } = useTranslation();
  return (
    <div className="absolute bottom-2 left-2 shadow-md">
      <Tag
        text={(text + 1).toString()}
        hover={t("components.hoverInfos.tags.index")}
        bgColor="bg-black_alpha"
      />
    </div>
  );
}
