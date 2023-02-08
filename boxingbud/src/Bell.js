import React from 'react';
import { useState, useEffect } from "react";
import start from './start.mp3';
import stop from './stop.mp3';

export default function Bell({newRound}) {
  useEffect(() => {
  	// the round end chime
  	let audio = new Audio(stop);
  	if (newRound == true) {
  		// the round start chime
  		audio = new Audio(start);
  	}
  	audio.play();
  }, [newRound]);

  return (
    <div>
      <p></p>
    </div>
  );
};