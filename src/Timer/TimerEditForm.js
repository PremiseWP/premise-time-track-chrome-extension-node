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
        id: 0,
        title: {rendered: ''},
        content: '',
        pwptt_hours: '',
        date: '',
        premise_time_tracker_client: [],
        premise_time_tracker_project: [],
        premise_time_tracker_timesheet: []
      }
    }

    this._newTaxonomies = [];
  }

  // called before the component is rendered to the page.
  componentWillMount() {
    // Fetch timer from server before component is rendered.
    this._fetchTimer();
  }

  _fetchTimer() {

    const timer = this.props.timer;

    if ( ! ('id' in timer) ) {
      return;
    }

    // const timer = { id: 1, title: {rendered: "Timer 1"}, content: "Timer description", hours: 2 };

    this.setState({ timer });

    return;

    /*$.ajax({
      method: 'GET',
      url: '/api/' + this.props.timerId, // Makes call to the remote server.
      success: (timer) => { // Arrow function preserves the this binding to our class.
        // Get JSON.
        timer = JSON.parse(timer);
        console.log(timer);

        this.setState({ timer });
      }
    });*/
  }

  render() {

    const timer = this.state.timer;

    return (
      <div className="ptt-form">
        <h2>{ /*$ptt ? 'Edit' : 'New';*/ } Timer</h2>

        <form className="ptt-details-form"
          onSubmit={this._handleSubmit.bind(this) /* Bind an event listener to the submit event */}>

           {/*<input type="hidden" name="ptt-id" defaultValue={timer.id} />

          <input type="hidden" name="ptt[status]" defaultValue="publish" />*/}

          <div className="details">
            <label>Task:
              <input required
                defaultValue={timer.title.rendered}
                ref={(input) => this._title = input} />
            </label>

            <label>Description:
              <textarea
                defaultValue={timer.content.rendered}
                ref={(textarea) => this._content = textarea} />
            </label>

            <label>Time:
              <input placeholder="1.75" required
                defaultValue={timer.pwptt_hours}
                ref={(input) => this._hours = input} />
            </label>

            <div className={'more-fields ' + (this.state.unfolded ? 'unfolded' : '')}>
              <a href="#" onClick={this._unfoldMoreFields.bind(this)} className="more-link unfold">More</a>

              <label>Date:
                <input type="date"
                  defaultValue={this._getTimerDate(timer.date)}
                  ref={(input) => this._date = input} />
              </label>

              <div className="ptt-form-clients">
                <TimerCategoriesEdit timer={timer} taxonomyName="client"
                  ref={(client) => this._newTaxonomies['client'] = client} />
              </div>
              <hr />

              <TimerTagsEdit timer={timer} taxonomyName="project"
                ref={(project) => this._newTaxonomies['project'] = project} />

              <TimerTagsEdit timer={timer} taxonomyName="timesheet"
                ref={(timesheet) => this._newTaxonomies['timesheet'] = timesheet} />

            </div>
          </div>

          <button type="submit">Submit</button>
          <button onClick={this._closeModal.bind(this)} className="cancel">Cancel</button>

        </form>
      </div>
    );
  }

  _getTimerDate(date) {
    if ( ! date ) {
      return '';
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

  _handleSubmit(event) {
    console.log('TimerEditForm submitted!');
    // Prevents page from reloading.
    event.preventDefault();

    // Form validation.
    // checks whether the value property of title or hours is falsy.
    if (! this._title.value || ! this._hours.value) {
      alert("Please enter a task and the corresponding hours");
      // Keep timer from being added.
      return;
    }

    this._saveTimer();
  }

  _saveTimer() {
    // Populated from refs in JSX.
    let timer = this.state.timer;

    timer.title.rendered = this._title.value;
    timer.content = this._content.value;
    timer.hours = this._hours.value;
    timer.date = this._date.value;
    // Save new taxonomy terms if any first, and get IDs.
    timer.client = this._saveTaxonomy('client');
    timer.project = this._saveTaxonomy('project');
    timer.timesheet = this._saveTaxonomy('timesheet');

    this.setState({timer});

    console.log(timer);

    // Confirmation page!
    this.props.onSave();
  }

  _saveTaxonomy(taxonomyName) {
    if ( ! (taxonomyName in this._newTaxonomies) ) {
      return [];
    }

    return this._newTaxonomies[ taxonomyName ]._saveNewTerms();
  }
}

export default TimerEditForm;
