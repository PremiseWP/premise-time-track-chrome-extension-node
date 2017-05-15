import React, { Component } from 'react';

class TimerTaxonomyEdit extends Component {
  _timerHasTaxonomy() {
    if ( this.props.timer &&
      this.props.timer[ 'premise_time_tracker_' + this.props.taxonomyName ] &&
      this.props.timer[ 'premise_time_tracker_' + this.props.taxonomyName ].indexOf( this.props.taxonomy ) > -1 ) {
      return true;
    }

    return false;
  }
}

export default TimerTaxonomyEdit;
