import FooterNav from "../components/footerNav";
import { TITLE } from "../utils/consts";

export default function Footer() {
  return (
  <footer className="flex flex-col items-center pt-4">
    <FooterNav />
    <div className="hidden sm:block sm:text-md">{TITLE} - 2023</div>
  </footer>
  );
}
