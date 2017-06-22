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

  /**
   * Set whole ptt object or only an attribute by passing the key param.
   *
   * @param {mixed}  value typically an object. can be a string or array if used with a key.
   * @param {string} key   name to use as the key for the parameter being added to ptt. if passed, the object ptt will not be overwritten.
   */
  set( value, key ) {
    if ( value && key ) {

      this.ptt[ key ] = value;

    }
    else if ( value ) {

      for ( var i in value ) {
        this.ptt[ i ] = value[ i ];
      }

    }
  }

  /**
   * get an attribute set in this object Notcie we do not retrieve from cookies directly.
   * sf
   * @param  {string} key name of param to get from ptt
   * @return {mixed}      false, or whatever value was found.
   */
  get( key ) {
    if ( ! key || 0 === key.length ) {
      return this.ptt;
    }
    else if ( key && key in this.ptt ) {
      return this.ptt[ key ];
    }
    else {
      return false;
    }
  }

  /**
   * set the attributes of this object as cookies in our browser.
   *
   * called by DiscoverWpApi -> _maybeAuthenticated
   *
   * Note: An additional property will be added to our object called 'auth'. This property is not part of the _cookies const; not all of the auth property could be saved as part of our cookies. So we save it to the active window.
   *
   * This is a single page, fully AJAX app anyways.
   */
  setCookies() {
    this._reset();
    const _cookies = {
      user          : this.ptt.user,
      current_timer : this.ptt.current_timer,
      site          : {
        url:         this.ptt.site.url,
        name:        this.ptt.site.name,
        home:        this.ptt.site.home,
        description: this.ptt.site.description,
      },
      creds         : this.ptt.creds,
    };
    Cookies.set( '_ptt', _cookies );
  }

  // Remove _ptt cookie
  _reset() {
    Cookies.remove('_ptt');
  }
}

// Export new singleton class!
// http://stackoverflow.com/questions/33550380/react-flux-dispatcher-as-singleton-in-typescript#34377957
export default new PTT();
