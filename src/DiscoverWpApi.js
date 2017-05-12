import React, { Component } from 'react';
import Cookies from 'js-cookie';
import LoadingIcon from './LoadingIcon';

/**
 * Displays and handles the form to discover the site and get the user signed in.
 * When finished, it loads the dashboard.
 */
class DiscoverWpApi extends Component {
  constructor(props) {
    super();

    this.state = {
      message: props.message || 'Let\'s find your site and get you authenticated.',
      processing: false,
    };

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  // called before the component is rendered to the page.
  componentWillMount() {
    this._checkCredentials(); // Fetch comments from server before component is rendered.
  }

  _checkCredentials() {
    const creds = this.props.credentials;

    if ( ! this.props.credentials ) {

      return;
    }

    const message = ''; // "Authentication in process, please wait.";

    this.setState({ message, processing: true });

    // Discover the site.
    this._discoverSite( creds );
  }

  render() {
    const view = ( this.state.processing ) ? <LoadingIcon /> : this._theForm();
    return (
      <div className="discover_module">
        <div className="header">
          <h1>Premise Time Tracker</h1>
        </div>
        <div className="container">
          <div className="message">
            <p>{this.state.message}</p>
          </div>
          {view}
        </div>
      </div>
    );
  }

  // Returns the form.
  _theForm() {
    return (
      <div className="discovery-form">
        <form id="discover_form" onSubmit={this._handleSubmit}>
          <div>
            <label htmlFor="land_url">Use this URL as your callback:</label>
            <pre name="land_url">
              <code>{window.location.href + 'land.html'}</code>
            </pre>
          </div>
          <div>
            <label>Site URL
              <input type="url" id="site_url" />
            </label>
          </div>
          <div>
            <label>Client Key
              <input id="key" />
            </label>
          </div>
          <div>
            <label>Client Secret
              <input id="secret" />
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
    this.setState({ processing: true });

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
   * Authenticates our user and saves the site
   * info as a cookie in our browser.
   *
   * @param  {Object} creds the credentials to authenticate user
   * @return {void}
   */
  _discoverSite( creds ) {
    creds = creds || null;

    if ( ! creds ) {
      console.error( 'No URL supplied to discover site.' );
      return false;
    }

    fetch( creds.url + '/wp-json/' )
    .then( r => {
      r.json()
      .then( s => {
        let PTT = window.ptt;

        // Save the site info.
        PTT.site = s;

        // Save the.
        PTT.auth = window.wpApiAuth( {
          oauth_consumer_key: creds.key,
          oauth_secret:       creds.secret,
          url:                creds.api_url,
          urls:               s.authentication.oauth1,
          // singlepage: true,
        });

        PTT.auth.authenticate( function( err, oauth ) {

          if ( err ) {
            // Handle errors first.
            const message =  <span className="error">{err.responseText}</span>;

            this.setState({message});

          } else {

            // No errors! Show the dashboard.
            Cookies.set( '_ptt', creds );

            this.props.onDiscovered();
          }
        });
      });
    });
  }
}

export default DiscoverWpApi;
