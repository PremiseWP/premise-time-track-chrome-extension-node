import React, { Component } from 'react';
import TimerTaxonomiesEdit from './TimerTaxonomiesEdit';
import TimerCategoryEdit from './TimerCategoryEdit';
import $ from 'jquery'; // Import jQuery.

class TimerCategoriesEdit extends TimerTaxonomiesEdit {
  render() {
    // Get & store taxonomies.
    const taxonomies = this._getTaxonomies() || [];

    // Capitalize.
    const taxonomyTitle = this.props.taxonomyName.charAt(0).toUpperCase() +
      this.props.taxonomyName.slice(1);

    // Singular.
    const taxonomyNameSingular = this.props.taxonomyName.substring(0, this.props.taxonomyName.length - 1);

    let taxonomyNodes,
      taxonomyNewField;

    const taxonomyNewName = "ptt[" + this.props.taxonomyName + "][new]";

    const taxonomyNewWrapperClass = 'ptt-' + taxonomyNameSingular + '-field-wrapper ' +
      (this.state.unfolded ? 'unfolded' : '');

    if (taxonomies.length) {
      const taxonomyClass = 'taxonomy-terms-list ' + this.props.taxonomyName;
      taxonomyNodes = <ul className={taxonomyClass}>{taxonomies}</ul>;

      taxonomyNewField = <div className={taxonomyNewWrapperClass}>
        <a href="#"
          className={'add-new-' + taxonomyNameSingular + '-link unfold'}
          onClick={this._unfoldNewField.bind(this)}>
          Add a new {taxonomyNameSingular}
        </a>
        <input type="text" name={taxonomyNewName} />
      </div>;

    } else {
      taxonomyNodes = <span></span>;

      taxonomyNewField = <input type="text" name={taxonomyNewName} />;
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
}

export default TimerCategoriesEdit;
