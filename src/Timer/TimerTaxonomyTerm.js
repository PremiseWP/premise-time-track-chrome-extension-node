import React, { Component } from 'react';
// import $ from 'jquery'; // Import jQuery.

class TimerTaxonomyTerm extends Component {
  constructor() {
    super(); // super() must be called in our constructor.
  }

  render() {
    const props = this.props;

    // console.log(props.term);

    return (
      <li>
        <a href="#" onClick={this._handleClick.bind(this)}>
          {props.term.name}
        </a>
      </li>
    );
  }

  _handleClick( event ) {
    event.preventDefault();

    const props = this.props;

    props.selectedTerm( props.term );
  }
}

export default TimerTaxonomyTerm;
