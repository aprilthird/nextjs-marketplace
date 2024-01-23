"use client";
import React, { useEffect, useState } from "react";

const useCountdown = (targetDate: any) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown: any) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

const ExpiredNotice = () => {
  return (
    <div className="expired-notice">
      <span className="font-medium">Expirado</span>
      <p></p>
    </div>
  );
};

const ShowCounter = ({
  days,
  hours,
  minutes,
  seconds,
}: {
  days: any;
  hours: any;
  minutes: any;
  seconds: any;
}) => {
  return (
    <div className="flex items-center mx-2 space-x-2">
      <DateTimeDisplay value={days} type={"Días"} isDanger={days <= 3} />
      <p>:</p>
      <DateTimeDisplay value={hours} type={"Horas"} isDanger={false} />
      <p>:</p>
      <DateTimeDisplay value={minutes} type={"Minutos"} isDanger={false} />
      <p>:</p>
      <DateTimeDisplay value={seconds} type={"Segundos"} isDanger={false} />
    </div>
  );
};

const DateTimeDisplay = ({
  value,
  type,
  isDanger,
}: {
  value: any;
  type: any;
  isDanger: any;
}) => {
  return (
    <div
      className={
        isDanger
          ? "countdown danger rounded-xl p-2 lg:p-3 bg-black text-white"
          : "countdown rounded-xl p-2 lg:p-3 bg-black text-white"
      }
    >
      <p className="leading-normal lg:leading-loose">{value}</p>
      <span>{type}</span>
    </div>
  );
};

type Props = {
  targetDate: number;
};

const CountdownTimer = ({ targetDate }: Props) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <React.Fragment>
      {days + hours + minutes + seconds <= 0 ? (
        <ExpiredNotice />
      ) : (
        isClient && (
          <ShowCounter
            days={days}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
          />
        )
      )}
    </React.Fragment>
  );
};

export {
  useCountdown,
  ExpiredNotice,
  ShowCounter,
  DateTimeDisplay,
  CountdownTimer,
};
