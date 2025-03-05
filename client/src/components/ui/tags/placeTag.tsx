import Tag from "./tag";
import { customTagProps } from "../../../types/typProp";
import { MdLandscape, MdPlace } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export default function PlaceTag({ label }: customTagProps) {
  const { t } = useTranslation();
  const [updatedLabel, setUpdatedLabel] = useState(
    t("components.hoverInfos.tags.places"),
  );

  useEffect(() => {
    if (typeof label === "number" && label < 2) {
      setUpdatedLabel(t("components.hoverInfos.tags.places").slice(0, -1));
    }
  }, [label, t]);

  return (
    <>
      {typeof label === "string" ? (
        <Tag
          text={label.toString()}
          hover={t("components.hoverInfos.tags.place")}
          bgColor="bg-info"
        >
          <MdPlace />
        </Tag>
      ) : (
        <Tag
          text={label.toString() + " " + updatedLabel}
          hover={t("components.hoverInfos.tags.places")}
          bgColor="bg-info"
        >
          <MdLandscape />
        </Tag>
      )}
    </>
  );
}
