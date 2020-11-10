import Service from '@ember/service';

export default class LexascmsService extends Service {

  _requestContext = {};

  /**
   * Returns the current request context object.
   * 
   * @return {object} The current request object.
   */
  getRequestContext() {
    return this._requestContext;
  }

  /**
   * Sets a new request context.
   * 
   * @param {object} requestContext The new request context.
   */
  setRequestContext(requestContext) {
    // Throw error if requestContext is not an object
    if (typeof requestContext !== 'object') {
      throw new Error(`Request context must be an object, ${typeof requestContext} given.`);
    }
    // Set request context
    this._requestContext = requestContext;
  }

}
