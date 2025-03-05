import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";

interface SpinnerProps {
  showClock?: boolean;
}

export default function Spinner({ showClock = false }: SpinnerProps) {
  const [tempsRestant, setTempsRestant] = useState(60);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    let interval: NodeJS.Timeout | undefined;

    if (showClock) {
      interval = setInterval(() => {
        setTempsRestant((prevTemps) => prevTemps - 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [showClock]);

  useEffect(() => {
    if (tempsRestant <= 0 && showClock) {
      setTempsRestant(0);
    }
  }, [tempsRestant, showClock]);

  return (
    <div role="status" className="relative">
      {showClock ? (
        <div className="text-xl">{tempsRestant}s</div>
      ) : (
        <FadeLoader color="rgb(0, 129, 138)" />
      )}
    </div>
  );
}
