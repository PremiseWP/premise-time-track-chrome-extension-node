import React, { Component } from 'react';
import TimerDashboardWidget from './TimerDashboardWidget';
import TimerEditForm from './TimerEditForm';
import TimerSavedConfirmation from './TimerSavedConfirmation';
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
    const partial = this._getPartial.bind(this);

    return (
      <TimerDashboardWidget
        isOpen={this.state.widgetIsOpen}
        onAfterOpen={this._afterOpenWidget.bind(this)}
        onRequestClose={this._closeWidget.bind(this)}
        title={this.state.widgetTitle}
      >
        {partial}
      </TimerDashboardWidget>
    );
  }

  _getPartial() {
    let partial;

    if ( this.state.timerSavedConfirmation ) {
      partial = <TimerSavedConfirmation
        onClose={this._closeWidget.bind(this)}
        onAddAnotherTimer={this._timerSavedConfirmation.bind(this)} />
    } else if ( 'id' in this.state.timer ) {

      // Will open modal if has timer, see componentWillMount().
      const timer = this.state.timer;

      partial = <TimerEditForm
        timer={timer}
        onClose={this._closeWidget.bind(this)}
        onSave={this._timerSavedConfirmation.bind(this)} />;

    } else {

      partial = <TimerNew />;
    }

    return partial;
  }
}

export default TimerEditWidget;
