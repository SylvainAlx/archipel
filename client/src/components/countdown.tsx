import React, { useState, useEffect } from "react";

interface CountdownProps {
  targetDate: Date;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Nettoyer l'intervalle lorsque le composant est démonté ou lorsque targetDate change
    return () => clearInterval(interval);
  }, [targetDate]);

  const renderTime = () => {
    return (
      <div>
        <span>{timeLeft.days}</span> j <span>{timeLeft.hours}</span> h{" "}
        <span>{timeLeft.minutes}</span> min <span>{timeLeft.seconds}</span> s
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center">
      <h1>Terminé dans </h1>
      {Object.keys(timeLeft).length === 0 ? (
        <span>Terminé !</span>
      ) : (
        renderTime()
      )}
    </div>
  );
};

export default Countdown;
