import React, { useState } from "react";
import Tone from 'tone'
import './App.css'

const App = () => {

  const sounds = {
    kick: '/sounds/kick.wav',
    chimes: '/sounds/chimes.wav',
    snare: '/sounds/snare.wav',
    shaker: '/sounds/shaker.wav',
    hihat: '/sounds/hihat.wav'
  }

  const [state, setState] = useState({ kickTrack: [false, false, false, false, false, false, false, false] })

  let kickSeq;
  let playing;
  let bpm = '120'

  const playSeq = () => {
    if (!playing) {
      let i = 0;
      kickSeq = setInterval(() => {
        playSound(state.kickTrack[i]);
        i++
        if (i === state.kickTrack.length) {
          i = 0
        }
      }, 30000 / bpm)
      playing = true;
    }
  }


  const stopSeq = () => {
    if (playing) {
      clearInterval(kickSeq);
      playing = false;
    }
  }

  const playSound = (step) => {

    if (step === false) {
      console.log('break')
    } else {
      const player = new Tone.Player(`http://localhost:8000/sounds/kick.wav`).toMaster();
      console.log('kick')
      player.autostart = true;
    }

  }

  const setBpm = (e) => {
    stopSeq()
    bpm = e.target.value
    playSeq()
  }

  const hello = () => {
    fetch('http://localhost:8000/hello')
      .then(res => res.text())
      .then(data => console.log(data))
  }

  const toggleStep = (e) => {
    setState({ ...state, pooped: e.target.id })
    console.log(state)
    console.log(!state.kickTrack[e.target.id])

  }

  return (
    <div className="App">
      <div className="transport">
        <button onClick={() => playSeq()}>PLAY SEQUENCE</button>
        <button onClick={() => stopSeq()}>STOP SEQUENCE</button>
        <input onChange={setBpm} type='range' defaultValue={bpm} min='60' max='240' />
      </div>

      <div className="tracks">

        <div className="kick-track">

          <button onClick={() => playSound(sounds.kick)}>KICK</button>

          {state.kickTrack.map((step, i) => (<button key={i} className="step" id={i} onClick={toggleStep}>{step ? 'X' : 'O'}</button>))}

        </div>

        {/* <div className="snare-track">
          <button onClick={() => playSound(sounds.snare)}>SNARE</button>
        </div>

        <div className="hat-track">
          <button onClick={() => playSound(sounds.hihat)}>HIHAT</button>
        </div>

        <div className="shaker-track">
          <button onClick={() => playSound(sounds.shaker)}>SHAKER</button>

        </div> */}
      </div>


      <button onClick={() => hello()}>Hello?</button>



    </div>
  );
}

export default App;
