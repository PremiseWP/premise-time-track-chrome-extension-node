class TimerDB {
  constructor() {
    this.db = {};
  }

  // Set all db object or only an attribute passing the key param.
  set( db, key ) {
    if ( key ) {

      this.db[ key ] = db;

    } else if ( db ) {

      this.db = db;
    }
  }

  get( key ) {
    if ( key && key in this.db ) {
      return this.db[ key ];
    } else {
      return this.db;
    }
  }
}

// Export new singleton class!
// http://stackoverflow.com/questions/33550380/react-flux-dispatcher-as-singleton-in-typescript#34377957
export default new TimerDB();
