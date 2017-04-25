import React, { Component } from 'react';
import $ from 'jquery'; // Import jQuery.

class TimerTaxonomies extends Component {
  constructor() {
    super(); // super() must be called in our constructor.

    this.state = {
      taxonomies: { projects: [], clients: [], timesheets: [] }
    };
  }

  // called before the component is rendered to the page.
  componentWillMount() {
    // Fetch taxonomies from server before component is rendered.
    this._fetchTaxonomies( 'projects' );
    this._fetchTaxonomies( 'clients' );
    this._fetchTaxonomies( 'timesheets' );
  }

  _fetchTaxonomies( taxonomyName ) {
    $.ajax({
      method: 'GET',
      url: '/api/' + taxonomyName, // Makes call to the remote server.
      success: (taxonomies) => { // Arrow function preserves the this binding to our class.
        // Get JSON.
        taxonomies = JSON.parse(taxonomies);
        console.log(taxonomies);

        let taxonomiesState = this.state.taxonomies;
        taxonomiesState[taxonomyName] = taxonomies;
        this.setState({ taxonomies: taxonomiesState });
      }
    });
  }

  render() {
    // Get & store taxonomies.
    const projects = this._getTaxonomies('projects') || [];

    let projectNodes;

    if (projects) {
      projectNodes = <ul class="taxonomy-terms-list projects">{projects}</ul>;
    } else {
      projectNodes = <p class="no-taxonomy-found">No projects found.</p>
    }
    return (
      {projectNodes /* Now being displayed based on component's state! */}
    );
  }

  // Underscore helps distinguish custom methods from React methods.
  _getTaxonomies( taxonomyName ) {

    // Returns an array...
    return this.state.taxonomies[taxonomyName].map((taxonomy) => { // Each element from commentList is passed as argument...
      // ...with a new component built for each element present in commentList.
      return ( <Taxonomy
        taxonomy={taxonomy /* Pass the whole taxonomy */}
        key={taxonomy.id} /> ); // ...which we can use to access properties and pass them as props.
        // Unique key.
    });
  }
}

export default TimerTaxonomies;
