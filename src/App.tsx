import { useRef, useState } from "react";
import './App.css'

function App() {
  const [time, setTime] = useState<number>(0)
  const [now, setNow] = useState<number>(0)
  const intervalRef = useRef<number>(0);
  const [laps, setLaps] = useState<number[]>([])

  function handleStart() {
    clearInterval(intervalRef.current)
    setNow(Date.now())
    intervalRef.current = setInterval(() => {
      setTime(Date.now())
    }, 10)
  }

  function handleStop() {
    clearInterval(intervalRef.current)
  }

  function handleReset() {
    clearInterval(intervalRef.current)
    setTime(0)
    setNow(0)
  }
  function handleLap() {
    setLaps((prev) => [timePassed, ...prev])
  }
  let timePassed: number = time - now

  function formatTime(timeElapsed: number) {
    const minutes = Math.floor((timeElapsed) / (1000 * 60))
    const seconds = Math.floor((timeElapsed % 60000) / 1000)
    const milliseconds = Math.floor((timeElapsed) % 1000)
    return `${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(2, "0")} : ${String(milliseconds).padStart(3, "0")}`
  }

  return (
    <>
      <div className="time">
        <h1>Stopwatch</h1>
        <h1>Time: {formatTime(timePassed)}</h1>
        <div>
          <button onClick={handleStart}>Start</button>
          <button onClick={handleStop}>Stop</button>
          <button onClick={handleReset}>Reset</button>
          <button onClick={handleLap}>Lap</button>
        </div>
        <div className="laps">
          <h1>Laps</h1>
          <div className="points">
            <ul>
              {laps.map((lap, index) => (
                <li key={index}>{formatTime(lap)}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
