import { useNavigate } from "react-router-dom";
import { myStore, sessionAtom, showMenuAtom } from "../../settings/store";
import Button from "../buttons/button";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { IoMdSettings } from "react-icons/io";
import { BsFillEnvelopeAtFill } from "react-icons/bs";
import { ADMIN_EMAIL } from "../../settings/consts";

export default function MenuModal() {
  const { t } = useTranslation();
  const [session] = useAtom(sessionAtom);
  const navigate = useNavigate();
  return (
    <>
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
          text={t("pages.legalNotice.title")}
          click={() => navigate("/legalnotice")}
          widthFull={true}
        />
        <Button
          text={t("pages.termsOfService.title")}
          click={() => navigate("/termsofservice")}
          widthFull={true}
        />
        <Button
          text={t("pages.releaseNotes.title")}
          click={() => navigate("/releasenotes")}
          widthFull={true}
        />
        <Button
          text=""
          type="button"
          children={
            <a className="w-full h-full" href={`mailto:${ADMIN_EMAIL}`}>
              <BsFillEnvelopeAtFill />
            </a>
          }
        />
      </nav>
      <Button
        text={t("components.buttons.close")}
        click={() => myStore.set(showMenuAtom, false)}
        widthFull={true}
      />
    </>
  );
}
