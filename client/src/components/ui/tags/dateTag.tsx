import { useTranslation } from "react-i18next";
import Tag from "./tag";
import { FaCalendarAlt } from "react-icons/fa";
import { MdOutlineUpdate } from "react-icons/md";
import { getFormatedDate } from "../../../utils/functions";

interface DateTagProps {
  date: Date | string;
  due?: boolean;
}

export default function DateTag({ date, due = false }: DateTagProps) {
  const { t } = useTranslation();
  return (
    <Tag
      text={getFormatedDate(date)}
      hover={t("components.hoverInfos.tags.registration")}
      bgColor="bg-complementary3"
      children={due ? <MdOutlineUpdate /> : <FaCalendarAlt />}
    />
  );
}
