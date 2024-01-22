import FooterNav from "../components/footerNav";
import { TITLE } from "../settings/consts";

export default function Footer() {
  return (
    <footer className="animate-fadeIn flex flex-col items-center pt-4">
      <FooterNav />
      <div className="hidden md:block md:text-md">{TITLE} - 2023</div>
    </footer>
  );
}
