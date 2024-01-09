import H1 from "../../../components/titles/h1";
import { StringProps } from "../../../types/typProp";

export default function DashboardContact({ text }: StringProps) {
  return (
    <>
      <H1 text={text} />
    </>
  );
}
