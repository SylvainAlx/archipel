import { Link, useNavigate } from "react-router-dom";
import { myStore, showMenuAtom } from "../../settings/store";
import Button from "../buttons/button";
import { useTranslation } from "react-i18next";
import { BsFillEnvelopeAtFill, BsThreads } from "react-icons/bs";
import { ADMIN_EMAIL, INSTAGRAM_URL, THREADS_URL } from "../../settings/consts";
import ReleaseNotesLink from "../releaseNotesLink";
import { useModal } from "../../hooks/useModal";
import LangButton from "../buttons/langButton";
import HelpButton from "../buttons/helpButton";
import { FaInstagram } from "react-icons/fa6";

export default function MenuModal() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const modalRef = useModal(() => myStore.set(showMenuAtom, false));

  return (
    <div
      tabIndex={-1}
      ref={modalRef}
      className="flex flex-col items-center gap-2"
    >
      <nav
        onClick={() => myStore.set(showMenuAtom, false)}
        className="flex flex-col items-center gap-2"
      >
        <div className="flex justify-center gap-2">
          <LangButton />
          <HelpButton />
        </div>
        <Button
          text={t("pages.termsOfService.title")}
          click={() => navigate("/termsofservice")}
          widthFull={true}
        />
        <Button
          text=""
          widthFull={true}
          children={<ReleaseNotesLink />}
          click={() => navigate("/releasenotes")}
        />
        <Link
          className="w-full h-full flex items-center gap-1"
          to={`mailto:${ADMIN_EMAIL}`}
        >
          <Button
            text={t("components.buttons.contact")}
            type="button"
            widthFull={true}
            children={<BsFillEnvelopeAtFill />}
          />
        </Link>
        <Link
          className="w-full h-full flex items-center gap-1"
          to={INSTAGRAM_URL}
        >
          <Button
            text="Instagram"
            type="button"
            widthFull={true}
            children={<FaInstagram />}
          />
        </Link>
        <Link
          className="w-full h-full flex items-center gap-1"
          to={THREADS_URL}
        >
          <Button
            text="Threads"
            type="button"
            widthFull={true}
            children={<BsThreads />}
          />
        </Link>
      </nav>
      <Button
        text={t("components.buttons.close")}
        click={() => myStore.set(showMenuAtom, false)}
        widthFull={true}
      />
    </div>
  );
}
