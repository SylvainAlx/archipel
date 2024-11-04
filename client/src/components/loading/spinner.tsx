import { FadeLoader, RingLoader } from "react-spinners";

interface SpinnerProps {
  showClock?: boolean;
}

export default function Spinner({ showClock = false }: SpinnerProps) {
  return (
    <div role="status" className="relative">
      {showClock ? (
        <RingLoader color="rgb(0, 129, 138)" />
      ) : (
        <FadeLoader color="rgb(0, 129, 138)" />
      )}
    </div>
  );
}
