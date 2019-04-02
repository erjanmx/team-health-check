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
      <div>
        <button onClick={(e) => this.handleVote(1, e)} className="icon is-large">
          <i className="mdi mdi-36px mdi-thumb-up-outline"></i>
        </button>
        <button onClick={(e) => this.handleVote(0, e)} className="icon is-large">
          <i className="mdi mdi-36px mdi-thumbs-up-down"></i>
        </button>
        <button onClick={(e) => this.handleVote(-1, e)} className="icon is-large">
          <i className="mdi mdi-36px mdi-thumb-down-outline"></i>
        </button>
      </div>
    );
  }
}

export default Voter;
