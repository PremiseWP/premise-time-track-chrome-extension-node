import React, { Component } from 'react';

class TimerCategoryEdit extends Component {
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

  _timerHasTaxonomy() {
    if ( this.props.timer &&
      this.props.timer[ this.props.taxonomyName ] &&
      this.props.timer[ this.props.taxonomyName ].indexOf( this.props.taxonomy.id ) > -1 ) {
      return true;
    }

    return false;
  }
}

export default TimerCategoryEdit;
