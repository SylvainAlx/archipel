import { Link, useNavigate } from "react-router-dom";
import FooterNav from "../components/footerNav";
import { VERSION } from "../settings/consts";
import { useTranslation } from "react-i18next";
import { lobbyAtom } from "../settings/store";
import { useAtom } from "jotai";

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
          {VERSION.beta != "" && VERSION.beta}
          {VERSION.rc != "" && VERSION.rc}
          {VERSION.release != "" && VERSION.release}
        </div>
        <div className=" pb-1 flex gap-2 text-[10px] md:text-[12px] opacity-30 md:opacity-100">
          <Link to="/legalnotice">{t("pages.legalNotice.title")}</Link>
          <span>-</span>
          <Link to="/termsofservice">{t("pages.termsOfService.title")}</Link>
        </div>
      </div>
    </footer>
  );
}
