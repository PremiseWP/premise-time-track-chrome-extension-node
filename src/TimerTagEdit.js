import React, { Component } from 'react';
import TimerTaxonomyEdit from './TimerTaxonomyEdit';

class TimerTagEdit extends TimerTaxonomyEdit {
  render() {
    if ( this.props.use === 'options' ) {

      return (
        <option value={this.props.taxonomy.name} data-id={this.props.taxonomy.id} />
      );
    }

    return (
      <span>
        <button className="tag-delete-button" onClick={this._removeTag.bind(this)}>
          <span className="remove-tag-icon" aria-hidden="true"></span>
          <span className="screen-reader-text">Remove term</span>
        </button>
        {this.props.taxonomy.name}
      </span>
    );
  }

  _removeTag(event){
    // Prevents page from reloading.
    event.preventDefault();

    // The removeTag method has been passed as an argument from TimerTagsEdit (see later!).
    this.props.removeTag(this.props.taxonomy);
  }
}

export default TimerTagEdit;
