import React, { Component } from 'react';
import TimerTaxonomiesEdit from './TimerTaxonomiesEdit';
import TimerTagEdit from './TimerTagEdit';
import $ from 'jquery'; // Import jQuery.

class TimerTagsEdit extends TimerTaxonomiesEdit {
  constructor() {
    super(); // super() must be called in our constructor.

    // New temp IDs counter, see _addTag.
    this.newTmpId = -1;
  }

  render() {
    // Get & store taxonomies.
    const taxonomies = this._getTaxonomies() || [];
    const taxonomyOptions = this._getTaxonomies('options') || [];

    const taxonomyNamePlural = this.props.taxonomyName + 's';

    // Capitalize.
    const taxonomyTitle = taxonomyNamePlural.charAt(0).toUpperCase() +
      taxonomyNamePlural.slice(1);

    let taxonomyOptionsNodes;

    const taxonomyNewName = "new-" + this.props.taxonomyName;

    const taxonomyClass = 'tags-list ' + taxonomyNamePlural;

    if (taxonomyOptions.length) {
      taxonomyOptionsNodes = <datalist id={this.props.taxonomyName}>{taxonomyOptions}</datalist>;
    } else {
      taxonomyOptionsNodes = <span></span>;
    }

    return (
      <label>{taxonomyTitle}:
        <div className="new-tag-wrapper">
          <input type="text" name={taxonomyNewName}
            list={this.props.taxonomyName} className="new-tag-input"
            ref={(input) => this._tag = input} />
          <button onClick={this._addTag.bind(this)} className="new-tag-add-button">Add</button>
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
        removeTag={this._removeTag.bind(this)}
        key={this.props.taxonomyName + taxonomy.id} /> ); // ...which we can use to access properties and pass them as props.
        // Unique key.
    });
  }

  _addTag(event) {
    // Prevents page from reloading.
    event.preventDefault();

    const selectedValue = this._tag.value;

    if ( ! selectedValue ) {
      return;
    }

    // Get ID back from options...
    let selectedId = $( '#' + this.props.taxonomyName )
      .find("[value='" + selectedValue + "']");

    if (selectedId.length) {

      selectedId = selectedId.data("id");
    } else {
      // New temp ID, < 0!
      selectedId = this.newTmpId--;
    }

    const taxonomy = { id: selectedId, name: selectedValue };

    // Call super method.
    this._addTaxonomy(taxonomy);

    // Empty tag input.
    this._tag.value = '';
  }

   _removeTag(taxonomy) {
      // Call super method.
      this._removeTaxonomy(taxonomy);
  }

  _saveNewTerms(callback) {
    // New terms have negative IDs.
    const hasTaxonomies = this.state.hasTaxonomies.map((taxonomy) => {
      if ( taxonomy.id > 0 ) {
        return taxonomy;
      }

      // Call super method.
      const newTerm = this._saveNewTerm(taxonomy.name);

      console.log(newTerm);

      return newTerm;
    });

    this.setState({hasTaxonomies}); // Problem: setState is async!!
    // http://stackoverflow.com/questions/30782948/why-calling-react-setstate-method-doesnt-mutate-the-state-immediately
    console.log(hasTaxonomies, this.state.hasTaxonomies);

    // Call super method.
    return this._getTaxonomyIds(hasTaxonomies);
 }
}

export default TimerTagsEdit;
