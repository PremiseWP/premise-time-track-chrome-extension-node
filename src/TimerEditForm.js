import React, { Component } from 'react';
// import FontAwesome from 'react-fontawesome';

class TimerEditForm extends Component {

  constructor() {

    this.state = { timer: { id: null, title: null, content: null, hours: null, date: null } };
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

    timer = { id: 1, title: "Timer 1", content: "Timer description", hours: 2 };

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

        <div className="more-fields">
          <a href="#" className="more-link unfold">More</a>

          <label>Date:
            <input type="date" name="ptt[date]"
              value={_getTimerDate()}
              ref={(input) => this._date = input} />
          </label>

          <div className="ptt-form-clients">
            <TimerTaxonomiesEditForm timer={this.state.timer} taxonomyName="clients" />
          </div>
          <hr />

          <label>Projects:
            <div className="new-tag-wrapper">
              <input type="text" name="new-project"
                value="" list="projects" className="new-tag-input" />
              <button className="new-tag-add-button">Add</button>
            </div>

            {/* if ( $projects ) : */}
              <datalist id="projects">
              {/* foreach ( (array) $projects as $project ) : // Build autocomplete list. */}

                <option value={null /* echo htmlspecialchars( $project['name'] ); */}
                  id={null /* echo $project['id']; */} />

              {/* endforeach; */}
              </datalist>
            {/* endif; */}

            <div className="tags-list projects">
            {/* if ( $projects ) : */}
              {/* if ( $ptt ) : foreach ( (array) $projects as $project ) : // Build tags list. */}
                {/* if ( ! in_array( $project['id'], $ptt['premise_time_tracker_project'] ) ) continue; */}

                <span>
                  <button type="button" className="tag-delete-button">
                    <span className="remove-tag-icon" aria-hidden="true"></span>
                    <span className="screen-reader-text">Remove term</span>
                  </button>
                  <input type="hidden" name="ptt[projects][]" value={null /* echo $project['id']; */} />
                  {/* echo htmlspecialchars( $project['name'] ); */}
                </span>

              {/* endforeach; endif; */}
            {/* endif; */}
            </div>

          </label>

          <label>Timesheets:
            <div className="new-tag-wrapper">
              <input type="text" name="new-timesheet"
                value="" list="timesheets" className="new-tag-input" />
              <button className="new-tag-add-button">Add</button>
            </div>

            {/* if ( $timesheets ) : */}
              <datalist id="timesheets">
              {/* foreach ( (array) $timesheets as $timesheet ) : // Build autocomplete list. */}

                <option value={null /* echo htmlspecialchars( $timesheet['name'] ); */}
                  id={null /* echo $timesheet['id']; */} />

              {/* endforeach; */}
              </datalist>
            {/* endif; */}

            <div className="tags-list timesheets">
            {/* if ( $timesheets ) : */}
              {/* if ( $ptt ) : foreach ( (array) $timesheets as $timesheet ) : // Build tags list. */}
                {/* if ( ! in_array( $timesheet['id'], $ptt['premise_time_tracker_timesheet'] ) ) continue; */}

                <span>
                  <button type="button" className="tag-delete-button">
                    <span className="remove-tag-icon" aria-hidden="true"></span>
                    <span className="screen-reader-text">Remove term</span>
                  </button>
                  <input type="hidden" name="ptt[timesheets][]" value={null /* echo $timesheet['id']; */} />
                  {/* echo htmlspecialchars( $timesheet['name'] ); */}
                </span>

              {/* endforeach; endif; */}
            {/* endif; */}
            </div>

          </label>
        </div>

      </div>

      <button type="submit">Submit</button>
      <button onClick={this._closeModal.bind(this)} className="cancel">Cancel</button>

      </form>
    );
  }

  _getTimerDate() {
    if ( ! timer.date ) {
      return null;
    }

    return timer.date.substring(0, 10);
  }

  _closeModal(event) {
    event.preventDefault();

    this.props.onClose();
  }
}

export default TimerEditForm;
