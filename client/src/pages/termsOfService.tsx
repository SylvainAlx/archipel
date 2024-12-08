import { useTranslation } from "react-i18next";
import H1 from "../components/titles/h1";
import { useEffect, useState } from "react";
import { langOptions } from "../i18n/i18n";
import MDEditor from "@uiw/react-md-editor";

export default function TermsOfService() {
  const t = useTranslation();
  const [lang, setLang] = useState("");
  const [markdownContent, setMarkdownContent] = useState("");

  useEffect(() => {
    setLang(t.i18n.language);
  }, [t]);

  useEffect(() => {
    fetchMarkdown();
  }, []);

  const fetchMarkdown = async () => {
    const response = await fetch("/TERMS-OF-SERVICE.md");
    const text = await response.text();
    setMarkdownContent(text);
  };

  return (
    <section className="w-full max-w-xl px-2 pb-2 flex flex-col items-center gap-2">
      {lang === langOptions[1].id ? (
        <H1 text="Conditions générales d'utilisation" />
      ) : (
        <>
          <H1 text="Terms of service" />
          <strong className="animate-pulse">ONLY IN FRENCH LANGUAGE</strong>
        </>
      )}
      <MDEditor.Markdown
        className="bg-transparent text-light text-justify"
        source={markdownContent}
      />
    </section>
  );
}
