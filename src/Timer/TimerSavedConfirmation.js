import React, { Component } from 'react';

class TimerSavedConfirmation extends Component {
  render() {

    return (
      <div className="ptt-created">
        <h1>Thank You!</h1>

        <p>Your new timer was created.<br />What would you like to do next?</p>


        <table>
          <tbody>
            <tr>
              <td>
                <a onClick={this._addAnotherTimer.bind(this)} href="#">Add another timer</a>
              </td>
              <td>
                <a onClick={this._closeModal.bind(this)} href="#">Go to main page</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  _closeModal(event) {
    event.preventDefault();

    this.props.onClose();
  }

  _addAnotherTimer(event) {
    event.preventDefault();

    this.props.onAddAnotherTimer();
  }
}

export default TimerSavedConfirmation;
