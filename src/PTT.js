import Cookies from 'js-cookie';

class PTT {
  constructor() {
    this._init = this._init.bind(this);

    this.ptt = {};
  }

  // initialize our object
  _init() {
    this.ptt = Cookies.getJSON( '_ptt' ) || {};
    console.log('cookies:');console.log(this.ptt);
  }

  // Set whole ptt object or
  // only an attribute by passing the key param.
  set( ptt, key ) {
    if ( this.ptt && key ) {

      this.ptt[ key ] = ptt;

    } else if ( ptt ) {

      for ( var i in ptt ) {
        this.ptt[ i ] = ptt[ i ];
      }

    }
  }

  // get an attribute set in this object
  // Notcie we do not retrieve from cookies
  // directly.
  get( key ) {
    if ( key && key in this.ptt ) {
      return this.ptt[ key ];
    } else {
      return false;
    }
  }

  // set the attributes of this object
  // as cookies in our browser.
  // called by DiscoverWpApi -> _maybeAuthenticated
  setCookies() {
    const _cookies = {
      authenticated: this.ptt.auth && this.ptt.auth.authenticated() ? true : false,
      creds: this.ptt.creds,
      site: {
        url: this.ptt.site.url,
        name: this.ptt.site.name,
        home: this.ptt.site.home,
        description: this.ptt.site.description,
      },
      user: this.ptt.user,
    };
    Cookies.set( '_ptt', _cookies );
    // console.log( 'Cookies set!' );
  }

  reset() {
    // Remove _ptt cookie, reset PTT.
    Cookies.remove('_ptt');

    // this._init();
  }
}

// Export new singleton class!
// http://stackoverflow.com/questions/33550380/react-flux-dispatcher-as-singleton-in-typescript#34377957
export default new PTT();
