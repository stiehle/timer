import { useEffect, useRef, useState } from "react";
import "./Timer.css";

function Timer() {
  const [startTime, setStartTime] = useState(0);
  const [now, setNow] = useState(0);
  const [pause, setPause] = useState(false);
  const [start, setStart] = useState(false);
  const [inputValue, setInputValue] = useState(10);
  const intervalId = useRef(-1);

  const time = useFormInput();

  useEffect(() => {
    if ((now - startTime) / 1000 >= time.inputValue) {
      clearInterval(intervalId.current);
      setNow(startTime + time.inputValue * 1000);
      setPause(false);
      setStart(false);
    }
  }, [startTime, now, time.inputValue]);

  function startInterval() {
    intervalId.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  function handleStart() {
    clearInterval(intervalId.current);
    if (!start) {
      setStart(true);
    }
    if (!pause && !start) {
      const dateNow = Date.now();
      setStartTime(dateNow);
      setNow(dateNow);
      startInterval();
    } else {
      const elapsedTime = now - startTime;
      const dateNow = Date.now();
      setNow(dateNow);
      setStartTime(dateNow - elapsedTime);
      startInterval();
    }
  }

  function handlePause() {
    clearInterval(intervalId.current);
    setPause(true);
  }

  function handleReset() {
    clearInterval(intervalId.current);
    setPause(false);
    setStart(false);
    setNow(0);
    setStartTime(0);
  }

  function useFormInput() {
    const handleInputChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(event.target.value);
      setInputValue(Number(event.target.value));
    };

    return {
      inputValue,
      handleInputChangeEvent,
    };
  }

  const secondsLeft = time.inputValue - (now - startTime) / 1000;

  return (
    <>
      <div className="timer">
        <p className="header">Zeit:</p>
        <input type="number" value={time.inputValue} onChange={time.handleInputChangeEvent} />
        <p className="time">{secondsLeft.toFixed(3)} s</p>
        <button onClick={handleStart}>Start</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </>
  );
}

export default Timer;
