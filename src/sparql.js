/**
 * Dydra.com Software Development Kit (SDK) for JavaScript.
 *
 * This is free and unencumbered software released into the public domain.
 *
 * @see http://docs.dydra.com/sdk/javascript
 */

var SPARQL = (function($) {
  /**
   * A SPARQL 1.1 client for jQuery.
   *
   * @see http://www.w3.org/TR/sparql11-protocol/
   * @see http://www.w3.org/TR/sparql11-results-json/
   */
  var Client = function(endpointURL) {
    this.query = function(queryText, options) {
      $.ajax(endpointURL, {
        type: 'POST',
        contentType: 'application/sparql-query',
        data: queryText,
        dataType: 'json',
        accepts: {json: 'application/sparql-results+json'},
        beforeSend: function(xhr) {
          xhr.setRequestHeader('Accept', 'application/sparql-results+json');
        },
        username: options.username,
        password: options.password,
        success: options.success,
        error: options.failure
      });
    };

    this.update = function(queryText, options) {
      // TODO
    };
  };

  /**
   * A SPARQL query builder.
   *
   * @see http://www.w3.org/TR/sparql11-query/
   */
  var Query = function(options) {
    if (options === undefined) options = {};
    this.form = options.form || "SELECT";
    this.variables = [];

    /**
     * Creates a boolean `ASK` query.
     *
     * @param {Object} options
     * @return `this`
     * @see http://www.w3.org/TR/sparql11-query/#ask
     */
    this.ask = function(options) {
      this.form = "ASK";
      return this;
    };

    /**
     * Creates a tuple `SELECT` query.
     *
     * @param {Array} variables
     * @param {Object} options
     * @return `this`
     * @see http://www.w3.org/TR/sparql11-query/#select
     */
    this.select = function(variables, options) {
      this.form = "SELECT";
      this.variables = variables;
      return this;
    };

    /**
     * Creates a graph `DESCRIBE` query.
     *
     * @param {Array} variables
     * @param {Object} options
     * @return `this`
     * @see http://www.w3.org/TR/sparql11-query/#describe
     */
    this.describe = function(variables, options) {
      this.form = "DESCRIBE";
      this.variables = variables;
      return this;
    };

    /**
     * Creates a graph `CONSTRUCT` query.
     *
     * @param {Array} patterns
     * @param {Object} options
     * @return `this`
     * @see http://www.w3.org/TR/sparql11-query/#construct
     */
    this.construct = function(patterns, options) {
      this.form = "CONSTRUCT";
      this.patterns = patterns;
      return this;
    };

    /**
     * @param {String} uri
     * @return `this`
     * @see http://www.w3.org/TR/sparql11-query/#specifyingDataset
     */
    this.from = function(uri) {
      this.from = uri;
      return this;
    };

    /**
     * @return `this`
     * @see http://www.w3.org/TR/sparql11-query/#modDuplicates
     */
    this.distinct = function() {
      this.modifier = "DISTINCT";
      return this;
    };

    /**
     * @return `this`
     * @see http://www.w3.org/TR/sparql11-query/#modDuplicates
     */
    this.reduced = function() {
      this.modifier = "REDUCED";
      return this;
    };
  };

  return {
    Client: Client,
    Query: Query
  };
})(jQuery);

if (typeof exports !== 'undefined') {
  module.exports = SPARQL;
}
else {
  window.SPARQL = SPARQL;
}
