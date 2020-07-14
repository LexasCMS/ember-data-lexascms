import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { assert } from '@ember/debug';
import { camelize } from '@ember/string';
import config from 'ember-get-config';

export default class LexascmsAdapter extends JSONAPIAdapter {

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

  namespace = 'delivery/jsonapi';

  pathForType(modelName) {
    return camelize(modelName);
  }

}
