import React, { Component } from 'react';
import TimerEditModal from './TimerEditModal';
import TimerSearchForm from './TimerSearchForm';
import TimerTaxonomies from './TimerTaxonomies';

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
        <TimerEditModal timer={timer} />
        <TimerSearchForm onResultClick={this._openTimerEditModal.bind(this)} />
        <TimerTaxonomies taxonomyName="clients" />
        <TimerTaxonomies taxonomyName="projects" />
        <TimerTaxonomies taxonomyName="timesheets" />
      </div>
    );
  }

  _openTimerEditModal( timer ) {

    if ( ! ('id' in timer) ) {
      return;
    }

    this.setState({ timer });
  }
}

export default TimerDashboard;
