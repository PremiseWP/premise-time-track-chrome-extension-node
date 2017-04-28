import React, { Component } from 'react';
import TimerEditModal from './TimerEditModal';
import TimerSearchForm from './TimerSearchForm';
import TimerTaxonomies from './TimerTaxonomies';

class TimerDashboard extends Component {
  render() {
    return (
      <div className="timer-dashboard-wrapper">
        <TimerEditModal />
        <TimerSearchForm />
        <TimerTaxonomies taxonomyName="clients" />
        <TimerTaxonomies taxonomyName="projects" />
        <TimerTaxonomies taxonomyName="timesheets" />
      </div>
    );
  }
}

export default TimerDashboard;
