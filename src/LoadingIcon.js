import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

/**
 * Display a loading icon
 */
class LoadingIcon extends Component {
  constructor() {
    super();

    this.state = {
      size: '3em',
      icon: 'spinner',
      align: 'center',
    }
  }

  render() {
    const divStyle = {
      textAlign: this.state.align,
    }

    const iconStyle = {
      fontSize: this.state.size,
    };

    return (
      <div className="loading_icon" style={divStyle}>
        <FontAwesome
          name={this.state.icon}
          spin
          style={iconStyle}
        />
      </div>
    );
  }
}

export default LoadingIcon;
