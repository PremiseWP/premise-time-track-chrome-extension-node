import React, { Component } from 'react';
import PTT from '../PTT';
import TimerNewButton from './TimerNewButton';
import TimerStopButton from './TimerStopButton';
import TimerNewForm from './TimerNewForm';
import LoadingIcon from '../LoadingIcon';
import $ from 'jquery'; // Import jQuery.
import TimerFetch from './TimerFetch';

/**
 * Display the new timer button
 */
class TimerNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: PTT.get('current_timer'),
      message: '',
      view: <LoadingIcon
      message="Checking if you have any timers opened.." />,
    };
  }

  componentWillMount() {
    this._construct();
  }

  _postCreated() {
    this.setState({
      post: PTT.get('current_timer'),
      view: <TimerNewButton
      onClick={this._handleNewTimer.bind(this)} />,
    });
  }

  _construct( isConstructor ) {
    if ( this.state.post
      && this.state.post.id ) {
      // we have a post saved in our cookies
      // lets try and verify it.
      // consle.log( this.state.post );
      TimerFetch.getPost( this.state.post.id )
      .then( r => {
        if ( r.id ) {
          // we have a post id
          // which means we have a post.
          this.setState({
            message: this._timerStartedMessage(
              new Date( this.state.post.start )
            ),
            view: <TimerStopButton post={this.state.post.id}
            onClick={this._handleStopTimer.bind(this)} />,
          });
        }
        else {
          // we do not have a post.
          // which means there will be an issue.
          this.setState({
            message: 'It looks like there was a timer saved in your cookies but we could not verify it. This usually means the post was removed or you no longer have access to it. Sorry for the inconvenience, please create a new timer.',
            view: <TimerNewButton
            onClick={this._handleNewTimer.bind(this)} />,
          });
          PTT.set({},'current_timer'); // delete post cookie
          PTT.setCookies(); // reset cookies.
        }
      });
    }
    // we do not have a post
    else {
      this.setState({
        post: PTT.get('current_timer'),
        view: <TimerNewButton
        onClick={this._handleNewTimer.bind(this)} />,
      });
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

    this.setState({
      message: '',
      view: view,
    });

    var _this = this; // Move callback to proper functions w/ bind this!!

    // Start the timer!
    const _start = new Date();

    $.ajax({
      beforeSend: PTT.get('auth').ajaxBeforeSend,
      method: 'POST',
      url: PTT.get('endpoint')
        + '?status=publish&title=Timer in progress create by PTT at '
        + _start.toLocaleTimeString(),
    })
    .done( function( post ) {
      const _post = {
        id: post.id,
        start: _start.getTime(),
      };
      PTT.set(_post,'current_timer');
      PTT.setCookies();
      console.log(post);
      _this.setState( {
        post: _post,
        view: <TimerStopButton post={_post.id}
            onClick={_this._handleStopTimer.bind(_this)} />,
        message: _this._timerStartedMessage( _start ),
      });
    })
    .fail( function( err ) {
      _this.setState( {
        message: <span
        className="error">
          {err.responseJSON.message}
        </span>,
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
      view: <TimerNewForm post={this.state.post.id} total={time} onSaved={this._postCreated.bind(this)} />,
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
