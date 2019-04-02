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
      if (msg.name !== 'add_vote') {
        return;
      }

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
      return '-';
    }

    const icons = {
      '1': <i style={{ color: 'green' }} className='far fa-smile'></i>,
      '0': <i style={{ color: '#dcdc48' }} className='far fa-meh'></i>,
      '-1': <i style={{ color: 'red' }} className='far fa-frown'></i>,   
    }
    
    return icons[_.minBy(this.state.members, 'vote').vote];
  }
  
  getVoted = () => this.state.members.filter(member => member.vote !== null);
  
  handleReset = () => {
    this.setState((prevState) => ({
      members: prevState.members.map(member => ({ id: member.id, vote: null }))
    }));
    this.channel.publish('reset', {});
  }
  
  render() {
    return (
      <section>
        <nav className="level is-mobile">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Channel ID</p>
              <h4 className="title is-2 has-text-centered">{this.state.channelUuid}</h4>
            </div>
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
              <p className="title">{this.getVoted().length}</p>
            </div>
          </div>
        </nav>

        <div className="has-text-centered" style={{ fontSize: '10em' }}>
          {this.getResult()}
        </div>        
        
        <button onClick={this.handleReset} className="button is-fullwidth is-medium">
          Clear
        </button>
      </section>
    );
  }
}

export default Counter;
