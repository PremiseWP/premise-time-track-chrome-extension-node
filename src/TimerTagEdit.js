import React, { Component } from 'react';
import TimerTaxonomyEdit from './TimerTaxonomyEdit';

class TimerTagEdit extends TimerTaxonomyEdit {
  render() {
    const taxonomyInputName = "ptt[" + this.props.taxonomyName + "][]";

    if ( this.props.use === 'options' ) {

      return (
        <option value={this.props.taxonomy.name} data-id={this.props.taxonomy.id} />
      );
    }

    return (
      <span>
        <button type="button" className="tag-delete-button">
          <span className="remove-tag-icon" aria-hidden="true"></span>
          <span className="screen-reader-text">Remove term</span>
        </button>
        <input type="hidden" name={taxonomyInputName} value={this.props.taxonomy.id} />
        {this.props.taxonomy.name}
      </span>
    );
  }
}

export default TimerTagEdit;
