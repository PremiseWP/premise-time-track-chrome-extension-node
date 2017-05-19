import React, { Component } from 'react';
import TimerEditWidget from './TimerEditWidget';
import TimerTaxonomyWidget from './TimerTaxonomyWidget';

class TimerDashboard extends Component {
  constructor() {
    super(); // super() must be called in our constructor.

    this.state = {
      timer: {}
    };
  }

  render() {
    const timer = this.state.timer;

    return (
      <div className="timer-dashboard-wrapper">
        <TimerEditWidget timer={timer} />
        <TimerTaxonomyWidget taxonomyName="client" />
        <TimerTaxonomyWidget taxonomyName="project" />
      </div>
    );
  }

  _openTimerEditWidget( timer ) {

    if ( ! ('id' in timer) ) {
      return;
    }

    this.setState({ timer });
  }
}

export default TimerDashboard;
