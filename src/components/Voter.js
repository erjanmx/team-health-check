import React, { Component } from "react";

class Voter extends Component {
  componentDidMount() {
    /*global Ably*/
    const channel = this.channel = Ably.channels.get(this.props.channelUuid);

    channel.attach();    
    channel.once("attached", () => {
      channel.presence.enter();
    });
  }

  handleVote(vote) {
    this.channel.publish('add_vote', { vote });
  }

  render() {
    return (
      <div className="has-text-centered">
        <h4 className="title is-4">{this.props.channelUuid}</h4>
        <div className="columns" style={{ fontSize: '7em' }}>
          <div className="column">
            <i onClick={(e) => this.handleVote(1, e)} class='far fa-smile'></i>
          </div>
          <div className="column">
            <i onClick={(e) => this.handleVote(0, e)} class='far fa-meh'></i>
          </div>
          <div className="column" >
            <i onClick={(e) => this.handleVote(-1, e)} class='far fa-frown'></i>
          </div>
        </div>
      </div>
    );
  }
}

export default Voter;
