import React, { Component } from 'react';
import TimerEditWidget from './TimerEditWidget';
import TimerTaxonomyWidget from './TimerTaxonomyWidget';
// import FroceUserDownloadBtn from '../FroceUserDownloadBtn';
import PTT from '../PTT';

import UserButtons from '../UserButtons';


class TimerDashboard extends Component {
  constructor(props) {
    super();

    this.state = {
      message: props.message || '',
      user:    PTT.get('user')          || {},
    };
  }

  render() {
    return (
      <div className="timer-dashboard-wrapper">
        {this.state.message}
        <TimerEditWidget />
        <TimerTaxonomyWidget taxonomyName="client" />
        <TimerTaxonomyWidget taxonomyName="project" />
        <UserButtons user={this.state.user} />
      </div>
    );
  }
}

export default TimerDashboard;
