import React, { Component } from "react";

class Voter extends Component {
  constructor(props) {
    super(props);

    this.handleVote = this.handleVote.bind(this);

    this.state = {
      vote: null,
    };
  }

  componentDidMount() {
    /*global Ably*/
    const channel = this.channel = Ably.channels.get(this.props.channelUuid);

    channel.attach();    
    channel.once("attached", () => {
      channel.presence.enter();
    });

    channel.subscribe((msg) => {
      if (msg.name === 'reset') {
        this.setState({ vote: null });
      }
    });
  }

  handleVote(vote) {
    this.setState({ vote });
    this.channel.publish('add_vote', { vote });
  }

  render() {
    return (
      <div className="has-text-centered">
        <h4 className="title is-4">{this.props.channelUuid}</h4>
        <div className="columns" style={{ fontSize: '7em' }}>
          <div className="column">
            <i onClick={(e) => this.handleVote(1, e)} style={{ color: 'green' }} className={this.state.vote === 1 ? 'fas fa-smile' : 'far fa-smile'}></i>
          </div>
          <div className="column">
            <i onClick={(e) => this.handleVote(0, e)} style={{ color: '#dcdc48' }} className={this.state.vote === 0 ? 'fas fa-meh' : 'far fa-meh'}></i>
          </div>
          <div className="column" >
            <i onClick={(e) => this.handleVote(-1, e)} style={{ color: 'red' }}  className={this.state.vote === -1 ? 'fas fa-frown' : 'far fa-frown'}></i>
          </div>
        </div>
      </div>
    );
  }
}

export default Voter;
