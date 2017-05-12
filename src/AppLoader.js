import React, { Component } from 'react';
import Cookies from 'js-cookie';
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
      ptt: { creds: Cookies.getJSON( '_ptt' ) }
    }
  }

  componentDidMount() {
    console.log(this.state.ptt);

    const ptt = this.state.ptt;

    let view;

    if ( ptt.auth && ptt.auth.authenticated() ) {
      console.log('authenticated');

      view = <TimerDashboard />;

    } else {

      let credentials;

      if ( ptt.creds ) {
        console.log('not authenticated but we have creds.');

      } else {

        console.log('not authenticated, no creds.');
      }

      view = <DiscoverWpApi ptt={ptt}
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

  _showDashboard( ptt ) {
    const view = <TimerDashboard />;

    this.setState({ view, ptt });
  }
}

export default AppLoader;
