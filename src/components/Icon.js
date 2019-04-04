import React, { Component } from "react";

class Icon extends Component {
  config = {
    '1': { className: 'fa-smile', color: 'green' },
    '0': { className: 'fa-meh', color: '#dcdc48' },
    '-1': { className: 'fa-frown', color: 'red' },
  }

  getColor = () => this.config[this.props.type].color;

  getClassName() {
    const name = this.config[this.props.type].className;
    const prefix = this.props.isSelected ? 'fas' : 'far';

    return `${prefix} ${name}`;
  }

  render() {
    return (
      <i style={{ color: this.getColor() }} className={this.getClassName()} />
    );
  }
}

export default Icon;
