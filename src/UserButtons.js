import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class UserButtons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: null,
    };
  }

  componentWillMount() {
    if (this.props.user && this.props.user.link) {
      this.setState({
        view: <div className="user-buttons-wrapper">
          <a href={this.props.user.link}
          target="_blank">
            <FontAwesome className="user-profile" name="user" title="Visit Your Profile" />
          </a>
        </div>,
      });
    }
  }

  render() {
    return this.state.view;
  }
}

export default UserButtons;