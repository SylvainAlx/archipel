import Tag from "./tag";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaTransgenderAlt } from "react-icons/fa";
import { getGender } from "../../../utils/functions";

interface GenderTagProps {
  genderId: number;
}

export default function GenderTag({ genderId }: GenderTagProps) {
  const { t } = useTranslation();
  const [gender, setGender] = useState<string>("");
  useEffect(() => {
    const resp = getGender(genderId);
    if (resp) {
      setGender(resp);
    }
  }, [genderId]);

  return (
    <Tag
      text={gender}
      hover={t("components.hoverInfos.tags.gender")}
      bgColor="bg-info"
    >
      <FaTransgenderAlt />
    </Tag>
  );
}
