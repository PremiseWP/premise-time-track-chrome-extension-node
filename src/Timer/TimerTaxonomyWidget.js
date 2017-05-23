import React, { Component } from 'react';
import TimerDashboardWidget from './TimerDashboardWidget';
import TimerTaxonomyTerms from './TimerTaxonomyTerms';

class TimerTaxonomyWidget extends Component {
  constructor(props) {
    super(props); // super() must be called in our constructor.

    // Initial state.
    this.state = {
      widgetIsOpen: false,
      widgetTitle: ''
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
    return (
      <TimerDashboardWidget
        isOpen={this.state.widgetIsOpen}
        onAfterOpen={this._afterOpenWidget.bind(this)}
        onRequestOpen={this._openWidget.bind(this)}
        onRequestClose={this._closeWidget.bind(this)}
        title={this.state.widgetTitle}
      >
        <TimerTaxonomyTerms
          taxonomyName={this.props.taxonomyName}
          term={this.state.term}
          updateWidget={this._updateWidget.bind(this)} />
      </TimerDashboardWidget>
    );
  }

  _updateWidget( term ) {

    let title;

    if ( term ) {
      title = term.name;
    }

    this._setTitle( title );
  }

  _setTitle( title ) {

    if ( title ) {
      this.setState({widgetTitle: title});
    } else {

      const taxonomyNamePlural = this.props.taxonomyName + 's';

      // Capitalize.
      const taxonomyTitle = taxonomyNamePlural.charAt(0).toUpperCase() +
        taxonomyNamePlural.slice(1);

      this.setState({widgetTitle: taxonomyTitle});
    }
  }
}

export default TimerTaxonomyWidget;
