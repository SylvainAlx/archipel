import { Legend } from "recharts";

export default function CustomLegend({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <strong>{title}</strong>
      <Legend />
    </div>
  );
}
