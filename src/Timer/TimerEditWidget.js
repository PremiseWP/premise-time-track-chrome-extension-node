import React, { Component } from 'react';
import TimerDashboardWidget from './TimerDashboardWidget';
import TimerNew from './TimerNew';

class TimerEditWidget extends Component {
  constructor() {
    super(); // super() must be called in our constructor.

    // Initial state.
    this.state = {
      widgetIsOpen: true,
      widgetTitle: 'New Timer',
      timerSavedConfirmation: false,
      timer: {} // We manage the current timer here, only!
    };
  }

  _openWidget() {
    this.setState({widgetIsOpen: true});
  }

  _afterOpenWidget() {
    // references are now sync'd and can be accessed.
    // this.refs.subtitle.style.color = 'red';
  }

  _closeWidget() {
    this.setState({widgetIsOpen: false, timerSavedConfirmation: false});
  }

  render() {
    return (
      <TimerDashboardWidget
        isOpen={this.state.widgetIsOpen}
        onAfterOpen={this._afterOpenWidget.bind(this)}
        onRequestOpen={this._openWidget.bind(this)}
        onRequestClose={this._closeWidget.bind(this)}
        title={this.state.widgetTitle}
      >
        <TimerNew />
      </TimerDashboardWidget>
    );
  }
}

export default TimerEditWidget;
