import React, { Component } from 'react';
import LoadingIcon from '../LoadingIcon';
import TimerTermTimer from './TimerTermTimer';
import TimerFetch from './TimerFetch';
import TimerDB from './TimerDB';

class TimerTermTimersList extends Component {
  constructor() {
    super(); // super() must be called in our constructor.

    this.state = {
      timers: [],
      loadingTimers: false
    };

    this._totalHours = 0;
  }

  // Called before the component is rendered to the page.
  componentWillMount() {
    // Fetch terms from server before component is rendered.
    this._fetchTimers();
  }

  _fetchTimers( before, after ) {

    this.setState({loadingTimers: true});

    const props = this.props;

    if ( before && after ) {
      // Filter timers by date.
      TimerFetch.getTimersByTermFilterByDate( props.term.id, props.taxonomyName, before, after )
      .then( function( timers ) {
        console.log(timers);

        this.setState({ timers });

        this.setState({loadingTimers: false});
      }.bind(this),
      function ( error ) {
        console.log( 'TimerFetch.getTimersByTermFilterByDate error:' + error );
      });
    } else {
      TimerFetch.getTimersByTerm( props.term.id, props.taxonomyName ).then( function( timers ) {
        // console.log(timers);

        this.setState({ timers });

        this.setState({loadingTimers: false});
      }.bind(this),
      function ( error ) {
        console.log( 'TimerFetch.getTimersByTerm error:' + error );
      });
    }
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
      const taxonomyClass = 'term-timers-list '
      + props.taxonomyName
      + ' '
      + props.term.name;

      timerNodes = <ul
      className={taxonomyClass}>
        {timers}
      </ul>;
    }
    else {
      timerNodes = <p
      className="no-timers-found">
        You do not find any timers under this {this.props.taxonomyName}.
      </p>
    }

    const jumpToSelect = this._jumpToSelect();

    let termFiltersClass = 'term-filters';

    if ( this.state.isTermFiltersOpen ) {
      termFiltersClass += ' open';
    }

    return (
      <div className="term-timers-wrapper">
        <div className="term-controls-bar">
          <a className="back-arrow" href="#" onClick={this._backToTermsList.bind(this)}>
            <img
              alt="controls - back arrow"
              src="/img/back_arrow.png"
              className="back_arrow_svg" />
          </a>
          <a className="term-filters-wrapper" href="#" onClick={this._openTermFilters.bind(this)}>
            <img
              alt="controls - filter icon"
              src="/img/filter_icon.png"
              className="filter_icon_svg" />
          </a>
          <div className={termFiltersClass}>
            <div className="arrow-up"></div>
            <p>Filter Timers</p>
            <div className="jump-to-select-wrapper">
              {jumpToSelect}
            </div>
            <div className="date-range-input-wrapper">
              <input className="date-range-input"
                placeholder="Enter a date range"
                onKeyPress={this._dateRangeFilter.bind(this)}
                ref={(input) => this._rangeFilterInput = input} />
            </div>
          </div>
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

  // go bakc ti the list
  _backToTermsList( event ) {
    event.preventDefault();
    this.props.onBack();
  }

  // open the filters
  _openTermFilters( event ) {
    event.preventDefault();
    this.setState({ isTermFiltersOpen: ( !this.state.isTermFiltersOpen ) });
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

      this._totalHours += ( timer.pwptt_hours ) ? parseFloat(timer.pwptt_hours) : 0.00;

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

  _jumpToSelect() {
    return (
      <select className="jump-to-select"
        onChange={this._jumpToFilter.bind(this)}
        ref={(select) => this._jumpToSelectInput = select}>
        <option value="">
          Jump to...
        </option>
        <option value={this._getMonth()}>
          This month
        </option>
        <option value={this._getMonth(true)}>
          Last month
        </option>
        <option value={this._getWeek()}>
          This week
        </option>
        <option value={this._getWeek(true)}>
          Last week
        </option>
      </select>
    );
  }

  _getMonth( last ) {
    const date = new Date();

    let now,
      firstDayMonth;

    if ( ! last ) {

      now = new Date( date.setHours( 23, 59, 59 ) );
      firstDayMonth = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0 );

    } else {
      // Last month.
      now = new Date(date.getFullYear(), date.getMonth(), -1, 23, 59, 59 );
      firstDayMonth = new Date(date.getFullYear(), (date.getMonth() - 1), 1, 0, 0, 0 );
    }

    return firstDayMonth.toISOString() + '~' + now.toISOString();
  }

  _getWeek( last ) {
    const date = new Date();

    let firstDayWeek;

    if ( ! last ) {
      firstDayWeek = date.getDate() - date.getDay();
    } else {
      // Last week.
      firstDayWeek = date.getDate() - date.getDay() - 7;
    }

    const firstDayWeekDate = new Date( new Date( date.setDate( firstDayWeek ) ).setHours(0,0,0) );

    const lastDayWeekDate = new Date( new Date( date.setDate( firstDayWeek + 6 ) ).setHours(23,59,59) );

    return firstDayWeekDate.toISOString() + '~' + lastDayWeekDate.toISOString();
  }

  _jumpToFilter() {
    const jumpToFilter = this._jumpToSelectInput.value;

    this.setState({ isTermFiltersOpen: ( !this.state.isTermFiltersOpen ) });

    if ( ! jumpToFilter ) {
      this._fetchTimers();

      return;
    }

    // Get before & after date filters.
    const dates = jumpToFilter.split("~");

    const before = dates[1];
    const after = dates[0];

    this._fetchTimers( before, after );
  }

  _dateRangeFilter( event ) {
    if ( event.key !== 'Enter') {
      return;
    }

    this.setState({ isTermFiltersOpen: ( !this.state.isTermFiltersOpen ) });

    // Validate range.
    const rangeFilter = this._rangeFilterInput.value;

    if ( ! rangeFilter ) {
      this._fetchTimers();

      return;
    }

    // Get before & after date filters.
    const dates = rangeFilter.split("-");

    const before = dates[1].trim();
    const after = dates[0].trim();

    const beforeDate = new Date( before ).toISOString();
    const afterDate = new Date( after ).toISOString();

    // console.log(beforeDate, afterDate);

    this._fetchTimers( beforeDate, afterDate );
  }
}

export default TimerTermTimersList;
