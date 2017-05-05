import React, { Component } from 'react';
import Modal from 'react-modal';
import TimerEditForm from './TimerEditForm';

class TimerEditModal extends Component {
  constructor() {
    super(); // super() must be called in our constructor.

    // Initial state.
    this.state = { modalIsOpen: false };
  }

  _openModal() {
    this.setState({modalIsOpen: true});
  }

  _afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.refs.subtitle.style.color = 'red';
  }

  _closeModal() {
    this.setState({modalIsOpen: false});
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
      <div style={{display: 'inline-block'}}>
        <a href="#" onClick={this._openModal.bind(this)} className="button new-timer">New Timer</a>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this._afterOpenModal.bind(this)}
          onRequestClose={this._closeModal.bind(this)}
          style={customStyles}
          contentLabel="Edit Timer Modal"
        >
          <h2 ref="subtitle">{ /*$ptt ? 'Edit' : 'New';*/ } Timer</h2>
          <TimerEditForm
            timerId=""
            onClose={this._closeModal.bind(this)} />
        </Modal>
      </div>
    );
  }
}

export default TimerEditModal;
