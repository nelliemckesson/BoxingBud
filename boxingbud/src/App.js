import { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import Timer from './Timer.js';

function App() {
  // whether this is punch time or rest time
  let [main, setMain] = useState(false);

  const toggleMain = () => {
    setMain(!main);
  }

  let amt = main ? 120 : 30;

  const time = new Date();
  time.setSeconds(time.getSeconds() + amt);
  return (
    <div className="App">
      <Timer expiryTimestamp={time} isMain={main} />
    </div>
  );
}

export default App;
