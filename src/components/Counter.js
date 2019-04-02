import React, { Component } from "react";

const _ = require('lodash');

class Counter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      members: [],
    };
  }

  componentDidMount() {
    /*global Ably*/
    const channel = this.channel = Ably.channels.get("team-health-check-1");

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
      return '';
    }
    
    return _.minBy(this.state.members, 'vote').vote;
  }
  
  getVoted = () => this.state.members.filter(member => member.vote !== null);
  
  render() {
    return (
      <section className="section">
        { this.state.members.length }
        <div></div>
        { this.getVoted().length }
        <div></div>
        {this.getResult() }
      </section>
    );
  }
}

export default Counter;
