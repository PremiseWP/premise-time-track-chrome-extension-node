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

    // Bind this.
    this._handleSubmit     = this._handleSubmit.bind(this);
    this._loadClients      = this._loadClients.bind(this);
    this._loadProjects     = this._loadProjects.bind(this);
    this._updateFieldValue = this._updateFieldValue.bind(this);
    this._startProcess     = this._startProcess.bind(this);
    this._endProcess       = this._endProcess.bind(this);
    this._buildForm        = this._buildForm.bind(this);

    // build initial state
    this.state = {
      view: 'show',
      processing: false,
      formState: '',
      post: null, // current post
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
      },
      author: PTT.get('user') || {},
    }
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

    const wrapperClass = this.state.processing
    ? 'processing'
    : '';

    const loading = this.state.processing
    ? <LoadingIcon
      message={this.state.formState} />
    : '';

    return (
      <div className={"timer-new-form "+wrapperClass}>
        {loading}
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

          <input type="hidden"
              name="author"
              value={state.author.id} />

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
                onBlur={this._checkTermId.bind(this)} />
              {clientsList}
            </label>
          </div>

          <div className="timer-taxonomies-wrapper projects">
            <label>Projects
              <input type="text" name="premise_time_tracker_project"
                list="projects" className="new-tag-input"
                ref={(input) => this._project = input}
                onBlur={this._checkTermId.bind(this)} />
              {projectsList}
            </label>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

  // react component.
  // fires right before component has loaded
  componentWillMount() {
    // if we have a form id,
    // then lets get the post
    // before loading the form
    if ( this.state.form.id ) {
      this._buildForm();
    }
  }

  // changes formState to processing
  // and loads loading icon with optional message
  // to let the user know what process is
  // about to start
  _startProcess( msg ) {
    const _msg = msg || '';
    this.setState( {
      processing: true,
      formState: _msg,
    });
  }

  // changes formState to done
  // hides loading icon
  _endProcess() {
    this.setState( {
      processing: false,
      formState: '',
    });
  }

  // build the form if we have a post
  _buildForm() {
    this._startProcess('Building the form..');
    // get the post and save it
    TimerFetch.getPost( this.state.form.id )
    .then( _p => {
      // Build form before showing it.
      const buildForm = Object.assign( this.state.form, {
        title: _p.title.rendered,
        content: _p.content.rendered,
        client: ( _p.premise_time_tracker_client.length )
            ? _p.premise_time_tracker_client.split(',')
            : '',
        project: ( _p.premise_time_tracker_project.length )
             ? _p.premise_time_tracker_project.split(',')
             : '',
      } );
      this.setState( {
        post: _p,
        form: buildForm,
      });
      this._startProcess('Loading clients & projects..');
      this._loadClients();
      this._loadProjects();
      setTimeout(this._endProcess, 500);
    } );
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
    projectId  = false,
    id;

    // verify the fields
    $.when( function() {
      for (var i = fields.length - 1; i >= 0; i--) {
        if ( 'id' !== fields[i].name
           && fields[i].value.length ) {

          if ( fields[i].name === 'premise_time_tracker_client' ||
               fields[i].name === 'premise_time_tracker_project' ) {
            // Get term ID from list, or create new term if needed.
            fields[i].value = this._getTermId( fields[i].name, fields[i].value );
          }

          parser += '&' + fields[i].name + '=' + fields[i].value;
        }
      }
    })

    .then(function(){
      // parse fields
      for (var i = fields.length - 1; i >= 0; i--) {
        // exclude id or empty values
        if ( 'id' !== fields[i].name
           && fields[i].value.length ) {

          // I believe this used to do the count on hours from the server side.
          if ( fields[i].name === 'premise_time_tracker_project' ) {
            projectId = fields[i].value;
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

      // console.log(query); return;


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

        if ( projectId ) {
          const url = PTT.get( 'endpoint' ) + '/' + id;

          console.log(url);

          // Update pwptt_project_hours trick
          // Dummy POST to call the rest_insert_premise_time_tracker hook again now
          // as the timer should now be related to the project.
          $.ajax( {
            url: url,
            method: 'POST',
            beforeSend: PTT.get('auth').ajaxBeforeSend,
          }).done( function( response ) {
            // Global callback fetch / update project terms.
            window.updateProjectWidgetTerms(response);
          });
        }

        _this.props.onSaved();

      }).fail( function( err ) {
        console.error( err );
        _this.setState( {
          message: <span className="error">There was an error</span>
          // TODO test err.responseText();
        });
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

  // Load Clients to use as dropdown options
  _loadClients() {
    TimerFetch.getTaxonomy( 'client' ).then( premise_time_tracker_client => {
      this.setState({
        premise_time_tracker_client
      });
    });
  }

  // Load Projects to use as dropdown options
  _loadProjects() {
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
    else {
      return $.ajax({
        method: 'POST',
        beforeSend: PTT.get( 'auth' ).ajaxBeforeSend,
        url: PTT.get( 'site' ).url + '/wp-json/wp/v2/'+taxonomyName+'/?name=' + termName,
      });

      //update state taxonomy name
    }

    // TODO Else create term first and get ID.
  }

  // check if the term exists in our object already,
  // if so, we get back the term id. false otherwise.
  _checkTermId(e) {

    let taxonomyName = $(e.target).attr('name');
    let termName     = $(e.target).val();

    // Check if term already in list.
    let term = this.state[taxonomyName].find(function(term){
      return term.name === termName;
    });

    if ( typeof term === 'undefined' ) {
      let _this = this;
      $.ajax({
        method: 'POST',
        beforeSend: PTT.get( 'auth' ).ajaxBeforeSend,
        url: PTT.get( 'site' ).url + '/wp-json/wp/v2/'+taxonomyName+'/?name=' + termName,
      })
      .done(function( newTerm ){
        const _preTerm = {};
        _preTerm[ taxonomyName ] = newTerm;[ taxonomyName ] = newTerm;
        _this.setState({
          _preTerm
        });
        console.log(_preTerm);
      });
    }
  }

  _disableWhenProcessing() {
    console.log(this.state.formState);
    return ( 'processing' === this.state.formState )
      ? 'disabled'
      : '';
  }
}

export default TimerNewForm;
