import React, { Component } from 'react';
import $ from 'jquery'; // Import jQuery.
import TimerNewForm from './TimerNewForm';
import TimerFetch from './TimerFetch';
import FontAwesome from 'react-fontawesome';

class TimerTermTimer extends Component {
  constructor(props) {
    super(props);

    this._setHover = this._setHover.bind(this);
    this._unsetHover = this._unsetHover.bind(this);
    this._editThisTimer = this._editThisTimer.bind(this);
    this._theTimer = this._theTimer.bind(this);
    this._reloadTimer = this._reloadTimer.bind(this);
    this._cancelEditTimerControls = this._cancelEditTimerControls.bind(this);
    this._goBackToTheTimer = this._goBackToTheTimer.bind(this);

    this.state = {
      isHovered: false,
      onEditTimerClick: props.onEditTimerClick || null,
      view: this._theTimer(),
      controls: this._editTimerControls(),
    }
  }

  render() {
    return (
      <li>
        {this.state.controls}
        {this.state.view}
      </li>
    );
  }

  _theTimer(timer) {
    timer = timer || this.props.timer
    return(
      <div>
        <h4>
          {timer.title.rendered}
        </h4>
        <div className="timer-details-wrapper">
          <p className="timer-date">
            {this._formatDate( timer.date )}
          </p>
          <p className="timer-description"
            dangerouslySetInnerHTML={this._formatDescription( timer.content.rendered )} />
          <div className="timer-details-bottom-wrapper">
            <p className="timer-project">
              {this.props.projectName}
            </p>
            <p className="timer-hours">
              {timer.pwptt_hours} hrs
            </p>
          </div>
        </div>
      </div>
    );
  }

  _editTimerControls() {
    let _ui = '';
      _ui = <div className="edit-timer-ui">
        <a href="#" onClick={this._editThisTimer}>
          <FontAwesome
          name="pencil" />
        </a>
      </div>;

    return _ui;
  }

  _cancelEditTimerControls() {
    return(
      <div className="edit-timer-ui">
        <a href="#" onClick={this._goBackToTheTimer}>
          <FontAwesome
          name="close" />
        </a>
      </div>
    );
  }

  _editThisTimer(e) {
    e.preventDefault();
    this.setState({
      controls: this._cancelEditTimerControls(),
      view: <TimerNewForm
      post={this.props.timer.id}
      total={this.props.timer.pwptt_hours}
      onSaved={this._reloadTimer} />,
    });
  }

  _goBackToTheTimer(e) {
    e.preventDefault();
    this._reloadTimer();
  }

  _reloadTimer() {
    TimerFetch.getPost( this.props.timer.id )
    .then( post => {
      this.setState({
        view: this._theTimer(post),
        controls: this._editTimerControls(),
      });
    });
  }

  _setHover() {
    console.log('Mouse Entered');
    this.setState({
      isHovered: true,
    });
  }
  _unsetHover() {
    console.log('Mouse Left');
    this.setState({
      isHovered: false,
    });
  }

  _formatDate( date ) {
    const dayNames = [
      "Monday", "Tuesday", "Wednesday",
      "Thursday", "Friday", "Saturday", "Sunday"
    ];

    date = new Date( date );

    const day = date.getDate();
    const dayIndex = date.getDay();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return dayNames[dayIndex] + ' ' + (monthIndex + 1) + '/' + day  + '/' + year;
  }

  _formatDescription( description ) {
    // Strip tags!
    description = $(description).text();

    // 4 lines max.
    if ( description.length > 36 *3 ) {
      description = description.slice(0, (36*3 - 3) ) + '...';
    }

    return { __html: description };
  }
}

export default TimerTermTimer;
