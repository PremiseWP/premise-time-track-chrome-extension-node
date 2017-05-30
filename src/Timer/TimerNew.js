import React, { Component } from 'react';
import PTT from '../PTT';
import Cookies from 'js-cookie';
import TimerNewButton from './TimerNewButton';
import TimerStopButton from './TimerStopButton';
import TimerNewForm from './TimerNewForm';
import LoadingIcon from '../LoadingIcon';
import $ from 'jquery'; // Import jQuery.

/**
 * Display the new timer button
 */
class TimerNew extends Component {
  constructor(props) {
    super(props);

    this._construct( true );
  }

  _construct( isConstructor ) {
    const post = Cookies.getJSON( 'ptt_current_timer' );

    const message = ( post )
        ? this._timerStartedMessage( new Date( post.start ) )
        : '';

    const view = ( post )
        ? <TimerStopButton post={post.id}
                onClick={this._handleStopTimer.bind(this)} />
        : <TimerNewButton onClick={this._handleNewTimer.bind(this)} />;

    if ( isConstructor ) {
      this.state = { post, message, view };
    } else {
      this.setState({ post, message, view });
   }
  }

  render() {
    return (
      <div id="timer-new">
        <div className="message">{this.state.message}</div>
        {this.state.view}
      </div>
    );
  }

  // TODO handle error
  _handleNewTimer(e) {
    e.preventDefault();

    const view = <LoadingIcon />;

    this.setState({ view });

    var _this = this; // Move callback to proper functions w/ bind this!!

    // Start the timer!
    const _start = new Date();

    $.ajax({
      beforeSend: PTT.get('auth').ajaxBeforeSend,
      method: 'POST', // Create a post. 'GET' retrieves them.
      url: PTT.get('endpoint')
        + '?status=publish&title=Timer in progress create by PTT at '
        + _start.toLocaleTimeString(),
    })
    .done( function( post ) {
      // save post info in a cookie.
      Cookies.remove( 'ptt_current_timer' );
      Cookies.set( 'ptt_current_timer', {
        id: post.id,
        start: _start.getTime(),
      } );

      console.log(post);

      _this.setState( {
        post: {
          id: post.id,
          start: _start.getTime(),
        },
        view: <TimerStopButton post={post.id}
            onClick={_this._handleStopTimer.bind(_this)} />,
        message: _this._timerStartedMessage( _start ),
      });
    })
    .fail( function( err ) {
      console.log( err );
      _this.setState( {
        message: <span className="error">There was an error</span>
        // TODO test err.responseText();
      });
    });
  }

  _handleStopTimer(e) {
    e.preventDefault();

    const stop     = new Date();
    const diff     = Math.abs( stop.getTime() - this.state.post.start );
    const minutes  = Math.floor( diff / 60000 );
    const total    = parseFloat( minutes / 60 );
    const time     = ( Math.round(total * 4) / 4).toFixed(2);

    this.setState( {
      view: <TimerNewForm post={this.state.post.id} total={time} onSaved={this._construct.bind(this)} />,
      // message: 'Congratulations, you finished a task! Enter some information about it here to complete recording your time.',
      message: '',
    });
  }

  _timerStartedMessage( date ) {
    const time = date.toLocaleTimeString();
    return (
      <p className="timer-started">
        Timer started at:
        <span className="time"> {time}</span>
      </p>
    );
  }
}

export default TimerNew;
