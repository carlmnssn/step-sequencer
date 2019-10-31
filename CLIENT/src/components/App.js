import React, { useState } from "react";
import Tone from 'tone'
import './App.css'

const App = () => {

  //GLOBALS 

  const step = document.querySelectorAll('.step')

  const sounds = {
    kick: '/sounds/kick.wav',
    chimes: '/sounds/chimes.wav',
    snare: '/sounds/snare.wav',
    shaker: '/sounds/shaker.wav',
    hihat: '/sounds/hihat.wav'
  }
  const initialState = {
    kick: Array(16).fill(false),
    snare: Array(16).fill(false),
    hh: Array(16).fill(false),
    oh: Array(16).fill(false)
  };

  const [kickState, setKickState] = useState(initialState.kick)
  const [snareState, setSnareState] = useState(initialState.snare)
  const [hhState, setHhState] = useState(initialState.hh)
  const [ohState, setOhState] = useState(initialState.oh)

  let globalInt;
  let playing;
  let bpm = '120'

  const playSeq = () => {
    if (!playing) {
      let i = 0;
      globalInt = setInterval(() => {
        playKick(kickState[i]);
        playSnare(snareState[i]);
        playHh(hhState[i]);
        playOh(ohState[i])
        i++
        if (i === kickState.length) {
          i = 0
        }
      }, 15000 / bpm)
      playing = true;
    }
  }


  const stopSeq = () => {
    if (playing) {
      clearInterval(globalInt);
      playing = false;
    }
  }

  const isActive = (step) => step ? 'O' : '-'



  const setBpm = (e) => {
    stopSeq()
    bpm = e.target.value
    playSeq()
  }

  const hello = () => {
    console.log(step)
    fetch('http://localhost:8000/hello')
      .then(res => res.text())
      .then(data => console.log(data))
  }

  //PLAYERS ONE FOR EACH TRACK

  const playKick = (step) => {
    if (step) {
      const player = new Tone.Player(`http://localhost:8000/sounds/kick.wav`).toMaster();
      console.log('kick')
      player.autostart = true;
    }
  }

  const playSnare = (step) => {
    if (step) {
      const player = new Tone.Player(`http://localhost:8000/sounds/snare.wav`).toMaster();
      console.log('snare')
      player.autostart = true;
    }
  }

  const playHh = (step) => {
    if (step) {
      const player = new Tone.Player(`http://localhost:8000/sounds/hihat.wav`).toMaster();
      console.log('hh')
      player.autostart = true;
    }
  }

  const playOh = (step) => {
    if (step) {
      const player = new Tone.Player(`http://localhost:8000/sounds/shaker.wav`).toMaster();
      console.log('oh')
      player.autostart = true;
    }
  }



  //TOGGLES ONE FOR EACH TRACK

  const toggleKick = (e) => {
    e.preventDefault();
    const newArr = []
    kickState.map((step, i) => {
      if (i === Number(e.target.id)) {
        newArr.push(!step)
      } else {
        newArr.push(step)
      }
    })
    setKickState(newArr)
  }

  const toggleSnare = (e) => {
    e.preventDefault();
    const newArr = []
    snareState.map((step, i) => {
      if (i === Number(e.target.id)) {
        newArr.push(!step)
      } else {
        newArr.push(step)
      }
    })
    setSnareState(newArr)
  }

  const toggleHH = (e) => {
    e.preventDefault();
    const newArr = []
    hhState.map((step, i) => {
      if (i === Number(e.target.id)) {
        newArr.push(!step)
      } else {
        newArr.push(step)
      }
    })
    setHhState(newArr)
  }

  const toggleOH = (e) => {
    e.preventDefault();
    const newArr = []
    ohState.map((step, i) => {
      if (i === Number(e.target.id)) {
        newArr.push(!step)
      } else {
        newArr.push(step)
      }
    })
    setOhState(newArr)
  }

  return (
    <div className="App">
      <div className="transport">
        <button onClick={() => playSeq()}>PLAY SEQUENCE</button>
        <button onClick={() => stopSeq()}>STOP SEQUENCE</button>
        <input onChange={setBpm} type='range' defaultValue={bpm} min='60' max='240' />
      </div>

      <div className="tracks">

        <div className="track kick-track">

          <button className="track-preview" onClick={() => playKick(sounds.kick)}>KICK</button>
          <div className="track-steps">
            {kickState.map((step, i) => (<button key={i} className="step" id={i} onClick={toggleKick}>{isActive(step)}</button>))}
          </div>
        </div>

        <div className="track snare-track">
          <button className="track-preview" onClick={() => playSnare(sounds.snare)}>SNARE</button>
          <div className="track-steps">
            {snareState.map((step, i) => (<button key={i} className="step" id={i} onClick={toggleSnare}>{isActive(step)}</button>))}
          </div>
        </div>

        <div className="track hh-track">
          <button className="track-preview" onClick={() => playHh(sounds.hihat)}>HATS</button>
          <div className="track-steps">
            {hhState.map((step, i) => (<button key={i} className="step" id={i} onClick={toggleHH}>{isActive(step)}</button>))}
          </div>
        </div>

        <div className="track oh-track">
          <button className="track-preview" onClick={() => playOh(sounds.shaker)}>OPEN HATS</button>
          <div className="track-steps">
            {ohState.map((step, i) => (<button key={i} className="step" id={i} onClick={toggleOH}>{isActive(step)}</button>))}
          </div>
        </div>

      </div>


      <button onClick={() => hello()}>Hello?</button>



    </div>
  );
}

export default App;
