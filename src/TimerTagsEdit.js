import React, { Component } from 'react';
import TimerTagEdit from './TimerTagEdit';
import $ from 'jquery'; // Import jQuery.

class TimerTagsEdit extends Component {
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
    const taxonomyOptions = this._getTaxonomies('options') || [];

    // Capitalize.
    const taxonomyTitle = this.props.taxonomyName.charAt(0).toUpperCase() +
      this.props.taxonomyName.slice(1);

    let taxonomyOptionsNodes;

    const taxonomyNewName = "new-" + this.props.taxonomyName.substring( -1 );

    const taxonomyClass = 'tags-list ' + this.props.taxonomyName;

    if (taxonomies) {
      taxonomyOptionsNodes = <datalist id={this.props.taxonomyName}>{taxonomyOptions}</datalist>;
    } else {
      taxonomyOptionsNodes = <span></span>;
    }

    return (
      <label>{taxonomyTitle}:
        <div className="new-tag-wrapper">
          <input type="text" name={taxonomyNewName}
            list={this.props.taxonomyName} className="new-tag-input"
            ref={(input) => this._taxonomy = input} />
          <button onClick={this._addTaxonomy.bind(this)}>Add</button>
        </div>

        {taxonomyOptionsNodes /* Now being displayed based on component's state! */}

        <div className={taxonomyClass}>
          {taxonomies}
        </div>
      </label>
    );
  }

  // Underscore helps distinguish custom methods from React methods.
  _getTaxonomies(use) {

    // Returns an array...
    return this.state.taxonomies.map((taxonomy) => { // Each element from commentList is passed as argument...
      // ...with a new component built for each element present in commentList.
      return ( <TimerTagEdit
        taxonomy={taxonomy /* Pass the whole taxonomy */}
        taxonomyName={this.props.taxonomyName}
        timer={this.props.timer}
        use={use}
        key={taxonomy.id} /> ); // ...which we can use to access properties and pass them as props.
        // Unique key.
    });
  }

  _addTaxonomy(event) {
    // Prevents page from reloading.
    event.preventDefault();

    const taxonomy = { id: this._taxonomy.id, value: this._taxonomy.value };

    // Add our new taxonomy to state.
    let taxonomies = this.state.taxonomies;

    taxonomies.push( taxonomy );

    this.setState({taxonomies});
  }
}

export default TimerTagsEdit;
