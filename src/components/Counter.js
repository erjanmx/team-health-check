import React, { Component } from "react";

const _ = require('lodash');

class Counter extends Component {
  getResult = () => {
    // do not show until every member votes
    if (this.props.members.length === 0 || this.props.members.length !== this.getVoted().length) {
      return '';
    }
    
    return _.minBy(this.props.members, 'vote').vote;
  }
  
  getVoted = () => this.props.members.filter(member => member.vote !== null);
  
  render() {
    return (
      <section className="section">
        { this.props.members.length }
        <div></div>
        { this.getVoted().length }
        <div></div>
        {this.getResult() }
      </section>
    );
  }
}

export default Counter;
