import React, { Component } from "react";
import VoteBox from "./VoteBox";
import Counter from "./Counter";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      role: null,
    };
  }

  handleRole(role) {
    this.setState({ role })
  }

  render() {
    const role = this.state.role;
    let button;

    if (role === 'member') {
      button = <VoteBox />
    } else if (role === 'judge') {
      button = <Counter />
    } else {
      button = <div>
        <button onClick={(e) => this.handleRole('member', e)} className="icon is-large">
          member
        </button>
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
