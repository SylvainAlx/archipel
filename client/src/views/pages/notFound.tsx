import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="flex-grow flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">{t("pages.notFound.title")}</h1>
      <p className="text-center">{t("pages.notFound.message")}</p>
    </div>
  );
}
