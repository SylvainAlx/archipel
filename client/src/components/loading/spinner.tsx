// import Logo from "../logo";

import { FadeLoader } from "react-spinners";

export default function Spinner() {
  return (
    <div role="status" className="relative">
      {/* <ClockLoader size={150} color="rgb(0, 129, 138)" /> */}
      <FadeLoader color="rgb(0, 129, 138)" />
    </div>
  );
}
