import { useEffect, useState } from "react";
import { useFetch, useInterval } from "./hooks";

function getEpochTime() {
  return Math.floor(Date.now() / 1000);
}

function formatTime(time: number) {
  let s = Math.floor(time % 60);
  let m = Math.floor((time / 60) % 60);
  let h = Math.floor(time / 60 / 60);

  const leadingZero = (num: number) => num.toString().padStart(2, "0");

  return `${leadingZero(h)}:${leadingZero(m)}:${leadingZero(s)}`;
}

const Time = () => {
  const { isLoading, error, data } = useFetch("/time");
  const [time, setTime] = useState<null | number>(null);

  useEffect(() => {
    const newTime = getEpochTime();
    setTime(newTime);
  }, []);

  useInterval(() => {
    const newTime = getEpochTime();
    setTime(newTime);
  }, 1000);

  const timeDiff = time && data ? time - data.epoch : null;

  if (error) return <div>{error}</div>;
  return (
    <>
      {data && (
        <>
          <h2>Server Time</h2>
          <div>{data.epoch}</div>
          <h2>Server/Client Time Difference</h2>
          <div>{timeDiff !== null && formatTime(timeDiff)}</div>
        </>
      )}
      {isLoading && <div className="loading">loading...</div>}
    </>
  );
};

export default Time;
