import Button from "../components/buttons/button";
import H1 from "../components/titles/h1";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { sessionAtom } from "../settings/store";
import { useAtom } from "jotai";

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [session] = useAtom(sessionAtom);

  return (
    <>
      <H1 text={t("pages.home.title")} />
      <p
        className="text-xl px-4"
        dangerouslySetInnerHTML={{ __html: t("pages.home.presentation") }}
      />
      {session.user.officialId === undefined ||
      session.user.officialId === "" ? (
        <div className="w-full py-4 flex justify-center gap-2 flex-wrap">
          <Button
            text={t("components.buttons.login")}
            type="button"
            click={() => navigate("/login")}
            widthFull={true}
          />
          <Button
            text={t("components.buttons.register")}
            type="button"
            click={() => navigate("/register")}
            widthFull={true}
          />
          <Button
            text={t("components.buttons.explore")}
            type="button"
            click={() => navigate("/explore")}
            widthFull={true}
          />
        </div>
      ) : (
        <div className="w-full py-4 flex justify-center gap-4 flex-wrap">
          <Button
            text={t("components.buttons.user")}
            type="button"
            click={() => navigate(`/citizen/${session.user.officialId}`)}
            widthFull={true}
          />
          <Button
            text={t("components.buttons.explore")}
            type="button"
            click={() => navigate("/explore")}
            widthFull={true}
          />
        </div>
      )}
    </>
  );
}
