import React, { Component } from 'react';

class WordpressIframe extends Component {
  constructor(props) {
    super(props); // super() must be called in our constructor.

    // Initial state.
    this.state = {
      url: props.url
    };
  }

  render() {
    return (
      <iframe src={this.state.url}
        className="wordpress-iframe"
        id="wordpress-iframe">
      </iframe>
    );
  }
}

export default WordpressIframe;
