import React from "react";
import Tone from "tone";

const Transport = props => {
  const synth = new Tone.Synth().toMaster();
  const oneOctave = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
  const clickNoise = () => {
    synth.triggerAttackRelease(oneOctave[Math.floor(Math.random() * 8)], "8n");
  };

  return (
    <div>
      <p>{props.greeting}</p>
      <button onClick={clickNoise}>I MAKE NOISE</button>
    </div>
  );
};

export default Transport;
