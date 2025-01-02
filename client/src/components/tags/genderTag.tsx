import Tag from "./tag";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { genderList } from "../../settings/lists";
import { StandardOption } from "../../types/typAtom";
import { FaTransgenderAlt } from "react-icons/fa";

interface GenderTagProps {
  genderId: number;
}

export default function GenderTag({ genderId }: GenderTagProps) {
  const { t } = useTranslation();
  const [gender, setGender] = useState<StandardOption>(genderList[0]);
  useEffect(() => {
    const resp = genderList.filter((gender) => gender.id === genderId)[0];
    if (resp) {
      setGender(resp);
    }
  }, [genderId]);

  return (
    <Tag
      text={gender.label.toString()}
      hover={t("components.hoverInfos.tags.gender")}
      bgColor="bg-info"
      children={<FaTransgenderAlt />}
    />
  );
}
