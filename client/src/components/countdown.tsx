/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { MdTimer } from "react-icons/md";
import Tag from "./tags/tag";

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
        {timeLeft.days > 0 && <span>{timeLeft.days}j </span>}
        {timeLeft.hours > 0 && <span>{timeLeft.hours}h </span>}
        {timeLeft.minutes > 0 && <span>{timeLeft.minutes}min </span>}
        {timeLeft.seconds > 0 && <span>{timeLeft.seconds}s</span>}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center">
      <Tag
        text=""
        bgColor="bg-wait"
        children={
          <>
            <MdTimer />
            {Object.keys(timeLeft).length === 0 ? (
              <span>Terminé !</span>
            ) : (
              renderTime()
            )}
          </>
        }
      />
    </div>
  );
};

export default Countdown;
