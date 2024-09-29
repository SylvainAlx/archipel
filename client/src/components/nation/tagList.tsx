import { SelectedNationProps } from "../../types/typProp";
import HashTag from "../tags/hashTag";

export default function TagList({ selectedNation }: SelectedNationProps) {
  return (
    <div className="w-full px-2 flex flex-wrap items-center justify-center gap-1">
      {selectedNation.data.general.tags.map((hashtag, i) => {
        return <HashTag label={hashtag} key={i} />;
      })}
    </div>
  );
}
