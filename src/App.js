import React, { Component } from 'react';
import PTT from './PTT';
import HelpButtons from './HelpButtons';
import LoadingIcon from './LoadingIcon';
import Header from './Header';
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
      view: <LoadingIcon
        message="Locating your info.."/>
    }
  }

  render() {
    return (
      <div className="app">
        <Header />
        <div className="container">
          {this.state.view}
          <HelpButtons onReset={this._showInit.bind(this)} />
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
