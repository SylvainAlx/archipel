import { FaCoins } from "react-icons/fa";
import { getValueFromParam } from "../services/paramService";
import { useTranslation } from "react-i18next";

export default function CreditsParams() {
  const { t } = useTranslation();
  return (
    <section className="w-full py-4 flex flex-col items-center">
      <table className="w-full border-collapse rounded-lg overflow-hidden shadow-md bg-complementary2">
        <thead>
          <tr className="bg-complementary3 text-white">
            <th className="px-2 py-1"></th>
            <th className="px-2 py-1">
              {t("components.modals.infoModal.table.thead.place")}
            </th>
            <th className="px-2 py-1">
              {t("components.modals.infoModal.table.thead.tile")}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-2 py-1">
              {t("components.modals.infoModal.table.tbody.freeLimit")}
            </td>
            <td className="px-2 py-1">
              {getValueFromParam("quotas", "places")}
            </td>
            <td className="px-2 py-1">
              {getValueFromParam("quotas", "tiles")}
            </td>
          </tr>
          <tr>
            <td className="px-2 py-1">
              {t("components.modals.infoModal.table.tbody.cost")}
            </td>
            <td className="px-2 py-1">
              <span className="flex items-center justify-center gap-2">
                {getValueFromParam("costs", "place")}
                <FaCoins />
              </span>
            </td>
            <td className="px-2 py-1">
              <span className="flex items-center justify-center gap-2">
                {getValueFromParam("costs", "tile")}
                <FaCoins />
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <table className="w-full border-collapse rounded-lg overflow-hidden shadow-md mt-6 bg-complementary2">
        <thead>
          <tr className="bg-complementary3 text-white">
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2">
              {t("components.modals.infoModal.table.thead.userBonus")}
            </th>
            <th className="px-4 py-2">
              {t("components.modals.infoModal.table.thead.nationBonus")}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2">
              {t("components.modals.infoModal.table.tbody.register")}
            </td>
            <td className="px-4 py-2">
              <span className="flex items-center justify-center gap-2">
                {getValueFromParam("gifts", "register")}
                <FaCoins />
              </span>
            </td>
            <td className="px-4 py-2"></td>
          </tr>
          <tr>
            <td className="px-4 py-2">
              {t("components.modals.infoModal.table.tbody.newNation")}
            </td>
            <td className="px-4 py-2"></td>
            <td className="px-4 py-2">
              <span className="flex items-center justify-center gap-2">
                {getValueFromParam("gifts", "newNation")}
                <FaCoins />
              </span>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2">
              {t("components.modals.infoModal.table.tbody.citizenship")}
            </td>
            <td className="px-4 py-2"></td>
            <td className="px-4 py-2">
              <span className="flex items-center justify-center gap-2">
                {getValueFromParam("gifts", "citizenship")}
                <FaCoins />
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
