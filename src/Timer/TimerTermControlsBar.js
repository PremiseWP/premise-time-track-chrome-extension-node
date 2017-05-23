import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class TimerTermControlsBar extends Component {
  render() {
    const props = this.props;
    return (
     <div className="term-controls-bar">
        <a className="back-arrow" href="#" onClick={this._backToTermsList.bind(this)}>
          <FontAwesome
            name="long-arrow-left" />
        </a>
        <a className="term-filters" href="#" onClick={this._openTermFilters.bind(this)}>
          <FontAwesome
            name="list-ul" />
        </a>
        <div className="term-total-hours">
          100 hrs
        </div>
      </div>
    );
  }

  _backToTermsList( event ) {

    event.preventDefault();

    this.props.onBack();
  }

  _openTermFilters( event ) {

    event.preventDefault();
  }
}

export default TimerTermControlsBar;
