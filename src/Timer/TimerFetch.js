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

    fetch( PTT.site.url + '/wp-json/wp/v2/premise_time_tracker_' + slug + '/' )
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

    var _url = PTT.site.url + '/wp-json/wp/v2/premise_time_tracker_' + slug + '/',

    tax = fetch( _url )
    .then( response => {
      return response.json();
    });
    return tax;
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
    var tax = fetch( PTT.endpoint + '/' + id + '?' + _options + '/' )
    .then( response => {
      return response.json();
    });
    return tax;
  }
}

// Export new singleton class!
// http://stackoverflow.com/questions/33550380/react-flux-dispatcher-as-singleton-in-typescript#34377957
export default new TimerFetch();
