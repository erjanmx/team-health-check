import React, { Component } from "react";

class ChannelHeader extends Component {
  render() {
    return (
        <div>
          <p className="heading">Channel ID</p>
          <h4 className="title is-2 has-text-centered">{this.props.channelUuid}</h4>
        </div>
    );
  }
}

export default ChannelHeader;
