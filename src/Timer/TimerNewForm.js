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
      projects: <LoadingIcon />,
      clients: <LoadingIcon />,
      form: {
        action: PTT.endpoint,
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

    return (
      <div className="new_timer_form">
        {state.loading}
        <form className={state.view}
            action={state.form.action}
            method="post"
            onSubmit={this._handleSubmit}>

          <input  type="hidden"
              name="status"
              value={state.form.status} />

          <input  type="hidden"
              name="id"
              value={state.form.id} />

          <div className="basic_fields">
            <div className="premise-field">
              <label htmlFor="pwptt_hours">Time</label><br />
              <input type="text" name="pwptt_hours" id="pwptt_hours"  defaultValue={state.form.time} />
            </div>
            <div className="premise-field">
              <label htmlFor="title">Title</label><br />
              <input type="text" name="title" id="title"
                value={state.form.title}
                onChange={this._updateFieldValue} />
            </div>
            <div className="span12 premise-field">
              <label htmlFor="content">Description</label><br />
              <textarea name="content" id="content"
                value={state.form.content}
                onChange={this._updateFieldValue}  />
            </div>
          </div>

            <div className="clients">
            <h3>Clients</h3>
                  {state.clients}
          </div>

          <div className="projects">
            <h3>Projects</h3>
            {state.projects}
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

    this._loadClients();
    this._loadProjects();
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
        parser += '&' + fields[i].name + '=' + fields[i].value;
      }
      // save the id separately
      else {
        id = fields[i].value;
      }
    }
    // build the query
    query += '/' + id + '?' + parser.substr(1, parser.length);

    // save our timer
    $.ajax( {
      url: query,
      method: 'POST',
      beforeSend: PTT.auth.ajaxBeforeSend,
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

  _listTax( terms ) {

    let list = [];
    for (var i = terms.length - 1; i >= 0; i--) {
      list.push(
        <li key={terms[i].id} className="taxonomy_field">
          <label htmlFor={terms[i].taxonomy + '_' + terms[i].id}>
            <input  type="radio"
                name={terms[i].taxonomy}
                value={terms[i].id}
                id={terms[i].taxonomy + '_' + terms[i].id} />
            <span>{terms[i].name}</span>
          </label>
        </li>
      );
    }

    const ul = <ul>
      {list}
    </ul>;
    return ul;
  }

  _theForm( _form ) {
    // this.state.form = Object.assign( this.state.form, _form );
    // return(

    // );
  }

  _loadClients() {
    console.log('loading clients');
    TimerFetch.getTaxonomy( 'client' ).then( clients => {
      // Do not mutate state directly. Use setState().
      // this.state.clients = this._listTax( clients );
      this.setState({
        clients: this._listTax( clients ),
        view: this._theForm(),
      });
    });
  }

  _loadProjects() {
    console.log('loading projects');
    TimerFetch.getTaxonomy( 'project' ).then( projects => {
      this.setState({
        projects: this._listTax( projects ),
      });
    });
  }
}

export default TimerNewForm;
