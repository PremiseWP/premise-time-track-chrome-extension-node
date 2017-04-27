import React, { Component } from 'react';

class TimerTaxonomyEdit extends Component {
  render() {
    const taxonomyInputName = "ptt[" + this.props.taxonomyName + "][]";
    const checked = ;
    return (
      <li>
        <label>
          <input type="checkbox" name={taxonomyInputName}
            value={this.props.taxonomy.id} className="checkbox" />
            {/* if ( $ptt && in_array( $client['id'], $ptt['premise_time_tracker_client'] ) ) echo 'checked'; */}
          {this.props.taxonomy.name}
        </label>
      </li>
      <li>
        <a href={taxonomyUrl}>{this.props.taxonomy.name}</a>
      </li>
    );
  }
}

export default TimerTaxonomyEdit;
