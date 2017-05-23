import React, { Component } from 'react';
import TimerTaxonomyTerm from './TimerTaxonomyTerm';
import TimerTermTimersList from './TimerTermTimersList';
import TimerFetch from './TimerFetch';
// import $ from 'jquery'; // Import jQuery.

class TimerTaxonomyTerms extends Component {
  constructor() {
    super(); // super() must be called in our constructor.

    this.state = {
      terms: [],
      selectedTerm: null
    };
  }

  // called before the component is rendered to the page.
  componentWillMount() {
    // Fetch terms from server before component is rendered.
    this._fetchTerms();
  }

  _fetchTerms() {
    TimerFetch.getTaxonomy( this.props.taxonomyName ).then( function( terms ) {
      // console.log(terms);

      this.setState({ terms });
    }.bind(this),
    function ( error ) {
      console.log( 'TimerFetch.getTaxonomy error:' + error );
    });
  }

  render() {

    if ( this.state.selectedTerm ) {
      return this._termView();
    }

    return this._termsListView();
  }

  _termsListView() {

    // Get & store terms.
    const terms = this._getTerms() || [];

    const taxonomyNamePlural = this.props.taxonomyName + 's';

    let taxonomyNodes;

    if (terms.length) {
      const taxonomyClass = 'taxonomy-terms-list ' + taxonomyNamePlural;
      taxonomyNodes = <ul className={taxonomyClass}>{terms}</ul>;
    } else {
      taxonomyNodes = <p className="no-taxonomy-found">No {taxonomyNamePlural} found.</p>
    }

    return (
      <div className="timer-terms-wrapper">
        {taxonomyNodes /* Now being displayed based on component's state! */}
      </div>
    );
  }

  _termView() {
    const term = this.state.selectedTerm;
    return (
      <TimerTermTimersList
        term={term}
        taxonomyName={this.props.taxonomyName}
        onBack={this._backToTermsList.bind(this)} />
    );
  }

  // Underscore helps distinguish custom methods from React methods.
  _getTerms() {

    // Returns an array...
    return this.state.terms.map((term) => {
      return ( <TimerTaxonomyTerm
        term={term /* Pass the whole term */}
        taxonomyName={this.props.taxonomyName}
        selectedTerm={this._selectedTerm.bind(this)}
        key={this.props.taxonomyName + term.id} /> );
        // Unique key.
    });
  }

  _selectedTerm( term ) {

    this.setState({ selectedTerm: term });

    // Update Widget title.
    this.props.updateWidget( term );
  }

  _backToTermsList() {

    this.setState({ selectedTerm: null });

    // Update Widget title.
    this.props.updateWidget();
  }
}

export default TimerTaxonomyTerms;
