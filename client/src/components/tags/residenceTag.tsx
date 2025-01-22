import Tag from "./tag";
import { nationPlaceListAtomV2 } from "../../settings/store";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { getPlaceName } from "../../utils/functions";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface ResidenceTagProps {
  residenceId: string;
}

export default function ResidenceTag({ residenceId }: ResidenceTagProps) {
  const { t } = useTranslation();
  const [nationPlaceList] = useAtom(nationPlaceListAtomV2);
  const [residence, setResidence] = useState<string>(
    t("pages.citizen.noResidence"),
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (residenceId != "") {
      const residenceName = getPlaceName(
        nationPlaceList.getItems(),
        residenceId,
        t("pages.citizen.noResidence"),
      );
      setResidence(residenceName);
    } else {
      setResidence(t("pages.citizen.noResidence"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [residenceId, nationPlaceList]);

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
