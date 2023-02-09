import { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import Timer from './Timer.js';

function App() {
  // initial setup time
  const time = new Date();
  time.setSeconds(time.getSeconds() + 0);
  return (
    <div className="App">
      <Timer expiryTimestamp={time} />
    </div>
  );
}

export default App;
