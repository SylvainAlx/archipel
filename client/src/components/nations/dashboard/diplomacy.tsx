import TileContainer from "../../tileContainer";
import DevFlag from "../../devFlag";
import { useTranslation } from "react-i18next";
import H2 from "../../titles/h2";

export default function Diplomacy() {
  const { t } = useTranslation();

  return (
    <TileContainer
      children={
        <section className="flex flex-col items-center gap-4">
          <H2 text={t("pages.nation.simulation.diplomacy")} />
          <DevFlag />
        </section>
      }
    />
  );
}
