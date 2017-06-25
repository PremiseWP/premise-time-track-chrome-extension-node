import React, { Component } from 'react';
import PTT from './PTT';
import FontAwesome from 'react-fontawesome';

class UserButtons extends Component {
  constructor(props) {
    super(props);

    this._showOptions   = this._showOptions.bind(this);
    this._toggleOptions = this._toggleOptions.bind(this);
    this._logout        = this._logout.bind(this);
    this._autoLoginLink = this._autoLoginLink.bind(this);

    this.state = {
      view: null,
      options: '',
      link: (this.props.user && this.props.user.id)
      ? PTT.get('site').url
        + '/wp-admin/user-edit.php?user_id='
        + this.props.user.id
      : '',
      optionsOpened: false,
    };
  }

  componentWillMount() {
    if (!this.props.user) {
      return;
    }
  }

  render() {
    return(
      <div
      className="user-buttons-wrapper"
      >
        {(this.state.optionsOpened) ? this._showOptions() : ''}
        <div className="user-avatar"
        onClick={this._toggleOptions}>
          <img
          src={this.props.user.avatar_urls[48]}
          alt={this.props.user.name}
          title="Visit Your Profile" />
        </div>
      </div>
    );
  }

  _showOptions() {
    return (
      <div className="user-options">
        <p>
          <span className="user-name">
            {this.props.user.name}
          </span>
        </p>
        <p>
          <a href={this.state.link} target="_blank">
            <FontAwesome
            name="user"
            title="Visit My Profile" />
            &nbsp;Visit My Profile
          </a>
        </p>
        <p>
          <a href={this._autoLoginLink()} target="_blank">
            Auto-Login:
          </a><br/>
          <code>{this._autoLoginLink()}</code>
        </p>
        <p>
          <a href="#" onClick={this._logout} target="_blank">
            <FontAwesome
            name="chain-broken"
            title="Logout" />
            &nbsp;Logout
          </a>
        </p>
      </div>
    );
  }

  // return auto login link url
  _autoLoginLink() {
    let _url = location.origin + '?';
    if (PTT.get('creds')) {
      for (var i in PTT.get('creds')) {
        _url += i + '=' + PTT.get('creds')[i] + '&';
      }
    }
    return _url.substr(0,(_url.length - 1));
  }

  _toggleOptions() {
    this.setState({
      optionsOpened: (this.state.optionsOpened) ? false : true,
    });
  }

  _logout(e) {
    e.preventDefault();
    PTT._reset();
    location.reload();
  }
}

export default UserButtons;