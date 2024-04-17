import Tag from "./tag";
import { customTagProps } from "../../types/typProp";
import { MdLandscape, MdPlace } from "react-icons/md";
import { useTranslation } from "react-i18next";

export default function PlaceTag({ label }: customTagProps) {
  const { t } = useTranslation();
  return (
    <>
      {typeof label === "string" ? (
        <Tag
          text={label.toString()}
          hover={t("components.hoverInfos.tags.place")}
          bgColor="bg-info"
          children={<MdPlace />}
        />
      ) : (
        <Tag
          text={label.toString()}
          hover={t("components.hoverInfos.tags.places")}
          bgColor="bg-info"
          children={<MdLandscape />}
        />
      )}
    </>
  );
}
