import React, { Component } from 'react';
// import FontAwesome from 'react-fontawesome';

class TimerNewForm extends Component {
  render() {
    return (
     <form className="ptt-details-form" method="GET" action="">

      <input type="hidden" name="step" value="ptt-save" />

      <input type="hidden" name="ptt-id" value={null /* echo $ptt ? htmlspecialchars( $ptt['id'] ) : ''; */} />

      <input type="hidden" name="ptt[status]" value="publish" />

      <div className="details">
        <label>Task:
          <input type="text" name="ptt[title]"
            value={null /* echo $ptt ?
              htmlspecialchars( $ptt['title']['raw'] ) :
              ''; */} required />
        </label>

        <label>Description:
          <textarea name="ptt[content]">{/* echo $ptt ?
              nl2br( htmlspecialchars( $ptt['content']['raw'] ) ) :
              ''; */}</textarea>
        </label>

        <label>Time:
          <input type="text" name="ptt[pwptt_hours]"
            value={null /* echo $ptt ?
              htmlspecialchars( $ptt['pwptt_hours'] ) :
              ''; */} placeholder="1.75" required />
        </label>

        <div className="more-fields">
          <a href="#" className="more-link unfold">More</a>

          <label>Date:
            <input type="date" name="ptt[date]"
              value={null /* echo $ptt ?
                htmlspecialchars( substr( $ptt['date'], 0, 10 ) ) :
                ''; */} />
          </label>

          <div className="ptt-form-clients">
            <label>Clients:</label>

            {/* if ( $clients ) :
              $no_clients = false; */}
              <ul className="taxonomy-terms-list clients">
              {/* foreach ( (array) $clients as $client ) : */}

                <li>
                  <label>
                    <input type="checkbox" name="ptt[clients][]"
                      value={null /* echo $client['id']; */} className="checkbox" />
                      {/* if ( $ptt && in_array( $client['id'], $ptt['premise_time_tracker_client'] ) ) echo 'checked'; */}
                    {/* echo htmlspecialchars( $client['name'] ); */}
                  </label>
                </li>

              {/* endforeach; */}
              </ul>
            {/* endif; */}

            {/* if ( $clients ) : */}
              <div className="ptt-client-field-wrapper">
                <a href="#" className="add-new-client-link unfold">Add a new client</a>
            {/* endif; */}

              <input type="text" name="ptt[clients][new]" value="" />

            {/* if ( $clients ) : */}
              </div>
            {/* endif; */}
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

  _closeModal(event) {
    event.preventDefault();

    this.props.onClose();
  }
}

export default TimerNewForm;
