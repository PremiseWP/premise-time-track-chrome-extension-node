import React, { Component } from 'react';
import TimerTaxonomiesEdit from './TimerTaxonomiesEdit';
import TimerCategoryEdit from './TimerCategoryEdit';
import $ from 'jquery'; // Import jQuery.

class TimerCategoriesEdit extends TimerTaxonomiesEdit {
  render() {
    // Get & store taxonomies.
    const taxonomies = this._getTaxonomies() || [];

    const taxonomyNamePlural = this.props.taxonomyName + 's';

    // Capitalize.
    const taxonomyTitle = taxonomyNamePlural.charAt(0).toUpperCase() +
      taxonomyNamePlural.slice(1);

    let taxonomyNodes,
      taxonomyNewField;

    const taxonomyNewName = "ptt[" + this.props.taxonomyName + "][new]";

    const taxonomyNewWrapperClass = 'ptt-' + this.props.taxonomyName + '-field-wrapper ' +
      (this.state.unfolded ? 'unfolded' : '');

    if (taxonomies.length) {
      const taxonomyClass = 'taxonomy-terms-list ' + this.props.taxonomyName;
      taxonomyNodes = <ul className={taxonomyClass}>{taxonomies}</ul>;

      taxonomyNewField = <div className={taxonomyNewWrapperClass}>
        <a href="#"
          className={'add-new-' + this.props.taxonomyName + '-link unfold'}
          onClick={this._unfoldNewField.bind(this)}>
          Add a new {this.props.taxonomyName}
        </a>
        <input type="text" name={taxonomyNewName}
          ref={(input) => this._newTerm = input} />
      </div>;

    } else {
      taxonomyNodes = <span></span>;

      taxonomyNewField = <input type="text" name={taxonomyNewName}
        ref={(input) => this._newTerm = input} />;
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
        removeCategory={this._removeCategory.bind(this)}
        addCategory={this._addCategory.bind(this)}
        key={this.props.taxonomyName + taxonomy.id} /> ); // ...which we can use to access properties and pass them as props.
        // Unique key.
    });
  }

  _unfoldNewField(event) {
    event.preventDefault();

    // Show new field.
    this.setState({unfolded: true});
  }

  _addCategory(taxonomy) {
    // Call super method.
    this._addTaxonomy(taxonomy);
  }

   _removeCategory(taxonomy) {
      // Call super method.
      this._removeTaxonomy(taxonomy);
  }

  _saveNewTerms(callback) {
    let hasTaxonomies = this.state.hasTaxonomies;

    if ( this._newTerm.value !== '' ) {
      // New term.
      // Call super method.
      const newTerm = this._saveNewTerm(this._newTerm.value);

      hasTaxonomies.push(newTerm);
    }

    this.setState({ hasTaxonomies });

    // console.log(hasTaxonomies, this.state.hasTaxonomies);

    // Call super method.
    return this._getTaxonomyIds(hasTaxonomies);
  }
}

export default TimerCategoriesEdit;
