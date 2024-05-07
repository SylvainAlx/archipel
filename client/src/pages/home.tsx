import { useAtom } from "jotai";
import Button from "../components/buttons/button";
import H1 from "../components/titles/h1";
import { userAtom } from "../settings/store";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [user] = useAtom(userAtom);
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <H1 text={t("pages.home.title")} />
      <p className="text-xl px-4">{t("pages.home.presentation")}</p>
      {user.officialId === undefined || user.officialId === "" ? (
        <div className="w-full py-4 flex justify-center gap-2 flex-wrap">
          <Button
            text={t("components.buttons.login")}
            type="button"
            click={() => navigate("/login")}
          />
          <Button
            text={t("components.buttons.register")}
            type="button"
            click={() => navigate("/register")}
          />
          <Button
            text={t("components.buttons.explore")}
            type="button"
            click={() => navigate("/nations")}
          />
        </div>
      ) : (
        <div className="w-full py-4 flex justify-center gap-4 flex-wrap">
          <Button
            text={t("components.buttons.dashboard")}
            type="button"
            click={() => navigate(`/user/${user.officialId}`)}
          />
          <Button
            text={t("components.buttons.explore")}
            type="button"
            click={() => navigate("/nations")}
          />
        </div>
      )}
    </>
  );
}
