import { useState } from "react";
import "./DateTime.css";

function DateTime() {
  const [time, setTime] = useState(getDateTime());
  const [start, setStart] = useState(false);

  if (!start) {
    startTimer();
    setStart(true);
  }

  function startTimer() {
    setInterval(() => {
      setTime(getDateTime());
    }, 1000);
  }

  function getDateTime() {
    const date = new Date();

    const dateTime = {
      now: Date.now(),
      year: date.getFullYear(),
      month: String(date.getMonth() + 1).padStart(2, "0"),
      day: String(date.getDate()).padStart(2, "0"),
      hour: String(date.getHours()).padStart(2, "0"),
      minute: String(date.getMinutes()).padStart(2, "0"),
      second: String(date.getSeconds()).padStart(2, "0"),
    };

    return dateTime;
  }

  return (
    <div className="datetime-wrapper">
      <div className="datetime-time">
        {time.hour}
        <p>:</p>
        {time.minute}
        <p>:</p>
        {time.second}
      </div>
      <div className="datetime-date">
        {time.day}
        <p>.</p>
        {time.month}
        <p>.</p>
        {time.year}
      </div>
    </div>
  );
}

export default DateTime;
