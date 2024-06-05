import { useTranslation } from "react-i18next";
import { FaDiscord, FaInstagram, FaLink, FaWikipediaW } from "react-icons/fa6";
import { SelectedNationProps } from "../../types/typProp";
import ExternalLink from "../externalLink";
import EditIcon from "../editIcon";

export default function Links({ selectedNation, owner }: SelectedNationProps) {
  const { t } = useTranslation();
  return (
    <div className="w-full flex items-center justify-center gap-6">
      <span className="flex items-center gap-2">
        <ExternalLink
          url={selectedNation.data.url.website}
          children={<FaLink />}
          hover={t("components.hoverInfos.links.website")}
        />
        {owner && (
          <EditIcon
            target="nation"
            param={selectedNation.data.url.website}
            path="data.url.website"
          />
        )}
      </span>
      <span className="flex items-center gap-2">
        <ExternalLink
          url={selectedNation.data.url.instagram}
          children={<FaInstagram />}
          hover={t("components.hoverInfos.links.instagram")}
        />
        {owner && (
          <EditIcon
            target="nation"
            param={selectedNation.data.url.instagram}
            path="data.url.instagram"
          />
        )}
      </span>
      <span className="flex items-center gap-2">
        <ExternalLink
          url={selectedNation.data.url.wiki}
          children={<FaWikipediaW />}
          hover={t("components.hoverInfos.links.wiki")}
        />
        {owner && (
          <EditIcon
            target="nation"
            param={selectedNation.data.url.wiki}
            path="data.url.wiki"
          />
        )}
      </span>
      <span className="flex items-center gap-2">
        <ExternalLink
          url={selectedNation.data.url.discord}
          children={<FaDiscord />}
          hover={t("components.hoverInfos.links.discord")}
        />
        {owner && (
          <EditIcon
            target="nation"
            param={selectedNation.data.url.discord}
            path="data.url.discord"
          />
        )}
      </span>
    </div>
  );
}
