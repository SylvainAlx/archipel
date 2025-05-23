import { Link } from "react-router-dom";
import FooterNav from "../components/nav/footerNav";
import { ADMIN_EMAIL, APP_NAME, INSTAGRAM_URL } from "../settings/consts";
import { useTranslation } from "react-i18next";
import { lobbyAtom } from "../settings/store";
import { useAtom } from "jotai";
import { BsFillEnvelopeAtFill } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa6";
import ReleaseNotesLink from "../components/ui/releaseNotesLink";

export default function Footer() {
  const { t } = useTranslation();
  const [access] = useAtom(lobbyAtom);

  return (
    <footer className="animate-slideInFromBottom flex flex-col items-center">
      {access && <FooterNav />}
      <div className="hidden z-10 md:flex flex-col items-center gap-1">
        <div>
          {APP_NAME.toUpperCase()} - {new Date().getFullYear()}
        </div>
        <ReleaseNotesLink smallSize={true} />
        <div className="pb-1 flex items-center gap-2 text-[10px] md:text-[12px] opacity-30 md:opacity-100">
          <Link
            className="transition-colors cursor-pointer hover:text-secondary3"
            to="/termsofservice"
          >
            {t("pages.termsOfService.title")}
          </Link>
          <Link
            to={`mailto:${ADMIN_EMAIL}`}
            target="_blank"
            className="mx-2 transition-colors cursor-pointer hover:text-secondary3 flex items-center gap-1"
          >
            <BsFillEnvelopeAtFill />
            {t("components.buttons.contact")}
          </Link>
          {INSTAGRAM_URL != "" && (
            <Link
              to={INSTAGRAM_URL}
              target="_blank"
              className="mx-2 transition-colors cursor-pointer hover:text-secondary3 flex items-center gap-1"
            >
              <FaInstagram />
              Instagram
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}
