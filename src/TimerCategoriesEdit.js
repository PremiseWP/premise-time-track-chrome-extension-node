import React, { Component } from 'react';
import TimerCategoryEdit from './TimerCategoryEdit';
import $ from 'jquery'; // Import jQuery.

class TimerCategoriesEdit extends Component {
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
    // Use fake data.
    let taxonomies = [];

    if ( ! this.props.timer ) {
      return;
    }

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

    return;

    $.ajax({
      method: 'GET',
      url: '/api/' + this.props.timerId + '/' + this.props.taxonomyName, // Makes call to the remote server.
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

    // Capitalize.
    const taxonomyTitle = this.props.taxonomyName.charAt(0).toUpperCase() +
      this.props.taxonomyName.slice(1);

    let taxonomyNodes,
      taxonomyNewField;

    const taxonomyNewName = "ptt[" + this.props.taxonomyName + "][new]";

    if (taxonomies) {
      const taxonomyClass = 'taxonomy-terms-list ' + this.props.taxonomyName;
      taxonomyNodes = <ul className={taxonomyClass}>{taxonomies}</ul>;

      taxonomyNewField = <div className="ptt-client-field-wrapper">
        <a href="#" className="add-new-client-link unfold">Add a new client</a>
        <input type="text" name={taxonomyNewName} value="" />
      </div>;

    } else {
      taxonomyNodes = <span></span>;

      taxonomyNewField = <input type="text" name={taxonomyNewName} value="" />;
    }

    return (
      <div className="timer-taxonomies-wrapper">
        <label>{taxonomyTitle}:</label>

        {taxonomyNodes /* Now being displayed based on component's state! */}

        {taxonomyNewField}
      </div>
    );
  }

  // Underscore helps distinguish custom methods from React methods.
  _getTaxonomies() {

    // Returns an array...
    return this.state.taxonomies.map((taxonomy) => { // Each element from commentList is passed as argument...
      // ...with a new component built for each element present in commentList.
      return ( <TimerCategoryEdit
        taxonomy={taxonomy /* Pass the whole taxonomy */}
        taxonomyName={this.props.taxonomyName}
        timer={this.props.timer}
        key={taxonomy.id} /> ); // ...which we can use to access properties and pass them as props.
        // Unique key.
    });
  }
}

export default TimerCategoriesEdit;
