import H1 from "../../components/ui/titles/h1";
import { useEffect, useState } from "react";
import { langOptions } from "../../i18n/i18n";
import MDEditor from "@uiw/react-md-editor";
import { createPageTitle } from "../../utils/procedures";
import { getMarkdown } from "../../utils/functions";
import { useTranslation } from "react-i18next";

export default function TermsOfService() {
  const [markdownContent, setMarkdownContent] = useState("");
  const { t, i18n } = useTranslation();
  createPageTitle(t("pages.termsOfService.title"));

  useEffect(() => {
    const fetchMarkdown = async () => {
      setMarkdownContent(await getMarkdown("/TERMS-OF-SERVICE.md"));
    };

    fetchMarkdown();
  }, []);

  return (
    <section className="w-full max-w-2xl px-2 pb-2 flex flex-col items-center gap-2">
      <H1 text={t("pages.termsOfService.title")} />
      {i18n.language === langOptions[0].id && (
        <strong className="animate-pulse">ONLY IN FRENCH LANGUAGE</strong>
      )}
      <MDEditor.Markdown
        className="bg-transparent text-light text-justify mde-markdown"
        source={markdownContent}
      />
    </section>
  );
}
