import React, { Component } from 'react';
import TimerFetch from './Timer/TimerFetch';

class FroceUserDownloadBtn extends Component {
  constructor(props) {
    super(props);

    this._handleDownload = this._handleDownload.bind(this);

    this.state = {
      style: {
        marginBottom: '2em',
      }
    }
  }

  render() {
    return (
      <div className="force_user_download">
        <button
        onClick={this._handleDownload}
        style={this.state.style}>
          Click to fix this issue.
        </button>
      </div>
    );
  }

  _handleDownload(e) {
    e.preventDefault();
    let _this = this;
    TimerFetch.otherEndpoint(
      'premise_time_tracker/v2/currentuser/'
    )
    .done( function( resp ) {
      if ( _this.props.onDownload
        && 'function' === typeof _this.props.onDownload ) {
        _this.props.onDownload(resp);
      }
    });
  }
}

export default FroceUserDownloadBtn;