import React, { Component } from 'react';
import TimerTaxonomy from './TimerTaxonomy';
import TimerFetch from './TimerFetch';
// import $ from 'jquery'; // Import jQuery.

class TimerTaxonomyTerm extends Component {
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
    /* Disable test data:
    // Use fake data.
    let taxonomies = [];

    if ( this.props.taxonomyName === 'projects' ) {

      taxonomies = [{ id: 1, link: "http://tt.vallgroup.com/projects/1", name: "Project 1" },
        { id: 2, link: "http://tt.vallgroup.com/projects/2", name: "Project 2" }];

    } else if ( this.props.taxonomyName === 'clients' ) {

      taxonomies = [{ id: 1, link: "http://tt.vallgroup.com/clients/1", name: "Client 1" },
        { id: 2, link: "http://tt.vallgroup.com/clients/2", name: "Client 2" }];

    } else if ( this.props.taxonomyName === 'timesheets' ) {

      taxonomies = [{ id: 1, link: "http://tt.vallgroup.com/timesheets/1", name: "Timesheet 1" },
        { id: 2, link: "http://tt.vallgroup.com/timesheets/2", name: "Timesheet 2" }];
    }

    this.setState({ taxonomies });

    return;*/

    TimerFetch.getTaxonomy( this.props.taxonomyName ).then( function( taxonomies ) {
      // console.log(taxonomies);

      this.setState({ taxonomies });
    }.bind(this),
    function ( error ) {
      console.log( 'TimerFetch.getTaxonomy error:' + error );
    });
  }

  render() {
    // Get & store taxonomies.
    const taxonomies = this._getTaxonomies() || [];

    const taxonomyNamePlural = this.props.taxonomyName + 's';

    let taxonomyNodes;

    if (taxonomies.length) {
      const taxonomyClass = 'taxonomy-terms-list ' + taxonomyNamePlural;
      taxonomyNodes = <ul className={taxonomyClass}>{taxonomies}</ul>;
    } else {
      taxonomyNodes = <p className="no-taxonomy-found">No {taxonomyNamePlural} found.</p>
    }

    return (
      <div className="timer-taxonomies-wrapper">
        {taxonomyNodes /* Now being displayed based on component's state! */}
      </div>
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

export default TimerTaxonomyTerm;
