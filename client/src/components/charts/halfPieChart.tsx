import { useTranslation } from "react-i18next";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28DFF",
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
];

interface HalfPieChartProps {
  pieChartData: any[];
  cy?: string;
}

export default function HalfPieChart({
  pieChartData,
  cy = "70%",
}: HalfPieChartProps) {
  const { t } = useTranslation();
  if (pieChartData.length === 0) {
    return <em className="text-center">{t("components.pieChart.empty")}</em>;
  }

  return (
    <div className="w-full min-h-[270px] flex flex-col justify-center items-center">
      <ResponsiveContainer width="100%" height={270}>
        <PieChart>
          <Pie
            data={pieChartData}
            cx="50%"
            cy={cy}
            labelLine={false}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            startAngle={180}
            endAngle={0}
          >
            {pieChartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
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
