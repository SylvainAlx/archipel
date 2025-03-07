import { UserListModel } from "../../../models/lists/userListModel";
import { languageList } from "../../../settings/lists";
import HalfPieChart from "./halfPieChart";

interface LanguageChartProps {
  userList: UserListModel;
}

export default function LanguageChart({ userList }: LanguageChartProps) {
  const languageCounts: Record<string, number> = {};
  userList.getItems().forEach((user) => {
    if (user.language === "fr") {
      user.language = "fr-FR";
    }
    languageCounts[user.language] = (languageCounts[user.language] || 0) + 1;
  });
  const pieChartData = languageList
    .map((lang) => ({
      name: lang.label,
      value: languageCounts[lang.id] || 0,
    }))
    .filter((entry) => entry.value > 0);

  return <HalfPieChart pieChartData={pieChartData} />;
}
