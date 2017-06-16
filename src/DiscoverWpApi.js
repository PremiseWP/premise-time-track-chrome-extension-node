import React, { Component } from 'react';
import PTT from './PTT';
import LoadingIcon from './LoadingIcon';
import $ from 'jquery';

/**
 * Displays and handles the form to discover the site and get the user signed in.
 * When finished, it loads the dashboard.
 */
class DiscoverWpApi extends Component {
  constructor(props) {
    super();

    this.state = {
      message: props.message || 'Let\'s find your site and get you authenticated.',
      processing: false
    };

    this._handleSubmit = this._handleSubmit.bind(this);
 }

  // called before the component is rendered to the page.
  componentWillMount() {
    this._checkCredentials(); // Fetch comments from server before component is rendered.
  }

  _checkCredentials() {
    const creds = PTT.get( 'creds' );

    if ( ! creds ) {

      return;
    }

    const message = 'Authenticating you..';

    this.setState({ message, processing: true });

    // Discover the site.
    this._discoverSite( creds );
  }

  render() {
    const view = ( this.state.processing )
    ? <LoadingIcon message={this.state.message} />
    : this._theForm();
    return (
      <div className="discover-wp-api">
        {view}
      </div>
    );
  }

  // Returns the form.
  _theForm() {
    let callback = window.location.href;

    // Remove "index.html".
    callback = callback.replace( 'index.html', '' );

    callback += 'land.html';

    return (
      <div className="discovery-form">
        <form id="discover_form" onSubmit={this._handleSubmit}>
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
    const data = new FormData( e.target );

    // Build our credentials object.
    const creds = {
      url:    data.get( 'site_url' ),
      key:    data.get( 'client_key' ),
      secret: data.get( 'client_secret' ),
    }

    for ( var i in creds ) {
      if ( creds.hasOwnProperty( i ) ) {
        if ( ! creds[i].length ) {
          this.setState( {
            message: <span className="error">None of the fields can be empty.</span>,
            processing: false,
          });
          return false;
        }
      }
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
          message: 'We found your site! Getting you authenticated..'
        })
        // we got the site,
        // let's authenticate the user
        const auth = window.wpApiAuth( {
          oauth_consumer_key: creds.key,
          oauth_secret:       creds.secret,
          url:                creds.api_url,
          urls:               site.authentication.oauth1,
          // singlepage: true,
        });
        const endpoint = site.url + '/wp-json/wp/v2/premise_time_tracker';
        const newPtt   = {
          creds,
          site,
          auth,
          endpoint,
        };
        // save the ptt object
        PTT.set( newPtt );
        auth.authenticate( this._maybeAuthenticated.bind(this) );
      });
    });
  }

  _maybeAuthenticated( error ) {

    if ( error ) {
      // Handle errors first.
      const message =  <span className="error">{error.responseText}</span>;

      this.setState({ message });
    } else {
      // get user info
      this.setState({
        message: 'You\'re authenticated! Saving your user info for this session only..',
      });
      let _this = this;
      $.ajax({
        method: 'GET',
        beforeSend: PTT.get( 'auth' ).ajaxBeforeSend,
        url: PTT.get( 'site' ).url + '/wp-json/wp/v2/users/me',
      })
      .then( function( user ) {
        _this.setState({
          message: 'We\'re all set!',
        });
        PTT.set( user, 'user' );
        PTT.setCookies();
        _this.props.onDiscovered();
      });
    }
  }
}

export default DiscoverWpApi;
