import React, { Component } from 'react';
import $ from 'jquery';

class TimerDashboardWidget extends Component {

  render() {
console.log(this.props.children);
    return (
      <div className="timer-dashboard-widget">
        <h2 className="widget-title">
          {this.props.title}
        </h2>
        <div className="widget-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default TimerDashboardWidget;
