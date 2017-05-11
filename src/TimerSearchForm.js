import React, { Component } from 'react';
import TimerSearchResult from './TimerSearchResult';
import $ from 'jquery'; // Import jQuery.
// import FontAwesome from 'react-fontawesome';

class TimerSearchForm extends Component {
  constructor() {
    super(); // super() must be called in our constructor.

    this.state = {
      results: [], // Initial state hides comments.
      searchTerm: '',
      showResults: false
    };

    this._typingTimer; // Timer identifier.
  }

  render() {
    // Get & store comments.
    const results = this._getResults() || [];
    let resultNodes;

    if ( ! this.state.showResults ) {

      // Nothing to display.
    } else if ( ! results.length ) {

      resultNodes = <p>No timers found.</p>;
    } else {
      resultNodes = <ul>{results}</ul>;
    }

    let resultsClass = 'ajax-results-timers';

    if ( this.state.showResults ) {
      resultsClass += ' show';
    }

    return (
      <div className="search-timers-wrapper">
        <input className="search-timers" placeholder="Search timers"
          onKeyUp={this._searchTimers.bind(this)}
          ref={(input) => this._searchTerm = input} />
        <div className={resultsClass}>
          {resultNodes}
        </div>
      </div>
    );
  }

  _hideResults() {
    this.setState({ showResults: false });
  }

  _showResults() {
    this.setState({ showResults: true });
  }


  _searchTimers() {
    // Setup before functions.
    const doneTypingInterval = 750; // Time in ms (0.75 seconds).

    clearTimeout( this._typingTimer );

    if ( ! this._searchTerm.value ) {
      this._hideResults();

      return;
    }

    this._typingTimer = setTimeout(
      this._searchTimersAjax.bind(this),
      doneTypingInterval
    );
  }


  _searchTimersAjax() {
    const searchTerm = this._searchTerm.value.trim();

    if ( this.state.searchTerm === searchTerm ) {

      this.setState({ searchTerm });

      return;
    }

    const results = [
      { id: 1, title: {raw: "Timer 1"}, content: "Timer description", hours: 1 },
      { id: 2, title: {raw: "Timer 2"}, content: "Timer description 2", hours: 2 }
    ]

    this.setState({ results, searchTerm });

    this._showResults();

    return;

    // Should be...

    $.ajax({
      method: 'GET',
      url: '/api/timer/search/' + searchTerm, // Makes call to the remote server.
      success: (results) => { // Arrow function preserves the this binding to our class.
        // Get JSON.
        results = JSON.parse(results);
        console.log(results);

        this.setState({ results, searchTerm });

        this._showResults();
      }
    });
  }


  // Underscore helps distinguish custom methods from React methods.
  _getResults() {
    // Returns an array...
    return this.state.results.map((result) => { // Each element from results is passed as argument...
      // ...with a new component built for each element present in results.
      return ( <TimerSearchResult
        result={result /* Pass the whole result */}
        onClick={this._onResultClick.bind(this) /* Will later be called in the context of the TimerSearchForm. */}
        key={result.id} /> ); // ...which we can use to access properties and pass them as props.
        // Unique key.
    });
  }


  _onResultClick( result ) {
    // Close results, empty input & open Edit Form modal.
    console.log(result);

    this._hideResults();

    // Empty search input.
    this._searchTerm.value = '';

    this.props.onResultClick( result );
  }
}

export default TimerSearchForm;
