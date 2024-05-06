import { useAtom } from "jotai";
import Button from "../components/buttons/button";
import H1 from "../components/titles/h1";
import { userAtom } from "../settings/store";
import { useTranslation } from "react-i18next";

export default function Home() {
  const [user] = useAtom(userAtom);
  const { t } = useTranslation();

  return (
    <>
      <H1 text={t("pages.home.title")} />
      <p className="text-xl px-4">{t("pages.home.presentation")}</p>
      {user.officialId === undefined || user.officialId === "" ? (
        <div className="w-full py-4 flex justify-center gap-2 flex-wrap">
          <Button
            text={t("components.buttons.login")}
            type="button"
            path="/login"
          />
          <Button
            text={t("components.buttons.register")}
            type="button"
            path="/register"
          />
          <Button
            text={t("components.buttons.explore")}
            type="button"
            path="/nations"
          />
        </div>
      ) : (
        <div className="w-full py-4 flex justify-center gap-4 flex-wrap">
          <Button
            text={t("components.buttons.dashboard")}
            type="button"
            path={`/user/${user.officialId}`}
          />
          <Button
            text={t("components.buttons.explore")}
            type="button"
            path="/nations"
          />
        </div>
      )}
    </>
  );
}
