import React, { Component } from 'react';
import PTT from '../PTT';
import TimerFetch from './TimerFetch';
import Cookies from 'js-cookie';
import LoadingIcon from '../LoadingIcon';
import $ from 'jquery'; // Import jQuery.

/**
 * New Timer form
 */
class TimerNewForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'show',
      loading: '',
      post: null, // The current post we are working with.
      premise_time_tracker_project: null,
      premise_time_tracker_client: null,
      form: {
        action: PTT.get('endpoint'),
        status: 'publish',
        id: props.post  || '',
        time: props.total || '',
        title: '',
        content: '',
        client: '',
        project: ''
      }
    }

    // Bind this.
    this._handleSubmit = this._handleSubmit.bind(this);
    this._loadClients = this._loadClients.bind(this);
    this._loadProjects = this._loadProjects.bind(this);
    this._updateFieldValue = this._updateFieldValue.bind(this);
  }

  render() {
    const state = this.state;

    let clientsList, projectsList;

    if ( state.premise_time_tracker_client ) {
      clientsList = this._listTax( state.premise_time_tracker_client, 'clients' );
    }

    if ( state.premise_time_tracker_project ) {
      projectsList = this._listTax( state.premise_time_tracker_project, 'projects' );
    }

    return (
      <div className="timer-new-form">
        {state.loading}
        <form className={state.view}
            action={state.form.action}
            method="post"
            onSubmit={this._handleSubmit}>

          <input type="hidden"
              name="status"
              value={state.form.status} />

          <input type="hidden"
              name="id"
              value={state.form.id} />

          <div className="basic_fields">
            <label htmlFor="title">Title
              <input type="text" name="title" id="title"
                value={state.form.title}
                onChange={this._updateFieldValue} />
            </label>
            <label htmlFor="pwptt_hours">Time
              <input type="text" name="pwptt_hours" id="pwptt_hours"  defaultValue={state.form.time} />
            </label>
            <label htmlFor="content">Description
              <textarea name="content" id="content"
                value={state.form.content}
                onChange={this._updateFieldValue}  />
            </label>
          </div>

          <div className="timer-taxonomies-wrapper clients">
            <label>Clients
              <input type="text" name="premise_time_tracker_client"
                list="clients" className="new-tag-input"
                ref={(input) => this._client = input}
                onFocus={this._loadClients.bind(this)} />
              {clientsList}
            </label>
          </div>

          <div className="timer-taxonomies-wrapper projects">
            <label>Projects
              <input type="text" name="premise_time_tracker_project"
                list="projects" className="new-tag-input"
                ref={(input) => this._project = input}
                onFocus={this._loadProjects.bind(this)} />
              {projectsList}
            </label>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

  componentDidMount() {
    const state = this.state;

    // if we have a form id, the lets get the post before loading the form
    if ( state.form.id ) {
      // get the post and save it
      state.post = TimerFetch.getPost( state.form.id );
      state.post.then( _p => {
        // Build form before showing it.
        const buildForm = Object.assign( state.form, {
          title:       _p.title.rendered,
          content: _p.content.rendered,
          client: ( _p.premise_time_tracker_client.length )
              ? _p.premise_time_tracker_client.split(',')
              : '',
          project: ( _p.premise_time_tracker_project.length )
               ? _p.premise_time_tracker_project.split(',')
               : '',
        } )
        this.setState( {
          form: buildForm,
        });
        console.log('form should be built');
      } );
    }
  }

  _updateFieldValue(e) {
    var newState = {};
    newState[e.target.name] = e.target.value;
    this.setState({
      form: Object.assign( this.state.form, newState ),
    });
  }

  _handleSubmit(e) {
    e.preventDefault();

    $('body').animate({scrollTop: 0}, 400);

    // Reference 'this' and show the loading icon.
    let _this = this;
    _this.setState( {
      loading: <LoadingIcon />,
      view: 'hide',
    });

    var fields = $(e.target).serializeArray(),
    query      = e.target.action,
    parser     = '',
    id;
    // parse fields
    for (var i = fields.length - 1; i >= 0; i--) {
      // exclude id or empty values
      if ( 'id' !== fields[i].name
         && fields[i].value.length ) {

        if ( fields[i].name === 'premise_time_tracker_client' ||
          fields[i].name === 'premise_time_tracker_project' ) {
          // Get term ID from list, or create new term if needed.
          fields[i].value = this._getTermId( fields[i].name, fields[i].value );
        }

        parser += '&' + fields[i].name + '=' + fields[i].value;
      }
      // save the id separately
      else {
        id = fields[i].value;
      }
    }
    // build the query
    query += '/' + id + '?' + parser.substr(1, parser.length);

    console.log(query); return;

    // save our timer
    $.ajax( {
      url: query,
      method: 'POST',
      beforeSend: PTT.get('auth').ajaxBeforeSend,
    }).done( function( response ) {
      // we were successful!
      console.log(response);
      // delete post cookie
      Cookies.remove( 'ptt_current_timer' );
      // reload because we cannot update the view.
      // TODO fix this!
      location.reload();
    }).fail( function( err ) {
      console.error( err );
      _this.setState( {
        message: <span className="error">There was an error</span>
        // TODO test err.responseText();
      });
    });
  }

  _listTax( terms, taxonomyName ) {

    if (!terms.length) {
      return <span></span>;
    }

    let list = [];
    for (var i = terms.length - 1; i >= 0; i--) {
      list.push(
        <option value={terms[i].name}
          data-id={terms[i].id}
          key={terms[i].name + terms[i].id} />
      );
    }

    const ul = <datalist id={taxonomyName}>
      {list}
    </datalist>;
    return ul;
  }

  _theForm( _form ) {
    // this.state.form = Object.assign( this.state.form, _form );
    // return(

    // );
  }

  _loadClients() {
    console.log('loading clients');
    TimerFetch.getTaxonomy( 'client' ).then( premise_time_tracker_client => {
      // Do not mutate state directly. Use setState().
      // this.state.clients = this._listTax( clients );
      this.setState({
        premise_time_tracker_client
      });
    });
  }

  _loadProjects() {
    console.log('loading projects');
    TimerFetch.getTaxonomy( 'project' ).then( premise_time_tracker_project => {
      this.setState({
        premise_time_tracker_project,
      });
    });
  }

  _getTermId( taxonomyName, termName ) {
    // Check if term already in list.
    let term = this.state[taxonomyName].find(function(term){
      return term.name === termName;
    });

    if ( typeof term !== 'undefined' ) {
      return term.id;
    }

    // TODO Else create term first and get ID.
  }
}

export default TimerNewForm;
