import React from 'react'

class PlayStop extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playing: this.props.playing
    }
  }

  render() {
    const playPause = (playstop) => {
      playstop = !this.state.playing
      this.setState({ playing: playstop })
    }
    let playing = '';
    this.state.playing ? playing = 'Stop' : playing = 'Play';

    return (
      <div className="transport__playstop">
        <button onClick={() => playPause(this.state.playing)}>{playing}</button>
      </div>
    )
  }
}

export default PlayStop
