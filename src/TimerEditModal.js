import React, { Component } from 'react';
import Modal from 'react-modal';
import TimerEditForm from './TimerEditForm';
import TimerSavedConfirmation from './TimerSavedConfirmation';

class TimerEditModal extends Component {
  constructor() {
    super(); // super() must be called in our constructor.

    // Initial state.
    this.state = {
      modalIsOpen: false,
      timerSavedConfirmation: false
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
    this.setState({modalIsOpen: false, timerSavedConfirmation: false});
  }

  // https://facebook.github.io/react/docs/react-component.html#the-component-lifecycle
  componentDidUpdate(prevProps, prevState) {
    const timer = this.props.timer;
    const prevTimer = prevProps.timer;

    if ( ! ('id' in timer) ||
      timer === prevTimer ) {
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

    let partial;

    if ( this.state.timerSavedConfirmation ) {
      partial = <TimerSavedConfirmation
        onClose={this._closeModal.bind(this)}
        onAddAnotherTimer={this._timerSavedConfirmation.bind(this)} />
    } else {
      // Will open modal if has timer, see componentWillMount().
      const timer = this.props.timer;

      partial = <TimerEditForm
        timer={timer}
        onClose={this._closeModal.bind(this)}
        onSave={this._timerSavedConfirmation.bind(this)} />;
    }

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
          {partial /* TimerEditForm or TimerSavedConfirmation component. */}
        </Modal>
      </div>
    );
  }

  _timerSavedConfirmation() {
    // Hide TimerEditForm.
    this.setState({
      // Toggles state of showComments between true and false.
      timerSavedConfirmation: !this.state.timerSavedConfirmation
    });
  }


}

export default TimerEditModal;
