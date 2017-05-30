import React, { Component } from 'react';
// import $ from 'jquery'; // Import jQuery.

class TimerTaxonomyTerm extends Component {
  render() {
    const props = this.props;

    console.log(props.term);
    let totalHours = '';

    if (this.props.taxonomyName === 'project') {
      totalHours = <span className="total-hours">
        {props.term.pwptt_project_hours + ' hrs'}
      </span>;
    }

    return (
      <li>
        <a href="#" onClick={this._handleClick.bind(this)}>
          {props.term.name} {totalHours}
        </a>
      </li>
    );
  }

  _handleClick( event ) {
    event.preventDefault();

    const props = this.props;

    props.selectedTerm( props.term );
  }
}

export default TimerTaxonomyTerm;
