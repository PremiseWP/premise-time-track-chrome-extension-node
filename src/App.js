import React, { Component } from 'react';
import HelpButtons from './HelpButtons';
import AppLoader from './AppLoader';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <AppLoader />
        <HelpButtons step="" />
      </div>
    );
  }
}

export default App;
