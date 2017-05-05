import { Component } from 'react';
import $ from 'jquery'; // Import jQuery.

class TimerTaxonomiesEdit extends Component {
  constructor() {
    super(); // super() must be called in our constructor.

    this.state = {
      taxonomies: [],
      hasTaxonomies: []
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

    // Should be :
    this.setState({ taxonomies: this.props.timer[ this.props.taxonomyName ] });

    $.ajax({
      method: 'GET',
      url: '/api/' + this.props.timerId + '/' + this.props.taxonomyName, // Makes call to the remote server.
      success: (hasTaxonomies) => { // Arrow function preserves the this binding to our class.
        // Get JSON.
        hasTaxonomies = JSON.parse(hasTaxonomies);
        console.log(hasTaxonomies);

        this.setState({ hasTaxonomies });
      }
    });
  }

  _addTaxonomy(event) {
    // Prevents page from reloading.
    event.preventDefault();

    const selectedValue = this._taxonomy.value;

    // Get ID back from options...
    const selectedId = $( '#' + this.props.taxonomyName )
      .find("[value='" + selectedValue + "']").data("id");

    const taxonomy = { id: selectedId, name: selectedValue };

    const hasTaxonomies = this.state.hasTaxonomies.concat([taxonomy]);

    // Add our new taxonomy to state.
    this.setState({hasTaxonomies});

    // console.log(taxonomy, hasTaxonomies);
  }

  _removeTaxonomy(event) {
    // Prevents page from reloading.
    event.preventDefault();

    const taxonomy = { id: this._taxonomy.id, value: this._taxonomy.value };

    // https://rainsoft.io/how-three-dots-changed-javascript/
    const hasTaxonomies = [...this.state.hasTaxonomies]; // use spread operator to clone existing array.
    const taxonomyIndex = hasTaxonomies.indexOf(taxonomy);

    hasTaxonomies.splice(taxonomyIndex, 1); // removes taxonomy from array.

    this.setState({ hasTaxonomies });
  }
}

export default TimerTaxonomiesEdit;