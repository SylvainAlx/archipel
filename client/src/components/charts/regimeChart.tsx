import { NationListModel } from "../../models/lists/nationListModel";
import { regimeList } from "../../settings/lists";
import HalfPieChart from "./halfPieChart";

// Interface des props
interface RegimeChartProps {
  nations: NationListModel;
}

export default function RegimeChart({ nations }: RegimeChartProps) {
  const regimeCounts: Record<number, number> = {};

  nations.getItems().forEach((nation) => {
    const regimeId = nation.data.general.regime;
    regimeCounts[regimeId] = (regimeCounts[regimeId] || 0) + 1;
  });

  // 2. Transformer les données au format Recharts
  const pieChartData = regimeList
    .map((regime) => ({
      name: regime.label,
      value: regimeCounts[regime.id] || 0,
      type: regime.type,
    }))
    .filter((entry) => entry.value > 0); // On garde uniquement les régimes présents

  return <HalfPieChart pieChartData={pieChartData} high={310} />;
}
