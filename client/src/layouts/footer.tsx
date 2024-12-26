import { Link, useNavigate } from "react-router-dom";
import FooterNav from "../components/footerNav";
import { ADMIN_EMAIL, VERSION } from "../settings/consts";
import { useTranslation } from "react-i18next";
import { lobbyAtom } from "../settings/store";
import { useAtom } from "jotai";
import { BsFillEnvelopeAtFill } from "react-icons/bs";

export default function Footer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [access] = useAtom(lobbyAtom);
  return (
    <footer className="animate-slideInFromBottom flex flex-col items-center">
      {access && <FooterNav />}
      <div className="hidden z-10 md:flex flex-col items-center gap-1">
        <div>
          {t("components.logo.title")} - {new Date().getFullYear()}
        </div>
        <div
          className="text-[12px] cursor-pointer hover:text-secondary"
          onClick={() => navigate("/releasenotes")}
        >
          {VERSION.beta != "" && "BETA-" + VERSION.beta}
          {VERSION.rc != "" && VERSION.rc}
          {VERSION.release != "" && VERSION.release}
        </div>
        <div className="pb-1 flex items-center gap-2 text-[10px] md:text-[12px] opacity-30 md:opacity-100">
          <Link
            className="transition-colors cursor-pointer hover:text-secondary"
            to="/termsofservice"
          >
            {t("pages.termsOfService.title")}
          </Link>
          <Link
            to={`mailto:${ADMIN_EMAIL}`}
            className="mx-2 transition-colors cursor-pointer hover:text-secondary flex items-center gap-1"
          >
            <BsFillEnvelopeAtFill />
            {t("components.buttons.contact")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
