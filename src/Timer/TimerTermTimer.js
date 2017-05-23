import React, { Component } from 'react';
import $ from 'jquery'; // Import jQuery.

class TimerTermTimer extends Component {
  constructor() {
    super(); // super() must be called in our constructor.
  }

  render() {
    const props = this.props;

    console.log(props.timer);

    return (
      <li>
        <h4>
          {props.timer.title.rendered}
        </h4>
        <div className="timer-details-wrapper">
          <p className="timer-date">
            {this._formatDate( props.timer.date )}
          </p>
          <p className="timer-description"
            dangerouslySetInnerHTML={this._formatDescription( props.timer.content.rendered )} />
          <div className="timer-details-bottom-wrapper">
            <p className="timer-project">
              {props.timer.premise_time_tracker_project[0] /* TODO! */}&nbsp;
            </p>
            <p className="timer-hours">
              {props.timer.pwptt_hours} hrs
            </p>
          </div>
        </div>
      </li>
    );
  }

  _formatDate( date ) {
    const dayNames = [
      "Monday", "Tuesday", "Wednesday",
      "Thursday", "Friday", "Saturday", "Sunday"
    ];

    date = new Date( date );

    const day = date.getDate();
    const dayIndex = date.getDay();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return dayNames[dayIndex] + ' ' + (monthIndex + 1) + '/' + day  + '/' + year;
  }

  _formatDescription( description ) {
    // Strip tags!
    description = $(description).text();

    // 4 lines max.
    if ( description.length > 36 *3 ) {
      description = description.slice(0, (36*3 - 3) ) + '...';
    }

    return { __html: description };
  }
}

export default TimerTermTimer;
