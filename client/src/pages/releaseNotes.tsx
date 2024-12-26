import { useTranslation } from "react-i18next";
import H1 from "../components/titles/h1";
import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { langOptions } from "../i18n/i18n";

export default function ReleaseNotes() {
  const { t, i18n } = useTranslation();
  const [markdownContent, setMarkdownContent] = useState("");

  useEffect(() => {
    fetchMarkdown();
  }, []);

  const fetchMarkdown = async () => {
    const response = await fetch("/RELEASE-NOTES.md");
    const text = await response.text();
    setMarkdownContent(text);
  };

  return (
    <section className="w-full max-w-xl px-2 pb-2 flex flex-col items-center gap-2">
      <H1 text={t("pages.releaseNotes.title")} />
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
