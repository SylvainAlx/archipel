import Tag from "./tag";
import { customTagProps } from "../../types/typProp";
import { useTranslation } from "react-i18next";
import { GiFireworkRocket } from "react-icons/gi";

export default function NationalDayTag({ label }: customTagProps) {
  const { t, i18n } = useTranslation();

  const date: Date = new Date(label);

  const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };

  const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat(
    i18n.language,
    options,
  );

  const formattedDate: string = formatter.format(date);

  return (
    <Tag
      text={formattedDate != "" ? formattedDate.toString() : "non défini"}
      hover={t("components.hoverInfos.tags.nationalDay")}
      bgColor="bg-info"
      children={<GiFireworkRocket />}
    />
  );
}
