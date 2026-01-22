import { useEffect, useRef, useState } from "react";
import './App.css'

function App() {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    } else {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}:${String(milliseconds).padStart(2, "0")}`;
  };

  const addLap = () => {
    if (!isRunning) return;
    setLaps((prev) => [time, ...prev]);
  };

  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  return (
    <div className="containers">
      <h1>⏱ Stopwatch</h1>

      <h2>{formatTime(time)}</h2>

      <div >
        <button onClick={() => setIsRunning(true)}>Start</button>
        <button onClick={() => setIsRunning(false)}>Stop</button>
        <button onClick={addLap} disabled={!isRunning}>
          Lap
        </button>
        <button onClick={reset}>Reset</button>
      </div>

      {/* Lap List */}
      {laps.length > 0 && (
        <div >
          <h3>Laps</h3>
          <ul >
            {laps.map((lap, index) => (
              <li key={index}>
                Lap {laps.length - index}: {formatTime(lap)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
