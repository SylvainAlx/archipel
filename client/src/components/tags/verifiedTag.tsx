import { useState } from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import HoverInfo from "../hoverInfo";
import { useTranslation } from "react-i18next";

export default function VerifiedTag() {
  const { t } = useTranslation();
  const [showInfo, setShowInfo] = useState(false);
  return (
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
  );
}
