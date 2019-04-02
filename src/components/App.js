import React, { Component } from "react";
import Voter from "./Voter";
import Counter from "./Counter";

class App extends Component {
  constructor(props) {
    super(props);

    this.joinChannel = this.joinChannel.bind(this);

    this.state = {
      role: null,
      channelUuid: '',
    };
  }

  handleRole(role) {
    this.setState({ role })
  }

  joinChannel(e) {
    e.preventDefault();

    const channelUuid = e.target.elements.channelUuid.value.trim();

    if (channelUuid) {
      this.setState({ role: 'member', channelUuid: channelUuid });
    }
  }

  render() {
    const role = this.state.role;
    let button;

    if (role === 'member') {
      button = <div>
        <Voter channelUuid={this.state.channelUuid }/>
        </div>
    } else if (role === 'judge') {
      button = <Counter />
    } else {
      button = <div>
        <form onSubmit={ this.joinChannel }>
          <div className="field">
            <div className="control">
              <input type="text" className="input" name="channelUuid" placeholder="uuid" />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-primary">Join</button>
            </div>
          </div>
        </form>
        <button onClick={(e) => this.handleRole('judge', e)} className="icon is-large">
          judge
        </button>
      </div>
    }
   
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-half is-offset-one-quarter">
              { button }
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default App;
