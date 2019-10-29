import React from 'react'

class SetBpm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bpm: this.props.bpm
    }
  }

  render() {

    const changeBpm = (event) => {
      this.setState({ bpm: event.target.value })
    }
    return (
      <div className="transport__setbpm">
        <input type="range" min="60" max="240" defaultValue={this.state.bpm} onChange={changeBpm} step="1" />
        <p>{this.state.bpm}</p>
      </div>
    )
  }
}


export default SetBpm
