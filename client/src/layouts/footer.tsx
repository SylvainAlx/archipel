import { Link } from "react-router-dom";
import FooterNav from "../components/footerNav";
import { TITLE } from "../settings/consts";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="animate-slideInFromBottom flex flex-col items-center">
      <FooterNav />
      <div className="z-20 flex flex-col items-center gap-1">
        <div className="hidden md:block">
          {TITLE} - {new Date().getFullYear()}
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
