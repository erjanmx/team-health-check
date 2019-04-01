import React, { Component } from "react";

class VoteBox extends Component {
  constructor(props) {
    super(props);

    this.upVote = this.upVote.bind(this);
    this.neutralVote = this.neutralVote.bind(this);
    this.downVote = this.downVote.bind(this);
  }

  upVote() {
    this.props.handleVote(1);
  }

  neutralVote() {
    this.props.handleVote(0);
  }

  downVote() {
    this.props.handleVote(-1);
  }

  render() {
    return (
      <div>
        <button onClick={this.upVote} className="icon is-large">
          <i className="mdi mdi-36px mdi-thumb-up-outline"></i>
        </button>
        <button onClick={this.neutralVote} className="icon is-large">
          <i className="mdi mdi-36px mdi-thumbs-up-down"></i>
        </button>
        <button onClick={this.downVote} className="icon is-large">
          <i className="mdi mdi-36px mdi-thumb-down-outline"></i>
        </button>
      </div>
    );
  }
}

export default VoteBox;
