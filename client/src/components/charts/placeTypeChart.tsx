import { PlaceListModel } from "../../models/lists/placeListModel";
import { PLACE_TYPE } from "../../settings/consts";
import HalfPieChart from "./halfPieChart";

interface PlaceTypeChartProps {
  placeList: PlaceListModel;
}

export default function PlaceTypeChart({ placeList }: PlaceTypeChartProps) {
  const placeTypeCounts: Record<number, number> = {};
  placeList.getItems().forEach((place) => {
    placeTypeCounts[place.type] = (placeTypeCounts[place.type] || 0) + 1;
  });
  const pieChartData = Object.entries(PLACE_TYPE)
    .map(([key, value]) => ({
      key: key,
      value: placeTypeCounts[value.id] || 0,
      name: value.label,
    }))
    .filter((entry) => entry.value > 0);

  return <HalfPieChart pieChartData={pieChartData} />;
}
