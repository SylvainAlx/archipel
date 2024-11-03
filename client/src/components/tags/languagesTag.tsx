import Tag from "./tag";
import { useTranslation } from "react-i18next";
import { IoLanguage } from "react-icons/io5";

export interface LangagesTagPros {
  languages: string[];
}

export default function LanguagesTag({ languages }: LangagesTagPros) {
  const { t } = useTranslation();

  return (
    <>
      {languages.length > 0 ? (
        languages.map((lang, i) => {
          return (
            <div key={i}>
              <Tag
                text={lang.toLocaleUpperCase()}
                hover={t("components.hoverInfos.tags.languages")}
                bgColor="bg-info"
                children={<IoLanguage />}
              />
            </div>
          );
        })
      ) : (
        <Tag
          text="PAS DE LANGUE"
          hover={t("components.hoverInfos.tags.languages")}
          bgColor="bg-info"
          children={<IoLanguage />}
        />
      )}
    </>
  );
}
