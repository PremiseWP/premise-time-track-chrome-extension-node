import React, { Component } from 'react';
import TimerDashboardWidget from './TimerDashboardWidget';
import TimerTaxonomyTerms from './TimerTaxonomyTerms';
import TimerTaxonomyTerm from './TimerTaxonomyTerm';

class TimerTaxonomyWidget extends Component {
  constructor() {
    super(); // super() must be called in our constructor.

    // Initial state.
    this.state = {
      widgetIsOpen: false,
      widgetTitle: this.props.taxonomyName,
      term: {} // We manage the current term here, only!
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
    this.setState({widgetIsOpen: false});
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

    if ( ! this.state.widgetIsOpen ) {
      return partial;
    }

    /*if ( 'id' in this.state.term ) {

      // Will open modal if has term, see componentWillMount().
      const term = this.state.term;

      partial = <TimerTaxonomyTerm
        term={term}
        onClose={this._closeWidget.bind(this)} />;

    } else {

      partial = <TimerTaxonomyTerms
        taxonomyName={this.props.taxonomyName} />;
    }*/

    return partial;
  }
}

export default TimerTaxonomyWidget;
