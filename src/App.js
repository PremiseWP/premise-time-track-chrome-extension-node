import React, { Component } from 'react';
import Cookies from 'js-cookie';
import HelpButtons from './HelpButtons';
import AppLoader from './AppLoader';
import './App.css';

window.ptt = {
  creds: Cookies.getJSON( '_ptt' ),
};

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
