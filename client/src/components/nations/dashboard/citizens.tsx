import { useTranslation } from "react-i18next";
import TileContainer from "../../tileContainer";
import DashTile from "../../dashTile";
import DevFlag from "../../devFlag";

export default function Citizens() {
  const { t } = useTranslation();
  return (
    <TileContainer
      children={
        <DashTile
          title={t("pages.nation.simulation.citizens")}
          className="w-full my-2"
          children={
            <>
              <DevFlag />
            </>
          }
        />
      }
    />
  );
}
