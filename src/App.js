import React, { Component } from 'react';
import PTT from './PTT';
import HelpButtons from './HelpButtons';
import LoadingIcon from './LoadingIcon';
import TimerDashboard from './Timer/TimerDashboard';
import DiscoverWpApi from './DiscoverWpApi';
import './css/App.css';

/**
 * Application loader.
 */
class App extends Component {
  constructor() {
    super();

    this.state = {
      view: <LoadingIcon />
    }
  }

  render() {
    return (
      <div className="container">
        {this.state.view}
        <HelpButtons step="" />
      </div>
    );
  }

  componentDidMount() {

    console.log(PTT);

    let view;

    if ( PTT.auth && PTT.auth.authenticated() ) {
      console.log('authenticated');

      view = <TimerDashboard />;

    } else {

      if ( PTT.creds ) {
        console.log('not authenticated but we have creds.');

      } else {

        console.log('not authenticated, no creds.');
      }

      view = <DiscoverWpApi
        onDiscovered={this._showDashboard.bind(this)} />;
    }

    this.setState({ view });
  }

  _showDashboard() {
    const view = <TimerDashboard />;

    this.setState({ view });
  }
}

export default App;
