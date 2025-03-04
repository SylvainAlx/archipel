import { FaUserGroup } from "react-icons/fa6";
import Tag from "./tag";
import { customTagProps } from "../../../types/typProp";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export default function PopulationTag({ label }: customTagProps) {
  const { t } = useTranslation();
  const [updatedLabel, setUpdatedLabel] = useState(
    t("components.hoverInfos.tags.population"),
  );

  useEffect(() => {
    if (typeof label === "number" && label < 2) {
      setUpdatedLabel(t("components.hoverInfos.tags.population").slice(0, -1));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [label]);
  return (
    <Tag
      text={label.toString() + " " + updatedLabel}
      hover={t("components.hoverInfos.tags.population")}
      bgColor="bg-info"
      children={<FaUserGroup />}
    />
  );
}
