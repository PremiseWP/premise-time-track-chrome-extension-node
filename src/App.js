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
    this._showInit();
  }

  _showInit() {
    console.log(PTT);

    let view;

    if ( PTT.get('auth') && PTT.get('auth').authenticated ) {
      console.log('authenticated');

      view = <TimerDashboard />;

    } else {

      if ( PTT.get('creds') ) {
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
