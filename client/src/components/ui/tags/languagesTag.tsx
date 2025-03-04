import Tag from "./tag";
import { useTranslation } from "react-i18next";
import { IoLanguage } from "react-icons/io5";
import { getLanguageLabel } from "../../../utils/functions";

export interface LangagesTagPros {
  language: string;
}

export default function LanguagesTag({ language }: LangagesTagPros) {
  const { t } = useTranslation();

  return (
    <Tag
      text={getLanguageLabel(language)}
      hover={t("components.hoverInfos.tags.languages")}
      bgColor="bg-info"
      children={<IoLanguage />}
    />
  );
}
