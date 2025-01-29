import { Link } from "react-router-dom";
import FooterNav from "../components/footerNav";
import {
  ADMIN_EMAIL,
  APP_NAME,
  INSTAGRAM_URL,
  THREADS_URL,
} from "../settings/consts";
import { useTranslation } from "react-i18next";
import { lobbyAtom, nationListAtomV2, sessionAtom } from "../settings/store";
import { useAtom } from "jotai";
import { BsFillEnvelopeAtFill, BsThreads } from "react-icons/bs";
import ReleaseNotesLink from "../components/releaseNotesLink";
import { FaInstagram } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { NationModel } from "../models/nationModel";

export default function Footer() {
  const { t } = useTranslation();
  const [access] = useAtom(lobbyAtom);
  const [session] = useAtom(sessionAtom);
  const [nationList] = useAtom(nationListAtomV2);
  const [nation, setNation] = useState<NationModel>(new NationModel());

  useEffect(() => {
    const loadNation = async (officialId: string) => {
      const loadedNation = nationList.getByOfficialId(officialId);
      if (loadedNation) {
        setNation(loadedNation);
      }
    };
    if (session.user.citizenship.nationId != "") {
      loadNation(session.user.citizenship.nationId);
    }
  }, [session]);
  return (
    <footer className="animate-slideInFromBottom flex flex-col items-center">
      {access && <FooterNav nation={nation} />}
      <div className="hidden z-10 md:flex flex-col items-center gap-1">
        <div>
          {APP_NAME.toUpperCase()} - {new Date().getFullYear()}
        </div>
        <ReleaseNotesLink smallSize={true} />
        <div className="pb-1 flex items-center gap-2 text-[10px] md:text-[12px] opacity-30 md:opacity-100">
          <Link
            className="transition-colors cursor-pointer hover:text-secondary"
            to="/termsofservice"
          >
            {t("pages.termsOfService.title")}
          </Link>
          <Link
            to={`mailto:${ADMIN_EMAIL}`}
            target="_blank"
            className="mx-2 transition-colors cursor-pointer hover:text-secondary flex items-center gap-1"
          >
            <BsFillEnvelopeAtFill />
            {t("components.buttons.contact")}
          </Link>
          {INSTAGRAM_URL != "" && (
            <Link
              to={INSTAGRAM_URL}
              target="_blank"
              className="mx-2 transition-colors cursor-pointer hover:text-secondary flex items-center gap-1"
            >
              <FaInstagram />
              Instagram
            </Link>
          )}
          {THREADS_URL != "" && (
            <Link
              to={THREADS_URL}
              target="_blank"
              className="mx-2 transition-colors cursor-pointer hover:text-secondary flex items-center gap-1"
            >
              <BsThreads />
              Threads
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}
