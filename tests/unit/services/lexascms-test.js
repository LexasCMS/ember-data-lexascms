import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | lexascms', function(hooks) {
  setupTest(hooks);

  test('request context defaults to empty object', function(assert) {
    let service = this.owner.lookup('service:lexascms');

    assert.deepEqual(service.getRequestContext(), {});
  });

  test('setRequestContext updates request context', function(assert) {
    let service = this.owner.lookup('service:lexascms');

    service.setRequestContext({ foo: 'bar' });

    assert.deepEqual(service.getRequestContext(), { foo: 'bar' });
  });
});
