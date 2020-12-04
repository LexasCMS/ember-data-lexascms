import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { inject as service } from '@ember/service';
import { assert } from '@ember/debug';
import { get } from '@ember/object';
import { camelize } from '@ember/string';
import config from 'ember-get-config';
import base64 from 'base-64';

export default class LexascmsAdapter extends JSONAPIAdapter {

  @service lexascms;

  namespace = 'delivery/jsonapi';

  get host() {
    // Assert that LexasCMS config object is defined
    assert('Missing LexasCMS configuration', config.lexascms !== undefined);
    // Check for custom domain
    if (config.lexascms.customDomain !== undefined) {
      return `https://${config.lexascms.customDomain}`;
    }
    // Assert that space ID is configured
    assert('You must configure a space ID', config.lexascms.spaceId !== undefined);
    // Return hostname
    return `https://${config.lexascms.spaceId}.spaces.lexascms.com`;
  }

  get headers() {
    // Define headers
    const headers = {};
    // Set LexasCMS API key if required
    if (get(config, 'lexascms.apiKey') !== undefined) {
      headers['Authorization'] = `Bearer ${config.lexascms.apiKey}`;
    }
    // Set LexasCMS request context if required
    const lexascmsRequestContext = this._prepareLexasCMSRequestContext();
    if (lexascmsRequestContext !== null) {
      headers['x-lexascms-context'] = lexascmsRequestContext;
    }
    // Return headers
    return headers;
  }

  pathForType(modelName) {
    return camelize(modelName);
  }

  /**
   * Encodes and returns the current LexasCMS request context object.
   * 
   * @return {string} JSON and Base64 encoded request context.
   */
  _prepareLexasCMSRequestContext() {
    // Get request context
    const requestContext = this.lexascms.getRequestContext();
    // Return null if there is no context
    if (Object.keys(requestContext).length === 0) {
      return null;
    }
    // Encode request context
    const encodedRequestContext = base64.encode(JSON.stringify(requestContext));
    // Return encoded request context
    return encodedRequestContext;
  }

}
