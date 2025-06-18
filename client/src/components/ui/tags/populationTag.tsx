import { FaUserGroup } from "react-icons/fa6";
import Tag from "./tag";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

interface PopulationTagProps {
  count: number;
  label?: string;
}

export default function PopulationTag({ count, label }: PopulationTagProps) {
  const { t } = useTranslation();
  const [updatedLabel, setUpdatedLabel] = useState(
    t("components.hoverInfos.tags.population"),
  );

  useEffect(() => {
    const finalLabel = label
      ? label
      : t("components.hoverInfos.tags.population");
    if (count < 2) {
      setUpdatedLabel(finalLabel.slice(0, -1));
    } else {
      setUpdatedLabel(finalLabel);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <Tag
      text={count.toString() + " " + updatedLabel}
      hover={t("components.hoverInfos.tags.population")}
      bgColor="bg-info"
    >
      <FaUserGroup />
    </Tag>
  );
}
