import React, { Component } from 'react';
import TimerSearchForm from './TimerSearchForm';
import TimerTaxonomies from './TimerTaxonomies';

class TimerDashboard extends Component {
  render() {
    return (
      <div className="timer-dashboard-wrapper">
        <a href="?step=ptt-form" className="button new-timer">New Timer</a>
        <TimerSearchForm />
        <TimerTaxonomies taxonomyName="clients" />
        <TimerTaxonomies taxonomyName="projects" />
        <TimerTaxonomies taxonomyName="timesheets" />
      </div>
    );
  }
}

export default TimerDashboard;
