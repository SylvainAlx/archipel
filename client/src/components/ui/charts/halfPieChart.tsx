import { useTranslation } from "react-i18next";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { STAT_COLORS } from "../../../settings/lists";

interface HalfPieChartProps {
  pieChartData: { name: string; value: string | number }[];
  high?: number;
  cy?: string;
}

export default function HalfPieChart({
  pieChartData,
  high = 220,
  cy = "50%",
}: HalfPieChartProps) {
  const { t } = useTranslation();
  if (pieChartData.length === 0) {
    return <em className="text-center">{t("components.pieChart.empty")}</em>;
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <ResponsiveContainer width="100%" height={high}>
        <PieChart>
          <Pie
            data={pieChartData}
            cx="50%"
            cy={cy}
            labelLine={false}
            innerRadius={50}
            outerRadius={70}
            paddingAngle={3}
            stroke="none"
            dataKey="value"
            startAngle={360}
            endAngle={0}
          >
            {pieChartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={STAT_COLORS[index % STAT_COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
