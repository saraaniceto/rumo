import { useEffect, useState } from "react";
import "./timer.css";

export function Timer({ activeTask, isRunning, initialTime, onPlayTimer }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(intervalId);
  }, [isRunning]);

  let time = activeTask.time;

  if (isRunning) {
    const elapsedTime = Math.max(0, now - initialTime);
    time += elapsedTime;
  }

  const seconds = Math.floor((time / 1000) % 60)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((time / 1000 / 60) % 60)
    .toString()
    .padStart(2, "0");
  const hours = Math.floor(time / 1000 / 60 / 60)
    .toString()
    .padStart(2, "0");

  return (
    <div className="timer" id="timer" data-timer-state="running">
      <div className="timer__display">
        <span className="timer__time">
          {hours}:{minutes}:{seconds}
        </span>
        <span className="timer__label">em andamento</span>
      </div>

      <div className="timer__controls">
        <button
          type="button"
          className="timer__btn timer__btn--pause"
          id="timer-pause"
          onClick={onPlayTimer}
        >
          {isRunning ? "Pausar" : "Iniciar"}
        </button>
      </div>
    </div>
  );
}
