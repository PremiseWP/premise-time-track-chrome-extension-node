import Cookies from 'js-cookie';

class PTT {
	constructor() {
		this.ptt = {};

    this.ptt.creds = Cookies.getJSON( '_ptt' );
	}

  // Set all ptt object or only an attribute passing the key param.
  set( ptt, key ) {
    if ( key && key in this.ptt ) {

      this.ptt[ key ] = ptt;

    } else if ( ptt ) {

      this.ptt = ptt;
    }
  }

  get( key ) {
    if ( key && key in this.ptt ) {
      return this.ptt[ key ];
    } else {
      return this.ptt;
    }
  }

  setCookie( key ) {
    if ( ! (key in this.ptt) ) {

      return false;
    }

    Cookies.set( '_ptt', this.ptt[ key ] );
  }
}

// Export new singleton class!
// http://stackoverflow.com/questions/33550380/react-flux-dispatcher-as-singleton-in-typescript#34377957
export default new PTT();
