import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import config from 'dummy/config/environment';
import base64 from 'base-64';

module('Unit | Adapter | lexascms', function(hooks) {
  setupTest(hooks);

  hooks.afterEach(function() {
    config.lexascms = undefined;
  });

  test('host uses custom domain if configured', function(assert) {
    const adapter = this.owner.lookup('adapter:lexascms');

    config.lexascms = { customDomain: 'custom.domain' };

    assert.equal(adapter.host, 'https://custom.domain');
  });

  test('host returns the correct hostname', function(assert) {
    const adapter = this.owner.lookup('adapter:lexascms');

    config.lexascms = { spaceId: 'space-id' };

    assert.equal(adapter.host, 'https://space-id.spaces.lexascms.com');
  });

  test('headers shouldn\'t include Authorization header if an API key was\'t provided', function(assert) {
    const adapter = this.owner.lookup('adapter:lexascms');

    assert.equal(adapter.headers['Authorization'], undefined);
  });

  test('headers should include Authorization header is API key was provided', function(assert) {
    const adapter = this.owner.lookup('adapter:lexascms');

    config.lexascms = { apiKey: 'lexascms-api-key' };

    assert.equal(adapter.headers['Authorization'], 'Bearer lexascms-api-key');
  });

  test('headers shouldn\'t include x-lexascms-context header if there is no request context', function(assert) {
    const adapter = this.owner.lookup('adapter:lexascms');

    assert.equal(adapter.headers['x-lexascms-context'], undefined);
  });

  test('headers should include x-lexascms-context header', function(assert) {
    const adapter = this.owner.lookup('adapter:lexascms');

    adapter.lexascms.setRequestContext({ foo: 'bar' });

    assert.notEqual(adapter.headers['x-lexascms-context'], undefined);
  });

  test('pathForType transforms the model name to camel case', function(assert) {
    const adapter = this.owner.lookup('adapter:lexascms');

    assert.equal(adapter.pathForType('modelName'), 'modelName');
    assert.equal(adapter.pathForType('model-name'), 'modelName');
    assert.equal(adapter.pathForType('model_name'), 'modelName');
  });

  test('_prepareLexasCMSRequestContext returns null if no request context', function(assert) {
    const adapter = this.owner.lookup('adapter:lexascms');

    assert.equal(adapter._prepareLexasCMSRequestContext(), null);
  });

  test('_prepareLexasCMSRequestContext returns encoded LexasCMS request context', function(assert) {
    const adapter = this.owner.lookup('adapter:lexascms');

    adapter.lexascms.setRequestContext({ foo: 'bar' });

    assert.equal(adapter._prepareLexasCMSRequestContext(), base64.encode(JSON.stringify({ foo: 'bar' })));
  });
});
