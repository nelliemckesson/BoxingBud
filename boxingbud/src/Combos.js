import React from 'react';
import { useState, useEffect } from "react";
import refresh from './refresh.svg';

export default function Combos({newRound, started}) {
  const [currcombo, setCombo] = useState(["jab", "cross"]);

  const count = [2, 3, 4, 5];
  const sides = {
    "left": ["jab", "left hook", "left uppercut"],
    "right": ["cross", "right hook", "right uppercut"]
  }
  const start = ["left", "right"];
  const duck = ["duck", "slip-left", "slip-right"];

  const getRandom = (len) => {
    return Math.floor(Math.random() * len);
  }

  const makeCombo = () => {
    //tk
    let combo = [];
    let thisRound = count[getRandom(count.length)];
    let firstSide = start[getRandom(start.length)];
    let secondSide = "left";
    if (firstSide === "left") {
      secondSide = "right";
    }
    let duckCount = 0;
    for (var i = 0; i < thisRound; i++) {
      // add a duck only if more than 1 move left
      if (i > 0 && i < (thisRound-1)) {
        let shouldDuck = getRandom(2);
        if (shouldDuck > 0 && duckCount < 2) {
          combo.push(duck[getRandom(duck.length)]);
          duckCount = duckCount + 1;
        }
      }
      // determine first or second side
      if (i % 2 == 0) {
        let move = sides[secondSide][getRandom(sides[secondSide].length)];
        combo.push(move);
      } else {
        let move = sides[firstSide][getRandom(sides[firstSide].length)];
        combo.push(move);
      }
    }
    return combo;
  }

  useEffect(() => {
    if (newRound == true && started == true) {
      let thisCombo = makeCombo();
      setCombo(thisCombo);
    } else {
      setCombo(["REST"]);
    }
  }, [newRound, started]);

	return (
    <div className="combolist">
      {currcombo ? (
        <div>
          <div>{currcombo.map((item,i) => <p key={`move${i}`} className="move">{item}</p>)}</div>
          <button className="flat" onClick={() => {
            let newCombo = makeCombo();
            setCombo(newCombo);
          }}><img height="20px" width="20px" src={refresh} /></button>
        </div>
      ) : (
        <p>"Rest"</p>
      )}
    </div>
  );
}