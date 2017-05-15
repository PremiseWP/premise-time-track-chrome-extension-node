import PTT from '../PTT';

class TimerFetch {
  /**
   * Retrieve a taxonomy from premise time tracker.
   *
   * @param  {String}   slug     the taxonomy slug (wihtout 'premise_time_tracker_')
   * @param  {Function} callback a callback to be called with the taxonomy found
   * @return {Void}              does not return anything. call the callbcak passed.
   */
  loadTaxonomy( slug, callback ) {
    slug = slug || null;

    if ( ! slug ) return false;

    fetch( PTT.get( 'site' ).url + '/wp-json/wp/v2/premise_time_tracker_' + slug + '/' )
    .then( response => {
      response.json()
      .then( _terms => {
        callback( _terms );
      });
    });
  }

  /**
   * Retrieve a taxonomy from premise time tracker.
   *
   * @param  {String} slug the taxonomy slug (wihtout 'premise_time_tracker_')
   * @return {Promise}     Promise for the taxonomy object
   */
  getTaxonomy( slug ) {
    slug = slug || null;

    if ( ! slug ) return false;

    const url = PTT.get( 'site' ).url + '/wp-json/wp/v2/premise_time_tracker_' + slug + '/';

    // console.log(url);

    const tax = fetch( url )
    .then( response => {
      return response.json();
    });

    return tax;
  }

  /**
   * Search timers.
   *
   * @param  {String}  Search term.
   * @return {Promise} Promise for the results object
   */
  searchTimers( searchTerm ) {
    searchTerm = searchTerm || null;

    if ( ! searchTerm ) return false;

    const url = PTT.get( 'endpoint' ) + '?search=' + encodeURIComponent( searchTerm );

    // console.log(url);

    const results = fetch( url )
    .then( response => {
      return response.json();
    });

    return results;
  }

  /**
   * Retrieve a post from premise time tracker.
   *
   * @param  {Integer} id      the id for the post we want to retrieve
   * @param  {Object}  options params to add to the query as a javascript object
   * @return {Object}          the post object for the post found.
   */
  getPost( id, options ) {
    id = id || null;
    options = options || null;

    if ( ! id ) return false;

    // Parse options as params.
    // BETA not fully tested
    if ( options ) {
      var _options = '';
      for ( var i in options ) {
        if ( options.hasOwnProperty( i ) ) {
          _options += '&' + i + '=' + options[i];
        }
      }
      // console.log(_options);
    }

    // Fetch the post and return promise.
    var tax = fetch( PTT.get( 'endpoint' ) + '/' + id + '?' + _options + '/' )
    .then( response => {
      return response.json();
    });
    return tax;
  }
}

// Export new singleton class!
// http://stackoverflow.com/questions/33550380/react-flux-dispatcher-as-singleton-in-typescript#34377957
export default new TimerFetch();
