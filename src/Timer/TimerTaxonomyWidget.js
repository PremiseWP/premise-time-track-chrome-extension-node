import React, { Component } from 'react';
import TimerDashboardWidget from './TimerDashboardWidget';
import TimerTaxonomyTerms from './TimerTaxonomyTerms';
import TimerTaxonomyTerm from './TimerTaxonomyTerm';

class TimerTaxonomyWidget extends Component {
  constructor(props) {
    super(props); // super() must be called in our constructor.

    // Initial state.
    this.state = {
      widgetIsOpen: false,
      widgetTitle: '',
      term: {} // We manage the current term here, only!
    };
  }

  componentWillMount() {
    this._setTitle();
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
        <div>here{partial}</div>
      </TimerDashboardWidget>
    );
  }

  _setTitle() {

    const taxonomyNamePlural = this.props.taxonomyName + 's';

    // Capitalize.
    const taxonomyTitle = taxonomyNamePlural.charAt(0).toUpperCase() +
      taxonomyNamePlural.slice(1);

    this.setState({widgetTitle: taxonomyTitle});

    return taxonomyTitle;
  }

  _getPartial() {
    let partial;

    if ( ! this.state.widgetIsOpen ) {
      return <span>there</span>;
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
