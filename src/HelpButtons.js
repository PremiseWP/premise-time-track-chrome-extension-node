import React, { Component } from 'react';
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
        <a className="reset-link" href="?step=reset" title="Reset">
          <FontAwesome name="chain-broken" />
        </a>
      </div>
    );
  }
}

export default HelpButtons;
