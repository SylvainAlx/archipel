import { HiOutlineStatusOffline, HiOutlineStatusOnline } from "react-icons/hi";
import {
  getFormatedDate,
  isOlderThan30Minutes,
} from "../../../utils/functions";
import Tag from "./tag";
import { useTranslation } from "react-i18next";

interface OnlineStatusTagProps {
  citizenLastVisitDate: Date;
}

export default function OnlineStatusTag({
  citizenLastVisitDate,
}: OnlineStatusTagProps) {
  const { t } = useTranslation();
  return (
    <Tag
      text={getFormatedDate(citizenLastVisitDate)}
      hover={t("components.hoverInfos.tags.lastVisitDate")}
      bgColor="bg-complementary3"
    >
      <div className="text-xl">
        {isOlderThan30Minutes(citizenLastVisitDate) ? (
          <HiOutlineStatusOffline />
        ) : (
          <HiOutlineStatusOnline className="text-primary animate-pulse" />
        )}
      </div>
    </Tag>
  );
}
