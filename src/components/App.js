import React, { Component } from "react";
import Voter from "./Voter";
import Counter from "./Counter";

class App extends Component {
  constructor(props) {
    super(props);

    this.joinChannel = this.joinChannel.bind(this);

    this.state = {
      role: '',
      channelUuid: '',
    };
  }

  joinChannel(e) {
    e.preventDefault();

    const channelUuid = e.target.elements.channelUuid.value.trim();

    if (channelUuid) {
      this.setState({ role: 'member', channelUuid: channelUuid });
    }
  }

  render() {
    let container = 
      <form onSubmit={ this.joinChannel }>
        <h4 className="title is-4 has-text-centered">Team health checker</h4>
        <hr></hr>
        <div className="columns">
          <div className="column">
            <div className="control">
                <input type="number" autoFocus min="0" max="9999" className="input is-rounded" name="channelUuid" placeholder="Channel ID" autoComplete="off"/>
            </div>
          </div>
          <div className="column">
            <div className="control">
              <button className="button is-fullwidth is-dark is-rounded">Join</button>
            </div>
          </div>
        </div>
        <h6 className="title is-6 has-text-centered">or</h6>
        <div className="field">
          <div className="control">
            <button onClick={(e) => this.setState({ role: 'judge' })} className="button is-fullwidth is-medium">
              Create
            </button>
          </div>
        </div>
      </form>
    
    const role = this.state.role;

    if (role === 'member') {
      container = <Voter channelUuid={this.state.channelUuid} />
    } else if (role === 'judge') {
      container = <Counter />
    }
   
    return (
      <section className="hero is-fullheight">
        <div class="hero-body">
          <div class="container has-text-centered">
            { container }
          </div>
        </div>
      </section>
    );
  }
}

export default App;
