import React, { Component } from 'react';
// import FontAwesome from 'react-fontawesome';

class TimerSearchForm extends Component {
  render() {
    return (
      <div className="search-timers-wrapper">
        <input type="text" name="search-timers" className="search-timers" placeholder="Search timers" />
        <div className="ajax-results-timers"></div>
      </div>
    );
  }
}

export default TimerSearchForm;
