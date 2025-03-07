import Tag from "./tag";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { religionList } from "../../../settings/lists";
import { StandardOption } from "../../../types/typAtom";
import { FaPray } from "react-icons/fa";

interface ReligionTagProps {
  religionId: number;
}

export default function ReligionTag({ religionId }: ReligionTagProps) {
  const { t } = useTranslation();
  const [religion, setReligion] = useState<StandardOption>(religionList[0]);
  useEffect(() => {
    const resp = religionList.filter(
      (religion) => religion.id === religionId,
    )[0];
    if (resp) {
      setReligion(resp);
    }
  }, [religionId]);

  return (
    <Tag
      text={religion.label.toString()}
      hover={t("components.hoverInfos.tags.religion")}
      bgColor="bg-info"
    >
      <FaPray />
    </Tag>
  );
}
