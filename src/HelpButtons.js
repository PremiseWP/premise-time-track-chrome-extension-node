import React, { Component } from 'react';
import PTT from './PTT';
import FontAwesome from 'react-fontawesome';

class HelpButtons extends Component {
  render() {
    if ( this.props.step === 'reset' ) {
      return;
    }

    return (
      <div className="help-buttons-wrapper">
        <FontAwesome className="help-button" name="question-circle" title="Help" />
        <a className="new-tab-link" href="" title="Open in new Tab" target="_blank">
          <FontAwesome name="window-restore" />
        </a>
        <a className="reset-link" href="#" title="Reset"
          onClick={this._onReset.bind(this)}>
          <FontAwesome name="chain-broken" />
        </a>
      </div>
    );
  }

  _onReset( event ) {

    event.preventDefault();

    // Remove _ptt cookie, reset PTT.
    PTT.reset();

    this.props.onReset();
  }
}

export default HelpButtons;
