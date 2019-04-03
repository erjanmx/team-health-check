import React, { Component } from "react";

class Main extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const channelUuid = e.target.elements.channelUuid.value.trim();
    
    if (channelUuid) {
      this.props.handleChange({ 
        role: 'voter', 
        channelUuid: channelUuid 
      });
    }
  }

  render() {    
    return (
      <div className="has-text-centered">
        <form onSubmit={this.handleFormSubmit}>
          <h4 className="title is-4">Team health checker</h4>
          <hr></hr>
          <div className="columns">
            <div className="column">
              <div className="control">
                <input type="number" autoFocus min="1000" max="9999" className="input" name="channelUuid" placeholder="Channel ID" autoComplete="off" />
              </div>
            </div>
            <div className="column">
              <div className="control">
                <button className="button is-fullwidth is-dark">Join</button>
              </div>
            </div>
          </div>
          <h6 className="title is-6">or</h6>
          <div className="field">
            <div className="control">
              <button onClick={(e) => this.props.handleChange({ role: 'counter' })} className="button is-fullwidth is-medium">
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Main;
