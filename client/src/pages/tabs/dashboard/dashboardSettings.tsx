import Button from "../../../components/buttons/button";
import H1 from "../../../components/titles/h1";
import { StringProps } from "../../../types/typProp";

export default function DashboardSettings({ text }: StringProps) {
  return (
    <>
      <H1 text={text} />
      <Button path="delete" text="SUPPRIMER LA NATION" />
    </>
  );
}
