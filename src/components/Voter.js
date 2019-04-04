import React, { Component } from "react";
import Icon from './Icon';
import ChannelHeader from './ChannelHeader';

import Ably from './../ably';

class Voter extends Component {
  constructor(props) {
    super(props);

    this.handleVote = this.handleVote.bind(this);
    this.handleSubscribe = this.handleSubscribe.bind(this);

    this.state = {
      vote: null,
    };
  }

  componentDidMount() {
    this.setupChannel();
  }

  setupChannel = () => {
    this.channel = Ably.channels.get(this.props.channelUuid);

    this.channel.attach();
    this.channel.subscribe((msg) => this.handleSubscribe(msg));
    this.channel.once("attached", () => this.channel.presence.enter());
  }

  handleSubscribe(msg) {
    if (msg.name === 'reset') {
      this.setState({ vote: null });
    }
  }

  handleVote(vote) {
    this.setState({ vote });
    this.channel.publish('add_vote', { vote });
  }

  render() {
    return (
      <div className="has-text-centered">
        <div>
          <ChannelHeader channelUuid={this.props.channelUuid} />
        </div>
        <div className="columns" style={{ fontSize: '7em' }}>
          <div className="column" onClick={(e) => this.handleVote(1, e)} >
            <Icon type={1} isSelected={this.state.vote === 1} />
          </div>
          <div className="column" onClick={(e) => this.handleVote(0, e)} >
            <Icon type={0} isSelected={this.state.vote === 0} />
          </div>
          <div className="column" onClick={(e) => this.handleVote(-1, e)} >
            <Icon type={-1} isSelected={this.state.vote === -1} />
          </div>
        </div>
      </div>
    );
  }
}

export default Voter;
