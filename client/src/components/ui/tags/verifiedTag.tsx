import { useState } from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import HoverInfo from "../hoverInfo";
import { useTranslation } from "react-i18next";
import Tag from "./tag";

interface VerifiedTagProps {
  isFullTag?: boolean;
}

export default function VerifiedTag({ isFullTag = false }: VerifiedTagProps) {
  const { t } = useTranslation();
  const [showInfo, setShowInfo] = useState(false);
  return (
    <>
      {isFullTag ? (
        <Tag
          text={t("components.hoverInfos.tags.official")}
          hover={t("components.hoverInfos.tags.official")}
          bgColor="bg-info"
        >
          <RiVerifiedBadgeFill />
        </Tag>
      ) : (
        <>
          <RiVerifiedBadgeFill
            onMouseEnter={() => setShowInfo(true)}
            onMouseLeave={() => setShowInfo(false)}
            className="text-info text-xl"
          />
          {showInfo && (
            <HoverInfo text={t("components.hoverInfos.tags.official")} />
          )}
        </>
      )}
    </>
  );
}
