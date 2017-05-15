import React, { Component } from 'react';
import $ from 'jquery'; // Import jQuery.
// import FontAwesome from 'react-fontawesome';

class TimerSearchResult extends Component {
  render() {
    return (
      <li>
        <a href="#" onClick={this._onClick.bind(this)}>
          {this.props.result.title.rendered}
        </a>
      </li>
    );
  }

  _onClick(event) {
    event.preventDefault();

    this.props.onClick( this.props.result );
  }
}

export default TimerSearchResult;
