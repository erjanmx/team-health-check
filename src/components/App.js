import React, { Component } from "react";
import Main from "./Main";
import Voter from "./Voter";
import Counter from "./Counter";

const _ = require('lodash');

class App extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      role: '',
      channelUuid: _.random(1000, 9999),
    };
  }

  handleChange(state) {
    this.setState(state);
  }

  render() {
    let container;

    switch(this.state.role) {
      case 'voter':
        container = <Voter channelUuid={this.state.channelUuid} />
        break;
      case 'counter':
        container = <Counter channelUuid={this.state.channelUuid} />
        break;
      default:
        container = <Main handleChange={this.handleChange}/>
    }

    return (
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            { container }
          </div>
        </div>
      </section>
    );
  }
}

export default App;
