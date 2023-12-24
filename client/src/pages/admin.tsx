import H1 from "../components/titles/h1";
import { TITLE } from "../utils/consts";

export default function Admin() {
  return (
    <>
      <H1 text={`Administration de ${TITLE}`} />
    </>
  );
}
