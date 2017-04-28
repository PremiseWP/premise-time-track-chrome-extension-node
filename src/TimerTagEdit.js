import React, { Component } from 'react';

class TimerTagEdit extends Component {
  render() {
    const taxonomyInputName = "ptt[" + this.props.taxonomyName + "][]";

    if ( this.props.use === 'options' ) {

      return (
        <option value={this.props.taxonomy.name} id={this.props.taxonomy.id} />
      );
    }

    if ( ! this._timerHasTaxonomy() ) {
      return null;
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

  _timerHasTaxonomy() {
    if ( this.props.timer &&
      this.props.timer[ this.props.taxonomyName ] &&
      this.props.timer[ this.props.taxonomyName ].indexOf( this.props.taxonomy.id ) > -1 ) {
      return true;
    }

    return false;
  }
}

export default TimerTagEdit;
