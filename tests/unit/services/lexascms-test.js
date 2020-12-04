import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import base64 from 'base-64';

module('Unit | Service | lexascms', function(hooks) {
  setupTest(hooks);

  test('request context defaults to empty object', function(assert) {
    let service = this.owner.lookup('service:lexascms');

    assert.deepEqual(service.getRequestContext(), {});
  });

  test('setRequestContext should throw an error if new context is of an incorrect type', function(assert) {
    let service = this.owner.lookup('service:lexascms');

    assert.throws(
      () => service.setRequestContext(123),
      /Request context must be either an object or string, number given\./
    );
  });

  test('setRequestContext should throw an error if new string context is not correctly encoded', function(assert) {
    let service = this.owner.lookup('service:lexascms');

    assert.throws(
      () => service.setRequestContext('foo'),
      /Failed to decode provided request context, please ensure that it was correctly encoded\./
    );
  });

  test('setRequestContext updates request context', function(assert) {
    let service = this.owner.lookup('service:lexascms');

    service.setRequestContext({ foo: 'bar' });

    assert.deepEqual(service.getRequestContext(), { foo: 'bar' });
  });

  test('setRequestContext should parse pre-encoded string contexts', function(assert) {
    let service = this.owner.lookup('service:lexascms');

    const preEncodedRequestContext = base64.encode(JSON.stringify({ foo: 'bar' }));
    service.setRequestContext(preEncodedRequestContext);

    assert.deepEqual(service.getRequestContext(), { foo: 'bar' });
  });
});
