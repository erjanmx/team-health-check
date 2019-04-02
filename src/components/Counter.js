import React, { Component } from "react";

const _ = require('lodash');

class Counter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      members: [],
      channelUuid: null,
    };
  }

  getNewChannelUuid = () => {
    // 4 digit code
    const channelUuid = Math.floor(1000 + Math.random() * 9000);

    this.setState({ channelUuid });

    return channelUuid;
  }

  componentDidMount() {
    const channelUuid = this.getNewChannelUuid();

    /*global Ably*/
    const channel = this.channel = Ably.channels.get(channelUuid);

    channel.attach();    

    channel.subscribe((msg) => {
      const members = this.state.members;
      const ind = _.findIndex(members, { id: msg.connectionId })

      if (ind !== -1) {
        members[ind].vote = msg.data.vote;
        this.setState({ members });
      }
    });

    channel.presence.subscribe(() => {
      channel.presence.get((err, presentMembers) => {
        const members = presentMembers.map(member => ({        
          id: member.connectionId,
          // preserve previous users' votes
          vote: _.get(_.find(this.state.members, { id: member.connectionId }), 'vote', null),
        }));

        this.setState({ members });        
      });
    });
  }

  getResult = () => {
    // do not show until every member votes
    if (this.state.members.length === 0 || this.state.members.length !== this.getVoted().length) {
      return <i class='far fa-smile'></i>;
    }
    
    return _.minBy(this.state.members, 'vote').vote;
  }
  
  getVoted = () => this.state.members.filter(member => member.vote !== null);
  
  handleReset = () => this.setState((prevState) => ({
    members: prevState.members.map(member => ({ id: member.id, vote: null }))
  }));
  
  render() {
    return (
      <section>
        <nav class="level is-mobile">
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Channel ID</p>
              <h4 className="title is-2 has-text-centered">{this.state.channelUuid}</h4>
            </div>
          </div>
        </nav>
        <nav class="level is-mobile">
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Users</p>
              <p class="title">{this.state.members.length}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Voted</p>
              <p class="title">{this.getVoted().length}</p>
            </div>
          </div>
        </nav>

        <div className="has-text-centered" style={{ fontSize: '10em' }}>
          {this.getResult()}
        </div>        
        
        {this.getResult() ? <button onClick={this.handleReset} className="button is-fullwidth is-medium">
          Clear
        </button> : ''}
      </section>
    );
  }
}

export default Counter;
