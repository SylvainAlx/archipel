import { useTranslation } from "react-i18next";
import i18n from "../../i18n/i18n";
import Tag from "./tag";
import { FaCalendarAlt } from "react-icons/fa";
import { MdOutlineUpdate } from "react-icons/md";

interface DateTagProps {
  date: Date | string;
  due?: boolean;
}

export default function DateTag({ date, due = false }: DateTagProps) {
  const { t } = useTranslation();
  return (
    <Tag
      text={new Date(date).toLocaleString(i18n.language, {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })}
      hover={t("components.hoverInfos.tags.date")}
      bgColor="bg-complementary3"
      children={due ? <MdOutlineUpdate /> : <FaCalendarAlt />}
    />
  );
}
