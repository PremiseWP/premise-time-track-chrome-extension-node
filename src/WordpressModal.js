import React, { Component } from 'react';
import Modal from 'react-modal';
import WordpressIframe from './WordpressIframe';

class WordpressModal extends Component {
  constructor(props) {
    super(props); // super() must be called in our constructor.

    // Initial state.
    this.state = {
      modalIsOpen: false,
      url: props.url
    };
  }

  _openModal() {
    this.setState({modalIsOpen: true});
  }

  _afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.refs.subtitle.style.color = 'red';
  }

  _closeModal() {
    this.setState({modalIsOpen: false});

    this.props.onClose();
  }

  // https://facebook.github.io/react/docs/react-component.html#the-component-lifecycle
  componentDidMount() {

    if ( ! this.state.url ) {
      return;
    }

    this._openModal();
  }

  render() {
    const customStyles = {
      content : {
        top        : '0',
        left       : '50%',
        right      : 'auto',
        marginRight: '-50%',
        transform  : 'translate(-50%)',
        maxHeight  : '100%'
      }
    };

     return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this._afterOpenModal.bind(this)}
        onRequestClose={this._closeModal.bind(this)}
        style={customStyles}
        contentLabel="Wordpress Modal"
      >
        <a href="#" onClick={this._closeModal.bind(this)} className="button">Back</a>
        <WordpressIframe
          url={this.state.url}
          onClose={this._closeModal.bind(this)} />
      </Modal>
    );
  }
}

export default WordpressModal;
