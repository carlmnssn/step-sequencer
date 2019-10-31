import React, { useState } from "react";
import Tone from 'tone'
import './App.css'

const App = () => {
  //GLOBALS 

  const step = document.querySelectorAll('.step')
  const bpmDisplay = document.querySelector('.bpm-display')
  const awakeDisp = document.querySelector('.awake-display')

  const sounds = ['chimes', 'clap_01', 'clap_02', 'hihat_01', 'hihat_02', 'hihat_03', 'hihat_04', 'hihat_05', 'hihat_06', 'kick_01', 'kick_02', 'kick_03', 'kick_04', 'kick_05', 'kick_06', 'reverse_crash', 'shaker_01', 'shaker_02', 'snare_01', 'snare_02', 'snare_03', 'snare_04', 'snare_05', 'snare_06']

  const clearedState = Array(16).fill(false);

  const [kickState, setKickState] = useState(clearedState)
  const [snareState, setSnareState] = useState(clearedState)
  const [hhState, setHhState] = useState(clearedState)
  const [ohState, setOhState] = useState(clearedState)
  const [bpmState, setBpmState] = useState('100')
  const [channel1State, setChannel1State] = useState('kick_01')
  const [channel2State, setChannel2State] = useState('snare_01')
  const [channel3State, setChannel3State] = useState('hihat_01')
  const [channel4State, setChannel4State] = useState('hihat_04')


  let globalInt;
  let playing;

  const init = () => {
    setKickState(clearedState)
    setSnareState(clearedState)
    setHhState(clearedState)
    setOhState(clearedState)
    setBpmState('120');
  }

  const playSeq = () => {
    if (!playing) {
      let i = 0;
      globalInt = setInterval(() => {
        isLive(i)
        playKick(kickState[i]);
        playSnare(snareState[i]);
        playHh(hhState[i]);
        playOh(ohState[i])
        i++
        if (i === kickState.length) {
          i = 0
        }
      }, 15000 / bpmState)
      playing = true;
    }
  }

  const clear = () => {
    stopSeq();
    setKickState(clearedState)
    setSnareState(clearedState)
    setHhState(clearedState)
    setOhState(clearedState)
    step.forEach(e => (e.classList.remove('active')))
  }

  const isLive = (i) => {
    step.forEach(step => { step.classList.remove('is-live') })
    step[i].classList.add('is-live')
    step[i + 16].classList.add('is-live')
    step[i + 32].classList.add('is-live')
    step[i + 48].classList.add('is-live')
  }

  const stopSeq = () => {
    if (playing) {
      step.forEach(step => { step.classList.remove('is-live') })
      clearInterval(globalInt);
      playing = false;
    }
  }

  const isActive = (step) => step ? '+' : '-'

  const setBpm = (e) => {
    stopSeq()
    setBpmState(e.target.value)
    bpmDisplay.innerHTML = `BPM ${bpmState}`
  }

  const hello = () => {
    fetch('http://localhost:8000/hello')
      .then(res => res.text())
      .then(data => awakeDisp.innerHTML = data)
      .then(e => setTimeout(() => {
        awakeDisp.innerHTML = ''
      }, 2000))
  }

  window.addEventListener('load', () => init())

  //PLAYERS, ONE FOR EACH TRACK

  const playKick = (step) => {
    if (step) {
      const player = new Tone.Player(`http://localhost:8000/sounds/${channel1State}.wav`).toMaster();
      console.log('kick')
      player.autostart = true;
    }
  }

  const playSnare = (step) => {
    if (step) {
      const player = new Tone.Player(`http://localhost:8000/sounds/${channel2State}.wav`).toMaster();
      console.log('snare')
      player.autostart = true;
    }
  }

  const playHh = (step) => {
    if (step) {
      const player = new Tone.Player(`http://localhost:8000/sounds/${channel3State}.wav`).toMaster();
      console.log('hh')
      player.autostart = true;
    }
  }

  const playOh = (step) => {
    if (step) {
      const player = new Tone.Player(`http://localhost:8000/sounds/${channel4State}.wav`).toMaster();
      console.log('oh')
      player.autostart = true;
    }
  }

  //TOGGLES, ONE FOR EACH TRACK

  const toggleKick = (e) => {
    e.preventDefault();
    stopSeq()
    const newArr = []
    kickState.map((step, i) => {
      if (i === Number(e.target.id)) {
        newArr.push(!step)
      } else {
        newArr.push(step)
      }
    })
    setKickState(newArr)
    e.target.classList.toggle('active');
  }

  const toggleSnare = (e) => {
    e.preventDefault();
    stopSeq()
    const newArr = []
    snareState.map((step, i) => {
      if (i === Number(e.target.id)) {
        newArr.push(!step)
      } else {
        newArr.push(step)
      }
    })
    setSnareState(newArr)
    e.target.classList.toggle('active');
  }

  const toggleHH = (e) => {
    e.preventDefault();
    stopSeq()
    const newArr = []
    hhState.map((step, i) => {
      if (i === Number(e.target.id)) {
        newArr.push(!step)
      } else {
        newArr.push(step)
      }
    })
    setHhState(newArr)
    e.target.classList.toggle('active');
  }

  const toggleOH = (e) => {
    e.preventDefault();
    stopSeq()
    const newArr = []
    ohState.map((step, i) => {
      if (i === Number(e.target.id)) {
        newArr.push(!step)
      } else {
        newArr.push(step)
      }
    })
    setOhState(newArr)
    e.target.classList.toggle('active');
  }

  // SELECT SOUND, ONE FOR EACH 

  const change1 = (e) => {
    stopSeq()
    setChannel1State(e.target.value)
  }

  const change2 = (e) => {
    stopSeq()
    setChannel2State(e.target.value)
  }

  const change3 = (e) => {
    stopSeq()
    setChannel3State(e.target.value)
  }

  const change4 = (e) => {
    stopSeq()
    setChannel4State(e.target.value)
  }


  return (

    <div className="App">
      <div className="header">DrummerBoi 3000</div>
      <div className="transport">
        <div>
          <p className="bpm-display">BPM {bpmState}</p>
          <input onChange={setBpm} type='range' defaultValue={bpmState} min='60' max='240' />
        </div>
        <button onClick={() => playSeq()}>PLAY</button>
        <button onClick={() => stopSeq()}>STOP</button>
        <button onClick={() => clear()}>CLEAR</button>
      </div>

      <div className="tracks">

        <div className="track kick-track">

          <div className="track-settings">
            <button className="track-preview" onClick={() => playKick(true)}>Preview Sound</button>
            <select className="select-sound" onChange={change1}>
              <option value="" selected disabled hidden>kick_01</option>
              {sounds.map(sound => (<option value={sound}>{sound}</option>))}
            </select>
          </div>
          <div className="track-steps">
            {kickState.map((step, i) => (<button key={i} className="step" id={i} onClick={toggleKick}>{isActive(step)}</button>))}
          </div>
        </div>

        <div className="track snare-track">
          <div className="track-settings">
            <button className="track-preview" onClick={() => playSnare(true)}>Preview Sound</button>
            <select className="select-sound" onChange={change2}>
              <option value="" selected disabled hidden>snare_01</option>
              {sounds.map(sound => (<option value={sound}>{sound}</option>))}
            </select>
          </div>
          <div className="track-steps">
            {snareState.map((step, i) => (<button key={i} className="step" id={i} onClick={toggleSnare}>{isActive(step)}</button>))}
          </div>
        </div>

        <div className="track hh-track">
          <div className="track-settings">
            <button className="track-preview" onClick={() => playHh(true)}>Preview Sound</button>
            <select className="select-sound" onChange={change3}>
              <option value="" selected disabled hidden>hihat_01</option>
              {sounds.map(sound => (<option value={sound}>{sound}</option>))}
            </select>
          </div>
          <div className="track-steps">
            {hhState.map((step, i) => (<button key={i} className="step" id={i} onClick={toggleHH}>{isActive(step)}</button>))}
          </div>
        </div>

        <div className="track oh-track">
          <div className="track-settings">
            <button className="track-preview" onClick={() => playOh(true)}>Preview Sound</button>
            <select className="select-sound" onChange={change4}>
              <option value="" selected disabled hidden>hihat_04</option>
              {sounds.map(sound => (<option value={sound}>{sound}</option>))}
            </select>
          </div>
          <div className="track-steps">
            {ohState.map((step, i) => (<button key={i} className="step" id={i} onClick={toggleOH}>{isActive(step)}</button>))}
          </div>
        </div>
      </div>

      <button className="awake-btn" onClick={() => hello()}>hey backend, are you alive?</button>
      <div className="awake-display"></div>

    </div>
  );
}

export default App;
