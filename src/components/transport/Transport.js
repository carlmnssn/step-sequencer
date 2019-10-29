import React from "react";
import PlayStop from './PlayStop';
import SetBpm from './SetBpm';
import SetKey from './SetKey';
import SetMode from './SetMode';

class Transport extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playing: false,
      bpm: 100,
      key: 'C',
      mode: 'major'
    }
  }

  render() {
    return (
      <div className="transport">
        <PlayStop playing={this.state.playing} />
        <SetBpm bpm={this.state.bpm} />
        <SetKey key={this.state.key} />
        <SetMode mode={this.state.mode} />
      </div>
    );
  };
}


export default Transport;
