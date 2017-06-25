import React, { Component } from 'react';
import PTT from './PTT';
import LoadingIcon from './LoadingIcon';
import $ from 'jquery';
// import TimerFetch from './Timer/TimerFetch';

/**
 * Displays and handles the form to discover the site and get the user signed in.
 * When finished, it loads the dashboard.
 */
class DiscoverWpApi extends Component {
  constructor(props) {
    super();

    let queryCreds = {};
    const query = location.search;
    if (query.length) {
      // holds an array of paired params name and value
      const pairs = query.substr(1).split('&');
      for (var i = pairs.length - 1; i >= 0; i--) {
        const _pair = pairs[i].split('=');
        queryCreds[_pair[0]] = _pair[1];
      }
      // location.search = '';
    }

    this.state = {
      view: '',
      creds: PTT.get('creds') || queryCreds,
      message: props.message || 'Let\'s find your site and get you authenticated.',
      processing: false,
      onDiscovered: props.onDiscovered || null,
      onUserFound: props.onUserFound || null,
    };

    this._handleSubmit = this._handleSubmit.bind(this);
    this._selectUser = this._selectUser.bind(this);
    this._saveUserOnSelect = this._saveUserOnSelect.bind(this);
  }

  // called before the component is rendered to the page.
  componentWillMount() {
    this._checkCredentials();
  }

  _checkCredentials() {
    if ( ! this.state.creds
    || ! this.state.creds.url
    || ! this.state.creds.key
    || ! this.state.creds.secret ) {
      PTT._reset();
    }
    else {
      const message = 'Authenticating you..';

      this.setState({
        message: message,
        processing: true,
      });

      // Discover the site.
      this._discoverSite( this.state.creds );
    }
  }

  render() {
    const _view = (this.state.processing)
    ? <LoadingIcon
      message={this.state.message} />
    : this._theForm();

    return (
      <div className="discover-wp-api">
        {_view}
      </div>
    );
  }

