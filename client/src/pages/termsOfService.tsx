import { useTranslation } from "react-i18next";
import H1 from "../components/titles/h1";
import { useEffect, useState } from "react";

export default function TermsOfService() {
  const t = useTranslation();
  const [lang, setLang] = useState("");
  useEffect(() => {
    setLang(t.i18n.language);
  }, [t]);

  return (
    <>
      {lang === "fr-FR" ? (
        <>
          <H1 text="Conditions générales d'utilisation" />
        </>
      ) : (
        <>
          <H1 text="Terms of service" />
          <strong>SWITCH TO FRENCH LANGUAGE</strong>
        </>
      )}
    </>
  );
}
