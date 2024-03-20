import Tag from "../tag";
import { customTagProps } from "../../types/typProp";
import { FaCrown, FaPersonMilitaryPointing, FaQuestion } from "react-icons/fa6";
import { MdHowToVote } from "react-icons/md";

export default function RegimeTag({ label, bgColor, type }: customTagProps) {
  return (
    <Tag
      text={label.toString()}
      bgColor={bgColor}
      children={
        <>
          {type === 0 && <FaQuestion />}
          {type === 1 && <MdHowToVote />}
          {type === 100 && <FaCrown />}
          {type === 200 && <FaPersonMilitaryPointing />}
        </>
      }
    />
  );
}
