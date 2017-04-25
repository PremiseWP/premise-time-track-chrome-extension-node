import React, { Component } from 'react';
import TimerTaxonomy from './TimerTaxonomy';
import $ from 'jquery'; // Import jQuery.

class TimerTaxonomies extends Component {
  constructor() {
    super(); // super() must be called in our constructor.

    this.state = {
      taxonomies: []
    };
  }

  // called before the component is rendered to the page.
  componentWillMount() {
    // Fetch taxonomies from server before component is rendered.
    this._fetchTaxonomies();
  }

  _fetchTaxonomies() {
    $.ajax({
      method: 'GET',
      url: '/api/' + this.props.taxonomyName, // Makes call to the remote server.
      success: (taxonomies) => { // Arrow function preserves the this binding to our class.
        // Get JSON.
        taxonomies = JSON.parse(taxonomies);
        console.log(taxonomies);

        this.setState({ taxonomies });
      }
    });
  }

  render() {
    // Get & store taxonomies.
    const taxonomies = this._getTaxonomies() || [];

    let taxonomyNodes = <h2>{this.props.taxonomyName}:</h2>;

    if (taxonomies) {
      const taxonomyClass = 'taxonomy-terms-list ' + this.props.taxonomyName;
      taxonomyNodes += <ul className={taxonomyClass}>{taxonomies}</ul>;
    } else {
      taxonomyNodes += <p className="no-taxonomy-found">No {this.props.taxonomyName} found.</p>
    }
    return (
      {taxonomyNodes /* Now being displayed based on component's state! */}
    );
  }

  // Underscore helps distinguish custom methods from React methods.
  _getTaxonomies() {

    // Returns an array...
    return this.state.taxonomies.map((taxonomy) => { // Each element from commentList is passed as argument...
      // ...with a new component built for each element present in commentList.
      return ( <TimerTaxonomy
        taxonomy={taxonomy /* Pass the whole taxonomy */}
        taxonomyName={this.props.taxonomyName}
        key={taxonomy.id} /> ); // ...which we can use to access properties and pass them as props.
        // Unique key.
    });
  }
}

export default TimerTaxonomies;
