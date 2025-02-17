import { Link, useNavigate } from "react-router-dom";
import { myStore, sessionAtom, showMenuAtom } from "../../settings/store";
import Button from "../buttons/button";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { IoMdSettings } from "react-icons/io";
import { BsFillEnvelopeAtFill } from "react-icons/bs";
import { ADMIN_EMAIL } from "../../settings/consts";
import ReleaseNotesLink from "../releaseNotesLink";
import { useModal } from "../../hooks/useModal";

export default function MenuModal() {
  const { t } = useTranslation();
  const [session] = useAtom(sessionAtom);
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
        {session.user.role === "admin" && (
          <Button
            text={t("components.buttons.admin")}
            click={() => navigate("/admin")}
            children={<IoMdSettings />}
            widthFull={true}
          />
        )}
        <Button
          text={t("pages.termsOfService.title")}
          click={() => navigate("/termsofservice")}
          widthFull={true}
        />
        <Button text="" widthFull={true} children={<ReleaseNotesLink />} />
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
      </nav>
      <Button
        text={t("components.buttons.close")}
        click={() => myStore.set(showMenuAtom, false)}
        widthFull={true}
      />
    </div>
  );
}
