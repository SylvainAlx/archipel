import { useAtom } from "jotai";
import Button from "../components/button";
import H1 from "../components/titles/h1";
import { nationAtom } from "../settings/store";
import { useTranslation } from "react-i18next";

export default function Home() {
  const [nation] = useAtom(nationAtom);
  const { t } = useTranslation();

  return (
    <>
      <H1 text={t("pages.home.title")} />
      <p className="text-xl px-4">{t("pages.home.presentation")}</p>
      {nation._id === undefined || nation._id === "" ? (
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
            path={`/dashboard/${nation.officialId}`}
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
