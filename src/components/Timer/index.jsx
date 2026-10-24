import './timer.css'
import { useState, useEffect, useRef } from 'react';

export function Timer({ activeTask, onUpdateTime }) {
    const [time, setTime] = useState(activeTask.time);
    const [isRunning, setIsRunning] = useState(false);

    const intervalRef = useRef(null);

    const handlePlayTimer = () => {
        setIsRunning(prevIsRunning => !prevIsRunning);

        if (!isRunning) {
            intervalRef.current = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);

        } else {
            setIsRunning(false)
            clearInterval(intervalRef.current);
            onUpdateTime(activeTask.id, time)
        }
    }

    const hours = Math.floor((time / 60) % 60).toString().padStart(2, "0");
    const minutes = Math.floor((time / 60) / 60).toString().padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");

    return (

        <div className="timer" id="timer" data-timer-state="running">
            <div className="timer__display">
                <span className="timer__time">{hours}:{minutes}:{seconds}</span>
                <span className="timer__label">em andamento</span>
            </div>

            <div className="timer__controls">
                <button type="button" className="timer__btn timer__btn--pause" id="timer-pause"
                    onClick={handlePlayTimer}>
                    {isRunning ? "Pausar" : "Iniciar"}
                </button>
            </div>
        </div>
    )
}