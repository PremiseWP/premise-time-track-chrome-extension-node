import React, { Component } from 'react';

class TimerTaxonomy extends Component {
  render() {
    const taxonomyUrl = "?step=show-wordpress&url=" +
      encodeURIComponent( this.props.taxonomy.link );
    return (
      <li>
        <a href={taxonomyUrl}>{this.props.taxonomy.name}</a>
      </li>
    );
  }
}

export default TimerTaxonomy;
