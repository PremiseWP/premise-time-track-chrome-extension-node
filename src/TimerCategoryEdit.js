import React, { Component } from 'react';
import TimerTaxonomyEdit from './TimerTaxonomyEdit';

class TimerCategoryEdit extends TimerTaxonomyEdit {
  render() {
    const taxonomyInputName = "ptt[" + this.props.taxonomyName + "][]";

    let checked = {};

    if ( this._timerHasTaxonomy() ) {
      checked = {checked: 'checked'};
    }

    return (
      <li>
        <label>
          <input type="checkbox"  className="checkbox"
            name={taxonomyInputName}
            defaultValue={this.props.taxonomy.id}
            {...checked} />
          {this.props.taxonomy.name}
        </label>
      </li>
    );
  }
}

export default TimerCategoryEdit;
