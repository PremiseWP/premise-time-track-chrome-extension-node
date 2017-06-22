import React, { Component } from 'react';
import TimerEditWidget from './TimerEditWidget';
import TimerTaxonomyWidget from './TimerTaxonomyWidget';
import FroceUserDownloadBtn from '../FroceUserDownloadBtn';
import PTT from '../PTT';
import HelpButtons from '../HelpButtons';
import UserButtons from '../UserButtons';


class TimerDashboard extends Component {
  constructor() {
    super();

    this.state = {
      message: '',
      timer: PTT.get('current_timer') || {},
      user: PTT.get('user') || {},
    };
  }

  componentWillMount() {
    if ( ! this.state.user.id ) {
      this.setState({
        message: <div className="message">
          <p
          className="error">
            We seem to have a problem loading your user. Let us try and fix that.
          </p>
          <FroceUserDownloadBtn
          onDownload={this._onUserForceDownload.bind(this)} />
        </div>,
      });
    }
  }

  render() {
    return (
      <div className="timer-dashboard-wrapper">
        {this.state.message}
        <TimerEditWidget />
        <TimerTaxonomyWidget taxonomyName="client" />
        <TimerTaxonomyWidget taxonomyName="project" />
        <HelpButtons />
        <UserButtons user={this.state.user} />
      </div>
    );
  }

  _openTimerEditWidget( timer ) {

    if ( ! ('id' in timer) ) {
      return;
    }

    this.setState({ timer });
  }

  _onUserForceDownload( user ) {
    PTT.set(user, 'user');
    PTT.setCookies();
    this.setState({
      message: <p>
        {'Thank you! We\'ve got your user.'}
      </p>,
      user: PTT.get('user'),
    });
    const hideMsg = function() {
      this.setState({
        message: '',
      });
    };
    setTimeout(hideMsg.bind(this), 3000);
  }
}

export default TimerDashboard;
