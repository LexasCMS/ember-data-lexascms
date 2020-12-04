import Service from '@ember/service';
import base64 from 'base-64';

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
   * If the context is provided as a pre-encoded string, it will be 
   * automatically decoded.
   * 
   * @param {object|string} requestContext The new request context.
   */
  setRequestContext(requestContext) {
    // Throw error if requestContext is not either an object or string
    if (typeof requestContext !== 'object' && typeof requestContext !== 'string') {
      throw new Error(`Request context must be either an object or string, ${typeof requestContext} given.`);
    }
    // Decode request context if string was provided
    if (typeof requestContext === 'string') {
      try {
        requestContext = JSON.parse(base64.decode(requestContext));
      } catch (e) {
        throw new Error('Failed to decode provided request context, please ensure that it was correctly encoded.');
      }
    }
    // Set request context
    this._requestContext = requestContext;
  }

}
