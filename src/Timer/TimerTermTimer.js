import React, { Component } from 'react';
// import $ from 'jquery'; // Import jQuery.

class TimerTermTimer extends Component {
  constructor() {
    super(); // super() must be called in our constructor.
  }

  render() {
    const props = this.props;

    console.log(props.timer);

    return (
      <li>
        <div>
          {props.timer.title.rendered}
        </div>
      </li>
    );
  }
}

export default TimerTermTimer;
