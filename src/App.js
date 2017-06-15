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
      view: <LoadingIcon />
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

  componentDidMount() {
    PTT._init();
    this._showInit();
  }

  _showInit() {

    const view = <DiscoverWpApi
        onDiscovered={this._showDashboard.bind(this)} />;

    this.setState({ view });
  }

  _showDashboard() {
    const view = <TimerDashboard />;

    this.setState({ view });
  }
}

export default App;
