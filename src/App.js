import React, { Component } from 'react';
import HelpButtons from './HelpButtons';
import TimerDashboard from './TimerDashboard';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <TimerDashboard />
        <HelpButtons step="" />
      </div>
    );
  }
}

export default App;
