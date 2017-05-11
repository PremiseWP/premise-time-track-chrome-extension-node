import React, { Component } from 'react';
import LoadingIcon from './LoadingIcon';
import TimerDashboard from './TimerDashboard';
import DiscoverWpApi from './DiscoverWpApi';

/**
 * Application loader.
 */
class AppLoader extends Component {
  constructor() {
    super();

    this.state = {
      view: <LoadingIcon />,
    }
  }

  componentDidMount() {
    console.log(PTT);

    let view;

    if ( window.ptt.auth && window.ptt.auth.authenticated() ) {
      console.log('authenticated');

      view = <TimerDashboard />;

    } else {

      let credentials;

      if ( window.ptt.creds ) {
        console.log('not authenticated but we have creds.');

        credentials = window.ptt.creds;
      } else {

        console.log('not authenticated, no creds.');
      }

      view = <DiscoverWpApi credentials={credentials}
        onDiscovered={this._showDashboard.bind(this)} />;
    }

    this.setState({ view });
  }

  render() {
    return (
      <div>
        {this.state.view}
      </div>
    );
  }

  _showDashboard() {
    const view = <TimerDashboard />;

    this.setState({ view });
  }
}

export default AppLoader;
