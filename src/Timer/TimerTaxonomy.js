import React, { Component } from 'react';
import WordpressModal from '../WordpressModal';

class TimerTaxonomy extends Component {
  constructor() {
    super(); // super() must be called in our constructor.

    this.state = {
      showWordpressTaxonomy: false
    };
  }

  render() {
    const url = this.props.taxonomy.link;

    let showWordpress;

    if ( this.state.showWordpressTaxonomy ) {

      showWordpress = <WordpressModal url={url} onClose={this._showWordpressTaxonomy.bind(this)} />;
    }

    return (
      <li>
        <a href="#" onClick={this._showWordpressTaxonomy.bind(this)}>{this.props.taxonomy.name}</a>
        {showWordpress}
      </li>
    );
  }

  _showWordpressTaxonomy() {

    this.setState({ showWordpressTaxonomy: ! this.state.showWordpressTaxonomy });
  }
}

export default TimerTaxonomy;
