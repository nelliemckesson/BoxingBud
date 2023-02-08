import React from 'react';
import { useState, useEffect } from "react";
import { useTimer } from 'react-timer-hook';
import Combos from './Combos.js';

export default function Timer({expiryTimestamp, isMain}) {
  const [main, setMain] = useState(false);
  const [total, setTotal] = useState(0);

  // let expiryTimestamp = main ? 120 : 30;

  // let time = new Date();
  // time.setSeconds(time.getSeconds() + expiryTimestamp);

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
    console.log("SHOULD RESTART");
    setMain(!main);
  }

  useEffect(() => {
    // Update the document title using the browser API
    // let amt = main ? 120 : 30;
    let amt = main ? 20 : 10;
    setTotal(total+amt);
    console.log(main);
    let time = new Date();
    time.setSeconds(time.getSeconds() + amt);
    restart(time);
    start();
  }, [main]);


  return (
    <div className="container" style={{textAlign: 'center'}}>
      <div>
        <div style={{fontSize: '100px', widtb: '350px'}}>
          <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
        </div>
        <p>{isRunning ? 'Running' : 'Not running'}</p>
        <button onClick={start}>Start</button>
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
        <p>Total time after this round: {total}</p>
      </div>
      <div>
        <Combos newRound={main} />
      </div>
    </div>
  );
}