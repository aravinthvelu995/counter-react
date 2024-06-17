import { BaseSyntheticEvent, useEffect, useState } from "react";
import "./App.scss";
import Button from "./Button";

function App() {
  const [count, setCount] = useState(0);
  const [autoIncrement, setAutoIncrement] = useState(false);
  const [autoIncrementStatus, setAutoIncrementStatus] = useState("Not Started");

  const onIncrementHandler = () => {
    setCount((prevState) => prevState + 1);
  };

  const onDecrementHandler = () => {
    setCount((prevState) => (prevState === 0 ? 0 : prevState - 1));
  };

  const onSetHandler = () => {
    setCount(6);
  };

  const onResetHandler = () => {
    setCount(0);
  };

  const onAutoIncrementCheckboxHandler = (e: BaseSyntheticEvent) => {
    setAutoIncrement(e.target.checked);
  };

  const onAutoIncrementPlayHandler = () => {
    if (!autoIncrement) return false;
    setAutoIncrementStatus("Started");
  };

  const onAutoIncrementPauseHandler = () => {
    if (!autoIncrement) return false;
    setAutoIncrementStatus("Paused");
  };

  const onAutoIncrementResumeHandler = () => {
    if (!autoIncrement) return false;
    setAutoIncrementStatus("Started");
  };

  const onAutoIncrementStopHanler = () => {
    if (!autoIncrement) return false;
    setAutoIncrementStatus("Stopped");
  };

  useEffect(() => {
    let incrementTimer = null;

    if (autoIncrementStatus === "Started") {
      incrementTimer = setInterval(() => {
        setCount((prevState) => prevState + 1);
      }, 1000);
    }

    if (autoIncrementStatus === "Stopped" || autoIncrementStatus === "Paused") {
      if (autoIncrementStatus === "Stopped")
        setAutoIncrementStatus("Not Started");
      if (incrementTimer) clearInterval(incrementTimer);
    }

    return () => {
      if (incrementTimer) clearInterval(incrementTimer);
    };
  }, [autoIncrementStatus]);

  return (
    <div className="wrapper">
      <div>
        <Button onClick={onIncrementHandler} name="Increment" />
        <Button
          onClick={onDecrementHandler}
          name="Decrement"
          disabled={count === 0}
        />
        <Button onClick={onSetHandler} name="Set to 6" />
        <Button onClick={onResetHandler} name="Reset" />
      </div>
      <div className="flex justify-center">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="auto-increment"
            name="auto-increment"
            className="auto-increment-input"
            onChange={onAutoIncrementCheckboxHandler}
            checked={autoIncrement}
          />
          <label htmlFor="auto-increment" className="auto-increment-label">
            Auto Increment
          </label>
        </div>
        <Button
          onClick={onAutoIncrementPlayHandler}
          className={autoIncrementStatus !== "Not Started" ? "hidden" : ""}
          name="Start"
          disabled={autoIncrementStatus !== "Not Started" || !autoIncrement}
        />
        <Button
          onClick={onAutoIncrementPauseHandler}
          className={autoIncrementStatus !== "Started" ? "hidden" : ""}
          name="Pause"
          disabled={autoIncrementStatus !== "Started" || !autoIncrement}
        />
        <Button
          onClick={onAutoIncrementResumeHandler}
          className={autoIncrementStatus === "Paused" ? "" : "hidden"}
          name="Resume"
          disabled={autoIncrementStatus !== "Paused" || !autoIncrement}
        />
        <Button
          onClick={onAutoIncrementStopHanler}
          className={autoIncrementStatus !== "Started" ? "hidden" : ""}
          name="Stop"
          disabled={autoIncrementStatus !== "Started" || !autoIncrement}
        />
      </div>
      <div>
        <p className="count">{count}</p>
      </div>
    </div>
  );
}

export default App;
