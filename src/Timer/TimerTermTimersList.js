import React, { Component } from 'react';
import LoadingIcon from '../LoadingIcon';
import TimerTermTimer from './TimerTermTimer';
import TimerFetch from './TimerFetch';

class TimerTermTimersList extends Component {
  constructor() {
    super(); // super() must be called in our constructor.

    this.state = {
      timers: [],
      loadingTimers: false
    };
  }

  // Called before the component is rendered to the page.
  componentWillMount() {
    // Fetch terms from server before component is rendered.
    this._fetchTimers();
  }

  _fetchTimers() {

    this.setState({loadingTimers: true});

    const props = this.props;

    TimerFetch.getTimersByTerm( props.term.id, props.taxonomyName ).then( function( timers ) {
      console.log(timers);

      this.setState({ timers });

      this.setState({loadingTimers: false});
    }.bind(this),
    function ( error ) {
      console.log( 'TimerFetch.getTimersByTerm error:' + error );
    });
  }

  render() {
    // Get & store timers.
    const timers = this._getTimers() || [];

    const props = this.props;

    let timerNodes;

    if ( this.state.loadingTimers ) {
      timerNodes = <LoadingIcon />;
    }
    else if (timers.length) {
      const taxonomyClass = 'term-timers-list ' + props.taxonomyName + ' ' + props.term.name;
      timerNodes = <ul className={taxonomyClass}>{timers}</ul>;
    } else {
      timerNodes = <p className="no-timers-found">No timers found.</p>
    }

    return (
      <div className="timer-term-timers-wrapper">
        {timerNodes /* Now being displayed based on component's state! */}
      </div>
    );
  }

  // Underscore helps distinguish custom methods from React methods.
  _getTimers() {

    // Returns an array...
    return this.state.timers.map((timer) => {
      return ( <TimerTermTimer
        timer={timer /* Pass the whole timer */}
        taxonomyName={this.props.taxonomyName}
        key={this.props.taxonomyName + timer.id} /> );
        // Unique key.
    });
  }
}

export default TimerTermTimersList;
