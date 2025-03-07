import CountUp from "react-countup";
import Tag from "./tag";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface HashtagProps {
  label: string;
  occurrence: number;
}

export default function HashTag({ label, occurrence }: HashtagProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Tag
      text={`#${label}`}
      hover={t("components.hoverInfos.tags.hash")}
      bgColor="bg-complementary3"
      click={() => {
        if (!label.includes(" ")) {
          navigate(`/explore/2#${label}`);
        }
      }}
    >
      {occurrence != -1 ? (
        <CountUp
          className="bg-complementary2 rounded-full px-1"
          end={occurrence}
        />
      ) : (
        <></>
      )}
    </Tag>
  );
}
