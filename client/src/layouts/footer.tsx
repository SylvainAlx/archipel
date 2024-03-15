import { Link } from "react-router-dom";
import FooterNav from "../components/footerNav";
import { TITLE } from "../settings/consts";

export default function Footer() {
  return (
    <footer className="animate-fadeIn flex flex-col items-center pt-4">
      <FooterNav />
      <div className="hidden md:flex flex-col items-center md:text-md">
        <div>
          {TITLE} - {new Date().getFullYear()}
        </div>
        <div className="text-[10px] flex gap-2">
          <Link to="/legalnotice">mentions légales</Link>
          <span>-</span>
          <Link to="/termsofservice">conditions générales d'utilisation</Link>
        </div>
      </div>
    </footer>
  );
}
