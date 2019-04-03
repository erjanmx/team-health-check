import React, { Component } from "react";
import Icon from "./Icon";
import ChannelHeader from "./ChannelHeader";
import Ably from './../ably';

const _ = require('lodash');

class Counter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      members: [],
    };
  }

  getVotedMembers = () => this.state.members.filter(member => member.vote !== null);

  componentDidMount() {
    this.setupChannel();
  }

  setupChannel() {
    this.channel = Ably.channels.get(this.props.channelUuid);

    this.channel.attach();
    this.channel.subscribe((msg) => this.handleSubscribe(msg));
    this.channel.presence.subscribe(() => this.channel.presence.get((e, members) => this.updateMembers(members)));

    this.resetVotes();
  }

  handleSubscribe(msg) {
    if (msg.name === 'add_vote') {
      const members = this.state.members;
      const ind = _.findIndex(members, { id: msg.connectionId })

      if (ind !== -1) {
        members[ind].vote = msg.data.vote;
        this.setState({ members });
      }
    } else if (msg.name === 'reset') {
      this.setState((prevState) => ({
        members: prevState.members.map(member => ({ id: member.id, vote: null }))
      }));
    }
  }

  updateMembers(presentMembers) {
    const members = presentMembers.map(member => ({
      id: member.connectionId,
      // preserve previous users' votes
      vote: _.get(_.find(this.state.members, { id: member.connectionId }), 'vote', null),
    }));

    this.setState({ members });   
  }
  
  resetVotes = () => {
    this.channel.publish('reset', {});
  }

  render() {
    let result = '-';

    // show only when every member has voted
    if (this.state.members.length > 0 && this.state.members.length === this.getVotedMembers().length) {
      const vote = _.minBy(this.state.members, 'vote').vote;
      result = <Icon type={vote} />
    }

    return (
      <section>
        <nav className="level is-mobile">
          <div className="level-item has-text-centered">
            <ChannelHeader channelUuid={this.props.channelUuid} />
          </div>
        </nav>
        <nav className="level is-mobile">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Users</p>
              <p className="title">{this.state.members.length}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Voted</p>
              <p className="title">{this.getVotedMembers().length}</p>
            </div>
          </div>
        </nav>

        <div className="result has-text-centered" style={{ fontSize: '10em' }}>
          {result}
        </div>        
        
        <button onClick={this.resetVotes} className="button is-fullwidth is-medium">
          Clear
        </button>
      </section>
    );
  }
}

export default Counter;
