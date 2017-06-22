import React, { Component } from 'react';
import PTT from './PTT';
import FontAwesome from 'react-fontawesome';

class UserButtons extends Component {
  constructor(props) {
    super(props);

    this._showOptions = this._showOptions.bind(this);
    this._hideOptions = this._hideOptions.bind(this);

    this.state = {
      view: null,
      options: '',
    };
  }

  componentWillMount() {
    if (!this.props.user) {
      return;
    }
  }

  render() {
    const _userLink = (this.props.user.id)
    ? PTT.get('site').url
      + '/wp-admin/user-edit.php?user_id='
      + this.props.user.id
    : '';

    const _avatar = (this.props.user.avatar_urls
      && this.props.user.avatar_urls[24])
    ? <img
      src={this.props.user.avatar_urls[24]}
      alt={this.props.user.name}
      title="Visit Your Profile" />
    : <FontAwesome
      name="user"
      title="Visit Your Profile" />;

    return(
      <div
      className="user-buttons-wrapper"
      onMouseEnter={this._showOptions.bind(this)}
      onMouseLeave={this._hideOptions.bind(this)}>
        {this.state.options}
        <a href={_userLink}
        target="_blank">
          {_avatar}
        </a>
      </div>
    );
  }

  _showOptions() {
    this.setState({
      options: <div
      className="user-options">
        You are logged in as:
        <span className="user-name">
          {this.props.user.name}
        </span>
      </div>,
    });
  }

  _hideOptions() {
    this.setState({
      options: '',
    });
  }
}

export default UserButtons;