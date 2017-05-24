import React, { Component } from 'react';
import LoadingIcon from '../LoadingIcon';
import TimerTermTimer from './TimerTermTimer';
import TimerFetch from './TimerFetch';
import TimerDB from './TimerDB';
import FontAwesome from 'react-fontawesome';

class TimerTermTimersList extends Component {
  constructor() {
    super(); // super() must be called in our constructor.

    this.state = {
      timers: [],
      loadingTimers: false
    };

    this._totalHours;
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
      <div className="term-timers-wrapper">
        <div className="term-controls-bar">
          <a className="back-arrow" href="#" onClick={this._backToTermsList.bind(this)}>
            <FontAwesome
              name="long-arrow-left" />
          </a>
          <a className="term-filters" href="#" onClick={this._openTermFilters.bind(this)}>
            <FontAwesome
              name="list-ul" />
          </a>
          <div className="term-total-hours-wrapper">
            {this._totalHours} hrs
          </div>
        </div>
        <div className="timer-term-timers-list-wrapper">
          {timerNodes /* Now being displayed based on component's state! */}
        </div>
      </div>
    );
  }

  _backToTermsList( event ) {

    event.preventDefault();

    this.props.onBack();
  }

  _openTermFilters( event ) {

    event.preventDefault();
  }

  // Underscore helps distinguish custom methods from React methods.
  _getTimers() {

    this._totalHours = 0;

    const taxonomyName = this.props.taxonomyName;

    let otherTaxonomyName = 'client';

    const projectsOrClients = TimerDB.get( otherTaxonomyName );

    if ( taxonomyName === 'client' ) {
      otherTaxonomyName = 'project';
    }

    let projectOrClient,
      projectOrClientName;

    // Returns an array...
    return this.state.timers.map((timer) => {

      this._totalHours += parseFloat(timer.pwptt_hours);

      projectOrClient = projectsOrClients.find(function( projectOrClient ) {

        return projectOrClient.id === timer['premise_time_tracker_' + otherTaxonomyName][0];
      });

      if ( projectOrClient ) {
        projectOrClientName = projectOrClient.name;
      } else {
        projectOrClientName = '\u00A0'; // &nbsp;.
      }

      return ( <TimerTermTimer
        timer={timer /* Pass the whole timer */}
        projectOrClientName={projectOrClientName}
        taxonomyName={taxonomyName}
        key={taxonomyName + timer.id} /> );
        // Unique key.
    });
  }
}

export default TimerTermTimersList;
