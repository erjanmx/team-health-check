import React, { Component } from "react";
import VoteBox from "./VoteBox";
import Counter from "./Counter";

const _ = require('lodash');

class App extends Component {
  constructor(props) {
    super(props);

    this.handleVote = this.handleVote.bind(this);

    this.state = {
      members: [],
    };
  }

  componentDidMount() {
    /*global Ably*/
    const channel = this.channel = Ably.channels.get("team-health-check-1");

    channel.attach();    
    channel.once("attached", () => {
      channel.presence.enter();
    });

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
          vote: _.get(_.find(this.state.members, { id: member.connectionId }), 'vote', null),
        }));

        this.setState({ members });        
      });
    });
  }

  handleVote(vote) {
    this.channel.publish('add_vote', { vote });
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-half is-offset-one-quarter">
              <VoteBox handleVote={this.handleVote} />
              <Counter members={this.state.members} />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default App;
