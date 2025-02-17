import { useTranslation } from "react-i18next";
import { FaDiscord, FaInstagram, FaLink, FaWikipediaW } from "react-icons/fa6";
import ExternalLink from "../externalLink";
import EditButton from "../buttons/editButton";
import ShareButton from "../buttons/shareButton";
import { NationModel } from "../../models/nationModel";

interface LinksProps {
  selectedNation: NationModel;
  owner?: boolean;
  updatePath: (path: string, value: string) => void;
}

export default function Links({
  selectedNation,
  owner,
  updatePath,
}: LinksProps) {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center gap-6">
      <span className="flex items-center gap-1">
        <ExternalLink
          url={selectedNation.data.url.website}
          children={<FaLink />}
          hover={t("components.hoverInfos.links.website")}
        />
        {owner && (
          <EditButton
            editBox={{
              target: "nation",
              original: selectedNation.data.url.website,
              new: selectedNation.data.url.website,
              path: "data.url.website",
              action: updatePath,
            }}
          />
        )}
      </span>
      <span className="flex items-center gap-1">
        <ExternalLink
          url={selectedNation.data.url.instagram}
          children={<FaInstagram />}
          hover={t("components.hoverInfos.links.instagram")}
        />
        {owner && (
          <EditButton
            editBox={{
              target: "nation",
              original: selectedNation.data.url.instagram,
              new: selectedNation.data.url.instagram,
              path: "data.url.instagram",
              action: updatePath,
            }}
          />
        )}
      </span>
      <span className="flex items-center gap-1">
        <ExternalLink
          url={selectedNation.data.url.wiki}
          children={<FaWikipediaW />}
          hover={t("components.hoverInfos.links.wiki")}
        />
        {owner && (
          <EditButton
            editBox={{
              target: "nation",
              original: selectedNation.data.url.wiki,
              new: selectedNation.data.url.wiki,
              path: "data.url.wiki",
              action: updatePath,
            }}
          />
        )}
      </span>
      <span className="flex items-center gap-1">
        <ExternalLink
          url={selectedNation.data.url.discord}
          children={<FaDiscord />}
          hover={t("components.hoverInfos.links.discord")}
        />
        {owner && (
          <EditButton
            editBox={{
              target: "nation",
              original: selectedNation.data.url.discord,
              new: selectedNation.data.url.discord,
              path: "data.url.discord",
              action: updatePath,
            }}
          />
        )}
      </span>
      <ShareButton label={selectedNation.name} />
    </div>
  );
}
