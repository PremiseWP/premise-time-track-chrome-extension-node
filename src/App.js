import React, { Component } from 'react';
import LoadingIcon from './LoadingIcon';
import TimerDashboard from './Timer/TimerDashboard';
import DiscoverWpApi from './DiscoverWpApi';
import HelpButtons from './HelpButtons';
import PTT from './PTT';
import './css/App.css';

/**
 * Application loader.
 */
class App extends Component {
  constructor() {
    super();

    this.state = {
      view: <LoadingIcon
        message="Locating your info.."/>
    }
  }

  render() {
    return (
      <div className="app">
        <div className="header">
          <h2>Premise Time Tracker</h2>
        </div>
        <div className="container">
          {this.state.view}
          <HelpButtons />
        </div>
      </div>
    );
  }

  // before the component loads
  componentWillMount() {
    PTT._init();
  }

  // once the component has loaded
  componentDidMount() {
    this._showInit();
  }

  // show the initial view,
  // used by componentDidMount and
  // help buttons - on reset.
  _showInit() {
    // DiscoverWpApi will check if
    // user is authenticated
    const view = <DiscoverWpApi
      onDiscovered={this._showDashboard.bind(this)} />;

    this.setState({ view });
  }

  // show the dashboard.
  _showDashboard() {
    const view = <TimerDashboard />;

    this.setState({ view });
  }
}

export default App;
