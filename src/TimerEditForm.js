import React, { Component } from 'react';
import TimerCategoriesEdit from './TimerCategoriesEdit';
import TimerTagsEdit from './TimerTagsEdit';
import $ from 'jquery'; // Import jQuery.
// import FontAwesome from 'react-fontawesome';

class TimerEditForm extends Component {

  constructor() {
    super(); // super() must be called in our constructor.

    this.state = {
      unfolded: false,
      timer: {
        id: null,
        title: null,
        content: null,
        hours: null,
        date: null,
        clients: null,
        projects: null,
        timesheets: null
      }
    };
  }

  // called before the component is rendered to the page.
  componentWillMount() {
    // Fetch timer from server before component is rendered.
    this._fetchTimer();
  }

  _fetchTimer() {

    if ( ! this.props.timerId ) {
      return;
    }

    const timer = { id: 1, title: "Timer 1", content: "Timer description", hours: 2 };

    this.setState({ timer });

    return;

    $.ajax({
      method: 'GET',
      url: '/api/' + this.props.timerId, // Makes call to the remote server.
      success: (timer) => { // Arrow function preserves the this binding to our class.
        // Get JSON.
        timer = JSON.parse(timer);
        console.log(timer);

        this.setState({ timer });
      }
    });
  }

  render() {

    const timer = this.state.timer;

    return (
      <form className="ptt-details-form" method="GET" action="">

        <input type="hidden" name="step" value="ptt-save" />

        <input type="hidden" name="ptt-id" value={timer.id} />

        <input type="hidden" name="ptt[status]" value="publish" />

        <div className="details">
          <label>Task:
            <input type="text" name="ptt[title]" required
              value={timer.title}
              ref={(input) => this._title = input} />
          </label>

          <label>Description:
            <textarea name="ptt[content]"
              ref={(textarea) => this._content = textarea}>
              {timer.content}
            </textarea>
          </label>

          <label>Time:
            <input type="text" name="ptt[pwptt_hours]" placeholder="1.75" required
              value={timer.hours}
              ref={(input) => this._hours = input} />
          </label>

          <div className={'more-fields ' + (this.state.unfolded ? 'unfolded' : '')}>
            <a href="#" onClick={this._unfoldMoreFields.bind(this)} className="more-link unfold">More</a>

            <label>Date:
              <input type="date" name="ptt[date]"
                value={this._getTimerDate(timer.date)}
                ref={(input) => this._date = input} />
            </label>

            <div className="ptt-form-clients">
              <TimerCategoriesEdit timer={timer} taxonomyName="clients" />
            </div>
            <hr />

            <TimerTagsEdit timer={timer} taxonomyName="projects" />

            <TimerTagsEdit timer={timer} taxonomyName="timesheets" />

          </div>
        </div>

        <button type="submit">Submit</button>
        <button onClick={this._closeModal.bind(this)} className="cancel">Cancel</button>

      </form>
    );
  }

  _getTimerDate(date) {
    if ( ! date ) {
      return null;
    }

    return date.substring(0, 10);
  }

  _closeModal(event) {
    event.preventDefault();

    this.props.onClose();
  }

  _unfoldMoreFields(event) {
    event.preventDefault();

    // Show more fields.
    this.setState({unfolded: true});
  }
}

export default TimerEditForm;