  // Returns the form.
  _theForm() {
    let callback = window.location.href;

    // Remove "index.html".
    callback = callback.replace( 'index.html', '' )
    .replace( /\?.*/, '').replace( /#.*/, '');

    callback += 'land.html';

    const message = this.state.message;

    return (
      <div className="discovery-form">
        <form id="discover_form" onSubmit={this._handleSubmit}>
          <div className="message">
            <p>{message}</p>
          </div>
          <div>
            <span>Use this as your callback:</span>
            <pre className="land-url">
              <code>{callback}</code>
            </pre>
          </div>
          <div>
            <label>Site URL
              <input type="url" name="site_url" />
            </label>
          </div>
          <div>
            <label>Client Key
              <input name="client_key" />
            </label>
          </div>
          <div>
            <label>Client Secret
              <input name="client_secret" />
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

  _handleSubmit(e) {
    e.preventDefault();

    // Loading icon.
    this.setState({
      message: 'Looking for your site..',
      processing: true
    });

    // Get the data from the form.
    // const data = new FormData( e.target );


    // holds an array of objects - each object
    // corresponds to one of the form fields.
    const _data = $('#discover_form').serializeArray();

    let _creds = {};
    for (var i = _data.length - 1; i >= 0; i--) {
      if (0 < _data[i].value.length) {
        _creds[_data[i].name] = _data[i].value;
      }
      else {
        this.setState( {
          message: <span className="error">
            None of the fields can be empty.
          </span>,
          processing: false,
        });
        return false;
      }
    }

    // Build our credentials object from our form
    // and normalize it for use later.
    const creds = {
      url:    _creds.site_url,
      key:    _creds.client_key,
      secret: _creds.client_secret,
    }

    // Discover the site.
    this._discoverSite( creds );
  }


  /**
   * Finds the site and authenticates the user
   *
   * @param  {Object} creds the credentials to authenticate user
   */
  _discoverSite( creds ) {
    creds = creds || null;

    if ( ! creds ) {
      console.error( 'No credentials supplied to discover site.' );
      return false;
    }

    // get the site
    fetch( creds.url + '/wp-json/' )
    .then( resp => {
      resp.json()
      .then( site => {
        this.setState({
          message: 'We found your site!'
        });
        // we got the site,
        // let's authenticate the user
        const auth = window.wpApiAuth( {
          oauth_consumer_key: creds.key,
          oauth_secret:       creds.secret,
          url:                creds.api_url,
          urls:               site.authentication.oauth1,
          singlepage: false,
        });
        // save the endpoint for use later
        const endpoint = site.url
        + '/wp-json/wp/v2/premise_time_tracker';
        // save the ptt object
        const newPtt   = {
          creds,
          site,
          auth,
          endpoint,
        };
        PTT.set( newPtt );
        // save Cookies
        PTT.setCookies();
        // authenticate!
        auth.authenticate( this._maybeAuthenticated.bind(this) );
      });
    });
  }

  _maybeAuthenticated( error ) {
    if ( error ) {
      // console.log(error);
      const message =  <span
      className="error">
        {error.responseText}
      </span>;

      this.setState({ message });
    }
    // if no errors
    else {
      this.setState({
        message: 'You\'re authenticated!',
      });
      // get user info
      if ( ! PTT.get('user') ) {
        this._getCurrentUser();
      }
      else {
        this.state.onDiscovered();
      }
    }
  }

  _getCurrentUser() {
    this.setState({
      message: 'Getting your user info..',
    });
    if ( PTT.get( 'auth' )
      && PTT.get( 'auth' ).authenticated() ) {
      // User is authenticated, we can proceed
      // reference 'this', we'll need it later
      let _this = this;
      $.ajax({
        method:     'GET',
        beforeSend: PTT.get( 'auth' ).ajaxBeforeSend,
        url:        PTT.get( 'site' ).url
                    + '/wp-json/wp/v2/users/me',
        // there was an issue getting the user
        // but we are authenticated.
        // This is not right!
        // We do not update the cookie
        // so the app knows something is up.
        error: function( err ) {
          // console.log(err);
          _this.setState({
            message: 'Sorry for the wait. We should be done soon.',
          });
          _this._forceUserDownload();
          return false;
        },
      })
      .done( function( user ) {
        PTT.set( user, 'user' );
        PTT.setCookies();
        _this.state.onDiscovered();
      });
    }
    else {
      this.setState({
        message: 'Your user info could not be retreived. It looks like you are not authenticated.',
      });
    }
  }

  _forceUserDownload() {
    let _this = this;

    $.ajax({
      method:     'GET',
      beforeSend: PTT.get( 'auth' ).ajaxBeforeSend,
      url:        PTT.get( 'site' ).url
      + '/wp-json/premise_time_tracker/v2/currentuser/',
      error: function( err ) {
        _this.setState({
          message: 'Sorry, we could not find you user. Let\'s load it manually.',
        });
        _this._selectUser();
        return false;
      },
    })
    .done( function( user ) {
      PTT.set( user, 'user' );
      PTT.setCookies();
      _this.state.onDiscovered();
    });
  }

  _selectUser() {
    let _this = this;
    $.ajax({
      method:     'GET',
      beforeSend: PTT.get( 'auth' ).ajaxBeforeSend,
      url:        PTT.get( 'site' ).url
      + '/wp-json/wp/v2/users/',
      error: function( err ) {
        _this.setState({
          message: err.responseText,
        });
      },
    })
    .done( function( user ) {
      console.log(user);
      let _list = [
        <option
        key={0}
        className="user-option">
          Please slect YOUR user..
        </option>
      ];

      for (var i = user.length - 1; i >= 0; i--) {
        const _listItem = <option
        key={user[i].id}
        className="user-option"
        value={user[i].id}>
          {user[i].name}
        </option>;
        _list.push( _listItem );
      }

      const _select = <select
      onInput={_this._saveUserOnSelect}>
        {_list}
      </select>;

      _this.setState({
        message: 'Select a user.',
        view: _select,
      });
    });
  }

  _saveUserOnSelect(e) {
    e.preventDefault();
    const _uid = e.target.value;
    let _this = this;
    $.ajax({
      method:     'GET',
      beforeSend: PTT.get( 'auth' ).ajaxBeforeSend,
      url:        PTT.get( 'site' ).url
      + '/wp-json/wp/v2/users/'
      + _uid,
      error: function( err ) {
        _this.setState({
          message: err.responseText,
        });
      },
    })
    .done( function ( user ) {
      PTT.set( user, 'user' );
      PTT.setCookies();
      _this.state.onDiscovered();
    });
  }
}

export default DiscoverWpApi;
