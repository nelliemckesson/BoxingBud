import React from 'react';
import { useState, useEffect } from "react";
import { useTimer } from 'react-timer-hook';
import Combos from './Combos.js';
import Bell from './Bell.js';

export default function Timer({expiryTimestamp}) {
  const [main, setMain] = useState(false);
  const [total, setTotal] = useState(0);
  const [started, setStarted] = useState(false);

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => restartTimer() });

  const restartTimer = () => {
    setMain(!main);
  }

  useEffect(() => {
    if (started == true) {
      // Update the document title using the browser API
      let amt = main ? 120 : 30;
      // let amt = main ? 20 : 10;
      setTotal(total+amt);
      let time = new Date();
      time.setSeconds(time.getSeconds() + amt);
      restart(time);
      start();
    }
  }, [main, started]);

  const getTotal = val => {
    let myTime = (val/60).toFixed(2);
    let arr = myTime.toString().split(".");
    let minutes = parseInt(arr[0]);
    let seconds = (parseInt(arr[1]) / 100) * 60;
    return `${minutes < 10 ? "0"+minutes.toString() : minutes}:${seconds < 10 ? "0"+seconds.toString() : seconds}`;
  }


  return (
    <div className="container" style={{textAlign: 'center'}}>
      <div className="timerContainer">
        <div className="text">
          <p>This app creates random boxing punch combos.</p>
          <p>Each combo runs for 2 minutes, followed by a 30 second break.</p>
          <p>I am not a doctor; punch at your own risk!</p>
        </div>
        <div className="timerInner">
          <div className="counter">
            <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
          </div>
          <p>{isRunning && started ? 'Running' : 'Not running'}</p>
          <div>
            <button onClick={() => {
              if (started == false) {
                setStarted(true);
                setMain(false);
              };
            }}>Go!</button>
            <button onClick={pause}>Pause</button>
            <button onClick={resume}>Resume</button>
            <button onClick={() => {
              // Restarts to 2 minutes timer
              setTotal(30);
              setMain(false);
              const time = new Date();
              time.setSeconds(time.getSeconds() + 30);
              restart(time)
            }}>Restart</button>
          </div>
          <p>Total time after this round: {getTotal(total)}</p>
        </div>
        <p className="feedback">
          Got an idea for how to make this better? 
          <a href="https://github.com/nelliemckesson/BoxingBud/issues"> Submit it here</a>
        </p>
        <Bell newRound={main} />
      </div>
      <div>
        <Combos newRound={main} started={started} />
      </div>
    </div>
  );
}