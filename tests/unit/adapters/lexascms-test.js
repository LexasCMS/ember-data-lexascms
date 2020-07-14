import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import config from 'dummy/config/environment';

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

  test('pathForType transforms the model name to camel case', function(assert) {
    const adapter = this.owner.lookup('adapter:lexascms');

    assert.equal(adapter.pathForType('modelName'), 'modelName');
    assert.equal(adapter.pathForType('model-name'), 'modelName');
    assert.equal(adapter.pathForType('model_name'), 'modelName');
  });
});
