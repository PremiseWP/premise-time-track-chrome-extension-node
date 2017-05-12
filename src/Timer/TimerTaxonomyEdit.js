import React, { Component } from 'react';

class TimerTaxonomyEdit extends Component {
  _timerHasTaxonomy() {
    if ( this.props.timer &&
      this.props.timer[ this.props.taxonomyName ] &&
      this.props.timer[ this.props.taxonomyName ].indexOf( this.props.taxonomy.id ) > -1 ) {
      return true;
    }

    return false;
  }
}

export default TimerTaxonomyEdit;
