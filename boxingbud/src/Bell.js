import React from 'react';
import { useState, useEffect } from "react";
import start from './start.mp3';
import stop from './stop.mp3';

// const useAudio = url => {
//   const [audio] = useState(new Audio(url));
//   const [playing, setPlaying] = useState(false);

//   const toggle = () => setPlaying(!playing);

//   useEffect(() => {
//       playing ? audio.play() : audio.pause();
//     }
//   );

//   useEffect(() => {
//     audio.addEventListener('ended', () => setPlaying(false));
//     return () => {
//       audio.removeEventListener('ended', () => setPlaying(false));
//     };
//   }, []);

//   return [playing, toggle];
// };

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