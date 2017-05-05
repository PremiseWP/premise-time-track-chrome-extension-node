import React, { Component } from 'react';
import TimerTaxonomiesEdit from './TimerTaxonomiesEdit';
import TimerTagEdit from './TimerTagEdit';
import $ from 'jquery'; // Import jQuery.

class TimerTagsEdit extends TimerTaxonomiesEdit {
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

    let taxonomies;

    if (use === 'options') {
      taxonomies = this.state.taxonomies;
    } else {
      taxonomies = this.state.hasTaxonomies;
    }

    // Returns an array...
    return taxonomies.map((taxonomy) => { // Each element from taxonomyList is passed as argument...
      // ...with a new component built for each element present in taxonomyList.
      return ( <TimerTagEdit
        taxonomy={taxonomy /* Pass the whole taxonomy */}
        taxonomyName={this.props.taxonomyName}
        timer={this.props.timer}
        use={use}
        key={this.props.taxonomyName + taxonomy.id} /> ); // ...which we can use to access properties and pass them as props.
        // Unique key.
    });
  }
}

export default TimerTagsEdit;
