import React, { Component } from 'react';
import $ from 'jquery';

class TimerDashboardWidget extends Component {

  render() {
    const props = this.props;

    let stateClass = 'open';

    if ( ! props.isOpen ) {
      stateClass = 'closed';
    }

    const widgetClass = 'timer-dashboard-widget ' + stateClass + ' ' + props.class;

    return (
      <div className={widgetClass}>
        <h2 className="widget-title"
          onClick={this._closeOrOpen.bind(this,stateClass)}>
          {props.title}
        </h2>
        <div className="widget-content">
          {props.children}
        </div>
      </div>
    );
  }

  _closeOrOpen(stateClass) {
    console.log(stateClass);
    if ( stateClass === 'open' ) {
      this.props.onRequestClose();

      return;
    }
    this.props.onRequestOpen();
  }
}

export default TimerDashboardWidget;
