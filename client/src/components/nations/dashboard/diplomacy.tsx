import TileContainer from "../../tileContainer";
import DevFlag from "../../devFlag";
import { useTranslation } from "react-i18next";
import DashTile from "../../dashTile";

export default function Diplomacy() {
  const { t } = useTranslation();

  return (
    <TileContainer
      children={
        <DashTile
          title={t("pages.nation.simulation.diplomacy")}
          children={
            <section className="flex flex-col items-center gap-4">
              <DevFlag />
            </section>
          }
        />
      }
    />
  );
}
