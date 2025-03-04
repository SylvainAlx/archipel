import Tag from "./tag";
import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PlaceListModel } from "../../../models/lists/placeListModel";

interface ResidenceTagProps {
  residenceId: string;
  nationPlaces: PlaceListModel;
}

export default function ResidenceTag({
  residenceId,
  nationPlaces,
}: ResidenceTagProps) {
  const { t } = useTranslation();
  const [residence, setResidence] = useState<string>(
    t("pages.citizen.noResidence"),
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (residenceId != "") {
      setResidence(
        nationPlaces.findPlaceName(residenceId, t("pages.citizen.noResidence")),
      );
    } else {
      setResidence(t("pages.citizen.noResidence"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [residenceId, nationPlaces]);

  return (
    <Tag
      click={() => residenceId != "" && navigate(`/place/${residenceId}`)}
      hover={t("components.hoverInfos.tags.residence")}
      text={residence}
      bgColor="bg-info"
      children={
        <>
          <FaLocationDot />
        </>
      }
    />
  );
}
